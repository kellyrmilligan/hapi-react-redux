import React from 'react'
import { renderToString } from 'react-dom/server'
import { match, RouterContext } from 'react-router'
import Iso from 'iso'
import Hoek from 'hoek'
import routeResovler from 'route-resolver'
import Boom from 'boom'

import UniversalProvider from './universal-provider'

function hapiReactAltPlugin(server, options, next) {

  server.decorate('server', 'hapiReactAlt', function(options) {

    Hoek.assert(options, 'Missing options')
    this.realm.plugins.universalReactAlt = this.realm.plugins.universalReactAlt || {}
    Hoek.assert(!this.realm.plugins.universalReactAlt.settings, 'Cannot set universalReactAlt settings more than once')
    this.realm.plugins.universalReactAlt.settings = options

  })

  server.decorate('reply', 'hapiReactAltRender', function(context) {

    const realm = this.realm.plugins.universalReactAlt
    Hoek.assert(realm.settings, 'Cannot render app without settings')

    const routes = realm.settings.routes
    const Layout = realm.settings.layout
    const assets = realm.settings.assets
    const config = realm.settings.config
    const authStore = realm.settings.authStore//string name of the store
    const alt = realm.settings.alt

    // any extra data
    const pre = this.request.pre

    // is there a user?
    const auth = this.request.auth
    //bootstrap the user into the authStore option for later
    if (auth && alt.stores[authStore]) {
      alt.bootstrap(JSON.stringify({ [authStore]: auth}))
    }

    const iso = new Iso()

    match({ routes, location: this.request.raw.req.url }, (err, redirect, props) => {
      if (err) {
        return this.response(err)
      } else if (redirect) {
        this.redirect(redirect.pathname + redirect.search).code(301)
      } else if (props) {
        routeResovler(props, false)
          .then(() => {
            let rootHtml = null
            let layout = null
            try {
              rootHtml = renderToString(
                <UniversalProvider pre={pre} serverContext={context} config={config} >
                  <RouterContext {...props} />
                </UniversalProvider>
              )
            } catch (e) {
              if (e) return this.response(e)
            }
            iso.add(rootHtml, {
              alt: alt.flush(),
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


  server.handler('hapiReactAltHandler', function(route, options) {
    return function(request, reply) {
      reply.hapiReactAltRender()
    }
  })

  next()
}

hapiReactAltPlugin.attributes = {
  name: 'hapi-react-alt'
}

module.exports = {
  register: hapiReactAltPlugin
}
