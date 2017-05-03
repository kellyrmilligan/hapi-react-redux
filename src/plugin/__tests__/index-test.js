/* global describe, it, expect */
/* eslint handle-callback-err: 0 */
const Hapi = require('hapi')
const configureStore = require('fixtures/configureStore')
const clientRoutes = require('fixtures/routes')
const redirectClientRoutes = require('fixtures/redirect-routes')
const layout = require('fixtures/layout')
const badLayout = require('fixtures/bad-layout')

const options = {
  routes: clientRoutes,
  layout: layout,
  config: {
    honeybadger: '1234'
  },
  assets: {
    styles: {
    },
    scripts: {
    }
  },
  configureStore
}

const HapiReactRedux = require('plugin/index')

describe('hapi react redux plugin', () => {
  it('can be registered', (done) => {
    const server = new Hapi.Server()
    server.connection()
    server.register(HapiReactRedux, (err) => {
      expect(server).toBeTruthy()
      expect(server.hapiReactRedux).toBeTruthy()
      expect(err).toBeUndefined()
      done()
    })
  })

  it('can set options with the hapiReactRedux method', (done) => {
    const server = new Hapi.Server()
    server.connection()
    server.register(HapiReactRedux, (err) => {
      options.layout = layout
      options.routes = clientRoutes
      server.hapiReactRedux(options)
      server.route({
        method: 'GET',
        path: '/',
        handler (request, reply) {
          return reply.hapiReactReduxRender()
        }
      })
      server.inject({
        method: 'GET',
        url: '/?q=test'
      }, (res) => {
        expect(res.result).toMatch(/home/)
        done()
      })
    })
  })

  it('can have a handler call the hapiReactReduxRender method on reply', (done) => {
    const server = new Hapi.Server()
    server.connection()
    server.register(HapiReactRedux, (err) => {
      options.layout = layout
      options.routes = clientRoutes
      server.hapiReactRedux(options)
      server.route({
        method: 'GET',
        path: '/',
        handler (request, reply) {
          return reply.hapiReactReduxRender()
        }
      })
      server.inject({
        method: 'GET',
        url: '/'
      }, (res) => {
        expect(res.result).toMatch(/home/)
        done()
      })
    })
  })

  it('can build the location object to match react routers location with pathname and search', (done) => {
    const server = new Hapi.Server()
    server.connection()
    server.register(HapiReactRedux, (err) => {
      options.layout = layout
      options.routes = clientRoutes
      server.hapiReactRedux(options)
      server.route({
        method: 'GET',
        path: '/search',
        handler (request, reply) {
          return reply.hapiReactReduxRender()
        }
      })
      server.inject({
        method: 'GET',
        url: '/search?q=test'
      }, (res) => {
        expect(res.result).toMatch(/q=test/)
        done()
      })
    })
  })

  it('can use the server handler instead of calling the method directly', (done) => {
    const server = new Hapi.Server()
    server.connection()
    server.register(HapiReactRedux, (err) => {
      options.layout = layout
      options.routes = clientRoutes
      server.hapiReactRedux(options)
      server.route({
        method: 'GET',
        path: '/',
        handler: { hapiReactReduxHandler: {} }
      })
      server.inject({
        method: 'GET',
        url: '/'
      }, (res) => {
        expect(res.result).toContain('home')
        done()
      })
    })
  })

  it('can collect data from fetch methods on route handlers to have in the rendered output via react-router-fetch', (done) => {
    const server = new Hapi.Server()
    server.connection()
    server.register(HapiReactRedux, (err) => {
      options.layout = layout
      options.routes = clientRoutes
      server.hapiReactRedux(options)
      server.route({
        method: 'GET',
        path: '/',
        handler: { hapiReactReduxHandler: {} }
      })
      server.inject({
        method: 'GET',
        url: '/'
      }, (res) => {
        expect(res.result).toMatch(/test-todo-redux/)
        done()
      })
    })
  })

  it('can use data sent to the hapiReactReduxRender method on reply', (done) => {
    const server = new Hapi.Server()
    server.connection()
    server.register(HapiReactRedux, (err) => {
      options.layout = layout
      options.routes = clientRoutes
      server.hapiReactRedux(options)
      server.route({
        method: 'GET',
        path: '/',
        handler (request, reply) {
          return reply.hapiReactReduxRender({
            test: 'the test'
          })
        }
      })
      server.inject({
        method: 'GET',
        url: '/'
      }, (res) => {
        expect(res.result).toMatch(/the test/)
        done()
      })
    })
  })

  it('can use data from route prereqs', (done) => {
    const server = new Hapi.Server()
    server.connection()
    server.register(HapiReactRedux, (err) => {
      options.layout = layout
      options.routes = clientRoutes
      server.hapiReactRedux(options)
      server.route({
        method: 'GET',
        path: '/',
        config: {
          pre: [
            { method: (request, reply) => { return reply('preTest') }, assign: 'preTest' }
          ]
        },
        handler (request, reply) {
          return reply.hapiReactReduxRender()
        }
      })
      server.inject({
        method: 'GET',
        url: '/'
      }, (res) => {
        expect(res.result).toMatch(/preTest/)
        done()
      })
    })
  })

  it('can use data from config', (done) => {
    const server = new Hapi.Server()
    server.connection()
    server.register(HapiReactRedux, (err) => {
      options.layout = layout
      options.routes = clientRoutes
      server.hapiReactRedux(options)
      server.route({
        method: 'GET',
        path: '/',
        handler (request, reply) {
          return reply.hapiReactReduxRender()
        }
      })
      server.inject({
        method: 'GET',
        url: '/'
      }, (res) => {
        expect(res.result).toMatch(/1234/)
        done()
      })
    })
  })

  it('will redirect if RR has a redirect route in it', (done) => {
    const server = new Hapi.Server()
    server.connection()
    server.register(HapiReactRedux, (err) => {
      options.layout = layout
      options.routes = redirectClientRoutes
      server.hapiReactRedux(options)
      server.route({
        method: 'GET',
        path: '/{path*}',
        handler (request, reply) {
          return reply.hapiReactReduxRender()
        }
      })
      server.inject({
        method: 'GET',
        url: '/redirectroute'
      }, (res) => {
        expect(res.statusCode).toBe(301)
        done()
      })
    })
  })

  it('will throw error if layout/components are not valid', (done) => {
    const server = new Hapi.Server()
    server.connection()
    server.register(HapiReactRedux, (err) => {
      options.layout = badLayout
      options.routes = clientRoutes
      server.hapiReactRedux(options)
      server.route({
        method: 'GET',
        path: '/',
        handler (request, reply) {
          return reply.hapiReactReduxRender()
        }
      })
      server.inject({
        method: 'GET',
        url: '/'
      }, (res) => {
        expect(res.statusCode).toBe(500)
        done()
      })
    })
  })

  it('will 404 if not found', (done) => {
    const server = new Hapi.Server()
    server.connection()
    server.register(HapiReactRedux, (err) => {
      options.layout = layout
      options.routes = clientRoutes
      server.hapiReactRedux(options)
      server.route({
        method: 'GET',
        path: '/{path*}',
        handler (request, reply) {
          return reply.hapiReactReduxRender()
        }
      })
      server.inject({
        method: 'GET',
        url: '/notfound'
      }, (res) => {
        expect(res.result).toMatch(/Not found/)
        expect(res.statusCode).toBe(404)
        done()
      })
    })
  })
})
