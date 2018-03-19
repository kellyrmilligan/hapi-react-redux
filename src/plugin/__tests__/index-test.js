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
  it('can be registered', async (done) => {
    const server = new Hapi.Server()
    await server.register(HapiReactRedux)

    expect(server).toBeTruthy()
    expect(server.hapiReactRedux).toBeTruthy()
    done()

  })

  it('can set options with the hapiReactRedux method', async (done) => {
    const server = new Hapi.Server()
    await server.register(HapiReactRedux)

    options.layout = layout
    options.routes = clientRoutes

    server.hapiReactRedux(options)
    server.route({
      method: 'GET',
      path: '/',
      handler (request, h) {
        return h.hapiReactReduxRender()
      }
    })
    const res = await server.inject({
      method: 'GET',
      url: '/?q=test'
    })

    expect(res.result).toMatch(/home/)
    done()
  })

  it('can have a handler call the hapiReactReduxRender method on reply', async (done) => {
    const server = new Hapi.Server()
    await server.register(HapiReactRedux)
    options.layout = layout
    options.routes = clientRoutes
    server.hapiReactRedux(options)
    server.route({
      method: 'GET',
      path: '/',
      handler (request, h) {
        return h.hapiReactReduxRender()
      }
    })
    const res = await server.inject({
      method: 'GET',
      url: '/'
    })

    expect(res.result).toMatch(/home/)
    done()
  })

  it('can build the location object to match react routers location with pathname and search', async (done) => {
    const server = new Hapi.Server()
    await server.register(HapiReactRedux)
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

    const res = await server.inject({
      method: 'GET',
      url: '/search?q=test'
    })

    expect(res.result).toMatch(/q=test/)
    done()
  })

  it('can use the server handler instead of calling the method directly', async (done) => {
    const server = new Hapi.Server()
    server.register(HapiReactRedux)
    options.layout = layout
    options.routes = clientRoutes
    server.hapiReactRedux(options)
    server.route({
      method: 'GET',
      path: '/',
      handler: { hapiReactReduxHandler: {} }
    })
    const res = await server.inject({
      method: 'GET',
      url: '/'
    })
    expect(res.result).toContain('home')
    done()
  })

  it('can collect data from fetch methods on route handlers to have in the rendered output via react-router-fetch', async (done) => {
    const server = new Hapi.Server()
    await server.register(HapiReactRedux)
    options.layout = layout
    options.routes = clientRoutes
    server.hapiReactRedux(options)
    server.route({
      method: 'GET',
      path: '/',
      handler: { hapiReactReduxHandler: {} }
    })
    const res = await server.inject({
      method: 'GET',
      url: '/'
    })

    expect(res.result).toMatch(/test-todo-redux/)
    done()
  })

  it('can use data sent to the hapiReactReduxRender method on h', async (done) => {
    const server = new Hapi.Server()
    await server.register(HapiReactRedux)
    options.layout = layout
    options.routes = clientRoutes
    server.hapiReactRedux(options)
    server.route({
      method: 'GET',
      path: '/',
      handler (request, h) {
        return h.hapiReactReduxRender({
          test: 'the test'
        })
      }
    })
    const res = await server.inject({
      method: 'GET',
      url: '/'
    })
    expect(res.result).toMatch(/the test/)
    done()
  })

  it('can use data from route prereqs', async (done) => {
    const server = new Hapi.Server()
    server.register(HapiReactRedux)
    options.layout = layout
    options.routes = clientRoutes
    server.hapiReactRedux(options)
    server.route({
      method: 'GET',
      path: '/',
      config: {
        pre: [
          {
            method: (request, h) => {
              return 'preTest'
            },
            assign: 'preTest'
          }
        ]
      },
      handler (request, h) {
        return h.hapiReactReduxRender()
      }
    })
    const res = await server.inject({
      method: 'GET',
      url: '/'
    })
    expect(res.result).toMatch(/preTest/)
    done()
  })

  it('can use data from config', async (done) => {
    const server = new Hapi.Server()
    await server.register(HapiReactRedux)
    options.layout = layout
    options.routes = clientRoutes
    server.hapiReactRedux(options)
    server.route({
      method: 'GET',
      path: '/',
      handler (request, h) {
        return h.hapiReactReduxRender()
      }
    })
    const res = await server.inject({
      method: 'GET',
      url: '/'
    })
    expect(res.result).toMatch(/1234/)
    done()
  })

  it('will redirect if RR has a redirect route in it', async (done) => {
    const server = new Hapi.Server()
    await server.register(HapiReactRedux)
    options.layout = layout
    options.routes = redirectClientRoutes
    server.hapiReactRedux(options)
    server.route({
      method: 'GET',
      path: '/{path*}',
      handler (request, h) {
        return h.hapiReactReduxRender()
      }
    })
    const res = await server.inject({
      method: 'GET',
      url: '/redirectroute'
    })
    expect(res.statusCode).toBe(301)
    done()
  })

  it('will throw error if layout/components are not valid', async (done) => {
    const server = new Hapi.Server()
    await server.register(HapiReactRedux)
    options.layout = badLayout
    options.routes = clientRoutes
    server.hapiReactRedux(options)
    server.route({
      method: 'GET',
      path: '/',
      handler (request, h) {
        return h.hapiReactReduxRender()
      }
    })
    const res = await server.inject({
      method: 'GET',
      url: '/'
    })
    expect(res.statusCode).toBe(500)
    done()
  })

  it('will 404 if not found', async (done) => {
    const server = new Hapi.Server()
    server.register(HapiReactRedux)
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
      const res = await server.inject({
        method: 'GET',
        url: '/notfound'
      })
      expect(res.result).toMatch(/Not found/)
      expect(res.statusCode).toBe(404)
      done()
  })
})
