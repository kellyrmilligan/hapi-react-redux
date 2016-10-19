'use strict'
const Hapi = require('hapi')

const alt = require('fixtures/alt')
const clientRoutes = require('fixtures/routes')
const badClientRoutes = require('fixtures/bad-routes')
const redirectClientRoutes = require('fixtures/redirect-routes')
const layout = require('fixtures/layout')
const badLayout = require('fixtures/bad-layout')

const options = {
  routes : clientRoutes,
  layout : layout,
  alt    : alt,
  config : {
    honeybadger: '1234'
  },
  assets : {
    styles: {
    },
    scripts: {
    }
  }
}

const HapiReactAlt = require('plugin/index')

describe('hapi react alt plugin', () => {
  it('can be registered', (done) => {
    const server = new Hapi.Server()
    server.connection()
    server.register(HapiReactAlt, (err) => {
      expect(server).toBeTruthy()
      expect(server.hapiReactAlt).toBeTruthy()
      expect(err).toBeUndefined()
      done()
    })
  })

  it('can set options with the hapiReactAlt method', (done) => {
    const server = new Hapi.Server()
    server.connection()
    server.register(HapiReactAlt, (err) => {
      options.layout = layout
      options.routes = clientRoutes
      server.hapiReactAlt(options)
      server.route({
        method: 'GET',
        path: '/',
        handler(request, reply) {
          return reply.hapiReactAltRender()
        }
      })
      server.inject({
        method: 'GET',
        url: '/?q=test'
      }, (res) => {
        expect(res.result).toContain('home')
        expect(res.result).toContain('123')
        done()
      })
    })
  })

  it('can have a handler call the hapiReactAltRender method on reply', (done) => {
    const server = new Hapi.Server()
    server.connection()
    server.register(HapiReactAlt, (err) => {
      options.layout = layout
      options.routes = clientRoutes
      server.hapiReactAlt(options)
      server.route({
        method: 'GET',
        path: '/',
        handler(request, reply) {
          return reply.hapiReactAltRender()
        }
      })
      server.inject({
        method: 'GET',
        url: '/'
      }, (res) => {
        expect(res.result).toContain('home')
        expect(res.result).toContain('123')
        done()
      })
    })
  })

  it('can use the server handler instead of calling the method directly', (done) => {
    const server = new Hapi.Server()
    server.connection()
    server.register(HapiReactAlt, (err) => {
      options.layout = layout
      options.routes = clientRoutes
      server.hapiReactAlt(options)
      server.route({
        method: 'GET',
        path: '/',
        handler: { hapiReactAltHandler: {} }
      })
      server.inject({
        method: 'GET',
        url: '/'
      }, (res) => {
        expect(res.result).toContain('home')
        expect(res.result).toContain('123')
        done()
      })
    })
  })

  it('can collect data from fetch methods on route handlers to have in the rendered output via route-resolver', (done) => {
    const server = new Hapi.Server()
    server.connection()
    server.register(HapiReactAlt, (err) => {
      options.layout = layout
      options.routes = clientRoutes
      server.hapiReactAlt(options)
      server.route({
        method: 'GET',
        path: '/',
        handler: { hapiReactAltHandler: {} }
      })
      server.inject({
        method: 'GET',
        url: '/'
      }, (res) => {
        expect(res.result).toContain('testfetchValue')
        done()
      })
    })
  })

  it('can use data send to the hapiReactAltRender method on reply', (done) => {
    const server = new Hapi.Server()
    server.connection()
    server.register(HapiReactAlt, (err) => {
      options.layout = layout
      options.routes = clientRoutes
      server.hapiReactAlt(options)
      server.route({
        method: 'GET',
        path: '/',
        handler(request, reply) {
          return reply.hapiReactAltRender({
            test: 'the test'
          })
        }
      })
      server.inject({
        method: 'GET',
        url: '/'
      }, (res) => {
        expect(res.result).toContain('the test')
        done()
      })
    })
  })

  it('can use data sent to the hapiReactAltRender method on reply', (done) => {
    const server = new Hapi.Server()
    server.connection()
    server.register(HapiReactAlt, (err) => {
      options.layout = layout
      options.routes = clientRoutes
      server.hapiReactAlt(options)
      server.route({
        method: 'GET',
        path: '/',
        handler(request, reply) {
          return reply.hapiReactAltRender({
            test: 'the test'
          })
        }
      })
      server.inject({
        method: 'GET',
        url: '/'
      }, (res) => {
        expect(res.result).toContain('the test')
        done()
      })
    })
  })

  it('can use data from route prereqs', (done) => {
    const server = new Hapi.Server()
    server.connection()
    server.register(HapiReactAlt, (err) => {
      options.layout = layout
      options.routes = clientRoutes
      server.hapiReactAlt(options)
      server.route({
        method: 'GET',
        path: '/',
        config: {
          pre: [
            { method: (request, reply) => { return reply('preTest') }, assign: 'preTest' }
          ]
        },
        handler(request, reply) {
          return reply.hapiReactAltRender()
        }
      })
      server.inject({
        method: 'GET',
        url: '/'
      }, (res) => {
        expect(res.result).toContain('preTest')
        done()
      })
    })
  })

  it('will redirect if RR has a redirect route in it', (done) => {
    const server = new Hapi.Server()
    server.connection()
    server.register(HapiReactAlt, (err) => {
      options.layout = layout
      options.routes = redirectClientRoutes
      server.hapiReactAlt(options)
      server.route({
        method: 'GET',
        path: '/{path*}',
        handler(request, reply) {
          return reply.hapiReactAltRender()
        }
      })
      server.inject({
        method: 'GET',
        url: '/about'
      }, (res) => {
        expect(res.statusCode).toBe(301)
        done()
      })
    })
  })

  it('will throw error if layout/components are not valid', (done) => {
    const server = new Hapi.Server()
    server.connection()
    server.register(HapiReactAlt, (err) => {
      options.layout = badLayout
      options.routes = clientRoutes
      server.hapiReactAlt(options)
      server.route({
        method: 'GET',
        path: '/',
        handler(request, reply) {
          return reply.hapiReactAltRender()
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
    server.register(HapiReactAlt, (err) => {
      options.layout = layout
      options.routes = clientRoutes
      server.hapiReactAlt(options)
      server.route({
        method: 'GET',
        path: '/{path*}',
        handler(request, reply) {
          return reply.hapiReactAltRender()
        }
      })
      server.inject({
        method: 'GET',
        url: '/notfound'
      }, (res) => {
        expect(res.statusCode).toBe(404)
        done()
      })
    })
  })

  it('will throw error if react router throws an err', (done) => {
    const server = new Hapi.Server()
    server.connection()
    server.register(HapiReactAlt, (err) => {
      options.layout = layout
      options.routes = badClientRoutes
      server.hapiReactAlt(options)
      server.route({
        method: 'GET',
        path: '/',
        handler(request, reply) {
          return reply.hapiReactAltRender()
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

})
