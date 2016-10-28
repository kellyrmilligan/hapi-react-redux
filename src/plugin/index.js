import React from 'react'
import { renderToString } from 'react-dom/server'
import { match, RouterContext } from 'react-router'
import Iso from 'iso'
import Hoek from 'hoek'
import routeResovler from 'route-resolver'
import Boom from 'boom'
import { Provider } from 'react-redux'

function hapiReactReduxPlugin(server, options, next) {

  server.decorate('server', 'hapiReactRedux', function(options) {

    Hoek.assert(options, 'Missing options')
    this.realm.plugins.hapiReactRedux = this.realm.plugins.hapiReactRedux || {}
    Hoek.assert(!this.realm.plugins.hapiReactRedux.settings, 'Cannot set hapiReactRedux settings more than once')
    this.realm.plugins.hapiReactRedux.settings = options

  })

  server.decorate('reply', 'hapiReactReduxRender', function(context) {

    const realm = this.realm.plugins.hapiReactRedux
    Hoek.assert(realm.settings, 'Cannot render app without settings')

    const routes = realm.settings.routes
    const Layout = realm.settings.layout
    const assets = realm.settings.assets
    const config = realm.settings.config
    // TODO: where does this go now?
    const createStore = realm.settings.createStore
    // any extra data
    const pre = this.request.pre
    // is there a user?
    const auth = this.request.auth
    const store = createStore({ auth, pre, config, serverContext: context })

    const iso = new Iso()

    match({ routes, location: this.request.raw.req.url }, (err, redirect, props) => {
      if (err) {
        return this.response(Boom.badImplementation(`There was a react router error rendering the route - ${this.request.raw.req.url}`, e))
      } else if (redirect) {
        this.redirect(redirect.pathname + redirect.search).code(301)
      } else if (props) {
        routeResovler(props, false, { dispatch: store.dispatch, getState: store.getState })
          .then(() => {
            let rootHtml = null
            let layout = null
            try {
              rootHtml = renderToString(
                <Provider store={store}>
                  <RouterContext {...props} />
                </Provider>
              )
            } catch (e) {
              return this.response(Boom.badImplementation(`There was an error rendering the route - ${this.request.raw.req.url}`, e))
            }
            iso.add(rootHtml, {
              preloadedState: store.getState()
            })
            try {
              layout = renderToString(<Layout assets={assets} config={config} content={iso.render()} />)
            } catch (e) {
              return this.response(Boom.badImplementation(`There was an error rendering the layout while rendring the route - ${this.request.raw.req.url}`, e))
            }
            this.response(`<!doctype html>\n${layout}`)
          })
      } else {
      // no errors, no redirect, we just didn't match anything
        this.response(Boom.notFound(`Unable to find maching route for ${this.request.raw.req.url}`))
      }
    })

  })

  server.handler('hapiReactReduxHandler', function(route, options) {
    return function(request, reply) {
      reply.hapiReactReduxRender()
    }
  })

  next()
}

hapiReactReduxPlugin.attributes = {
  name: '@trunkclub/hapi-react-redux'
}

module.exports = {
  register: hapiReactReduxPlugin
}
