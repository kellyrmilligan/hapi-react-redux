import React from 'react'
import { renderToString } from 'react-dom/server'
import { match, RouterContext } from 'react-router'
import serialize from 'serialize-javascript'
import Hoek from 'hoek'
import reactRouterFetch from 'react-router-fetch'
import Boom from 'boom'
import { Provider } from 'react-redux'

function hapiReactReduxPlugin (server, options, next) {
  server.decorate('server', 'hapiReactRedux', function (options) {
    Hoek.assert(options, 'Missing options')
    Hoek.assert(options.configureStore, 'Missing configure store option')
    Hoek.assert(options.routes, 'Missing routes')
    Hoek.assert(options.layout, 'Missing layout')
    this.realm.plugins.hapiReactRedux = this.realm.plugins.hapiReactRedux || {}
    Hoek.assert(!this.realm.plugins.hapiReactRedux.settings, 'Cannot set hapiReactRedux settings more than once')
    this.realm.plugins.hapiReactRedux.settings = options
  })

  server.decorate('reply', 'hapiReactReduxRender', function (context) {
    const realm = this.realm.plugins.hapiReactRedux
    Hoek.assert(realm.settings, 'Cannot render app without settings')

    const routes = realm.settings.routes
    const Layout = realm.settings.layout
    const assets = realm.settings.assets
    const config = realm.settings.config
    const configureStore = realm.settings.configureStore
    // any extra data
    const pre = this.request.pre
    // is there a user?
    const auth = this.request.auth
    const store = configureStore({ auth, pre, config, serverContext: context }) // context is data from the route hander when calling the reply method

    match({ routes, location: this.request.raw.req.url }, (err, redirect, props) => {
      if (err) {
        return this.response(Boom.badImplementation(`There was a react router error rendering the route - ${this.request.raw.req.url}`, err))
      } else if (redirect) {
        this.redirect(redirect.pathname + redirect.search).code(301)
      } else if (props) {
        reactRouterFetch(props, false, { dispatch: store.dispatch, getState: store.getState })
          .then(() => {
            let rootHtml = null
            let layout = null
            try {
              rootHtml = renderToString(
                <Provider store={store}>
                  <RouterContext {...props} />
                </Provider>
              )
            } catch (err) {
              return this.response(Boom.badImplementation(`There was an error rendering the route - ${this.request.raw.req.url}`, err))
            }
            try {
              layout = renderToString(
                <Layout assets={assets} config={config} content={rootHtml} state={serialize(store.getState(), { isJSON: true })} />
              )
            } catch (err) {
              return this.response(Boom.badImplementation(`There was an error rendering the layout while rendring the route - ${this.request.raw.req.url}`, err))
            }
            this.response(`<!doctype html>\n${layout}`)
          })
          .catch((err) => {
            return this.response(Boom.wrap(err))
          })
      } else {
      // no errors, no redirect, we just didn't match anything
        this.response(Boom.notFound(`Unable to find matching route for ${this.request.raw.req.url}`))
      }
    })
  })

  server.handler('hapiReactReduxHandler', function (route, options) {
    return function (request, reply) {
      reply.hapiReactReduxRender()
    }
  })

  next()
}

hapiReactReduxPlugin.attributes = {
  name: 'hapi-react-redux'
}

module.exports = {
  register: hapiReactReduxPlugin
}
