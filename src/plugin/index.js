import React from 'react'
import { renderToString } from 'react-dom/server'
import { match, RouterContext } from 'react-router'
import { Provider } from 'react-redux'
import Iso from 'iso'
import Hoek from 'hoek'
import routeResovler from 'route-resolver'
import Boom from 'boom'
import UniversalProvider from './universal-provider'

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
    const store = createStore({ auth })


    const iso = new Iso()

    match({ routes, location: this.request.raw.req.url }, (err, redirect, props) => {
      if (err) {
        return this.response(err)
      } else if (redirect) {
        this.redirect(redirect.pathname + redirect.search).code(301)
      } else if (props) {
        props.reduxStore = store
        routeResovler(props, false, { store })
          .then(() => {
            let rootHtml = null
            let layout = null
            try {
              rootHtml = renderToString(
                <UniversalProvider pre={pre} serverContext={context} config={config} store={store}>
                  <RouterContext {...props} />
                </UniversalProvider>
              )
            } catch (e) {
              if (e) return this.response(e)
            }
            iso.add(rootHtml, {
              preloadedState: store.getState(),
              pre,
              context,
              config,
            })
            try {
              layout = renderToString(<Layout assets={assets} config={config} content={iso.render()} />)
            } catch (e) {
              if (e) return this.response(e)
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
  name: 'hapi-react-redux'
}

module.exports = {
  register: hapiReactReduxPlugin
}
