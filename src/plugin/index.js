import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import serialize from 'serialize-javascript'
import Hoek from 'hoek'
import reactRouterFetch from 'react-router-fetch'
import { renderRoutes } from 'react-router-config'
import Boom from 'boom'
import { Provider } from 'react-redux'
import queryString from 'query-string'

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

    reactRouterFetch(routes, { pathname: decodeURI(this.request.path), search: queryString.stringify(this.request.query) }, { dispatch: store.dispatch, getState: store.getState })
      .then((results) => {
        const context = {}
        let rootHtml = null
        let layout = null
        try {
          rootHtml = renderToString(
            <Provider store={store}>
              <StaticRouter location={this.request.path} context={context}>
                {renderRoutes(routes)}
              </StaticRouter>
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
        // this means a redirect component happened somewhere on this  path
        if (context.url) {
          return this.redirect(context.url).code(context.statusCode || 301)
        }
        this.response(`<!doctype html>\n${layout}`).code(context.statusCode || 200)
      })
      .catch((err) => {
        this.response(Boom.wrap(err))
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
