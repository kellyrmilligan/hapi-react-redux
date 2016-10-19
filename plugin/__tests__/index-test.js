'use strict';

var Hapi = require('hapi');

var alt = require('fixtures/alt');
var clientRoutes = require('fixtures/routes');
var badClientRoutes = require('fixtures/bad-routes');
var redirectClientRoutes = require('fixtures/redirect-routes');
var layout = require('fixtures/layout');
var badLayout = require('fixtures/bad-layout');

var options = {
  routes: clientRoutes,
  layout: layout,
  alt: alt,
  config: {
    honeybadger: '1234'
  },
  assets: {
    styles: {},
    scripts: {}
  }
};

var HapiReactAlt = require('plugin/index');

describe('hapi react alt plugin', function () {
  it('can be registered', function (done) {
    var server = new Hapi.Server();
    server.connection();
    server.register(HapiReactAlt, function (err) {
      expect(server).toBeTruthy();
      expect(server.hapiReactAlt).toBeTruthy();
      expect(err).toBeUndefined();
      done();
    });
  });

  it('can set options with the hapiReactAlt method', function (done) {
    var server = new Hapi.Server();
    server.connection();
    server.register(HapiReactAlt, function (err) {
      options.layout = layout;
      options.routes = clientRoutes;
      server.hapiReactAlt(options);
      server.route({
        method: 'GET',
        path: '/',
        handler: function handler(request, reply) {
          return reply.hapiReactAltRender();
        }
      });
      server.inject({
        method: 'GET',
        url: '/?q=test'
      }, function (res) {
        expect(res.result).toContain('home');
        expect(res.result).toContain('123');
        done();
      });
    });
  });

  it('can have a handler call the hapiReactAltRender method on reply', function (done) {
    var server = new Hapi.Server();
    server.connection();
    server.register(HapiReactAlt, function (err) {
      options.layout = layout;
      options.routes = clientRoutes;
      server.hapiReactAlt(options);
      server.route({
        method: 'GET',
        path: '/',
        handler: function handler(request, reply) {
          return reply.hapiReactAltRender();
        }
      });
      server.inject({
        method: 'GET',
        url: '/'
      }, function (res) {
        expect(res.result).toContain('home');
        expect(res.result).toContain('123');
        done();
      });
    });
  });

  it('can use the server handler instead of calling the method directly', function (done) {
    var server = new Hapi.Server();
    server.connection();
    server.register(HapiReactAlt, function (err) {
      options.layout = layout;
      options.routes = clientRoutes;
      server.hapiReactAlt(options);
      server.route({
        method: 'GET',
        path: '/',
        handler: { hapiReactAltHandler: {} }
      });
      server.inject({
        method: 'GET',
        url: '/'
      }, function (res) {
        expect(res.result).toContain('home');
        expect(res.result).toContain('123');
        done();
      });
    });
  });

  it('can collect data from fetch methods on route handlers to have in the rendered output via route-resolver', function (done) {
    var server = new Hapi.Server();
    server.connection();
    server.register(HapiReactAlt, function (err) {
      options.layout = layout;
      options.routes = clientRoutes;
      server.hapiReactAlt(options);
      server.route({
        method: 'GET',
        path: '/',
        handler: { hapiReactAltHandler: {} }
      });
      server.inject({
        method: 'GET',
        url: '/'
      }, function (res) {
        expect(res.result).toContain('testfetchValue');
        done();
      });
    });
  });

  it('can use data send to the hapiReactAltRender method on reply', function (done) {
    var server = new Hapi.Server();
    server.connection();
    server.register(HapiReactAlt, function (err) {
      options.layout = layout;
      options.routes = clientRoutes;
      server.hapiReactAlt(options);
      server.route({
        method: 'GET',
        path: '/',
        handler: function handler(request, reply) {
          return reply.hapiReactAltRender({
            test: 'the test'
          });
        }
      });
      server.inject({
        method: 'GET',
        url: '/'
      }, function (res) {
        expect(res.result).toContain('the test');
        done();
      });
    });
  });

  it('can use data sent to the hapiReactAltRender method on reply', function (done) {
    var server = new Hapi.Server();
    server.connection();
    server.register(HapiReactAlt, function (err) {
      options.layout = layout;
      options.routes = clientRoutes;
      server.hapiReactAlt(options);
      server.route({
        method: 'GET',
        path: '/',
        handler: function handler(request, reply) {
          return reply.hapiReactAltRender({
            test: 'the test'
          });
        }
      });
      server.inject({
        method: 'GET',
        url: '/'
      }, function (res) {
        expect(res.result).toContain('the test');
        done();
      });
    });
  });

  it('can use data from route prereqs', function (done) {
    var server = new Hapi.Server();
    server.connection();
    server.register(HapiReactAlt, function (err) {
      options.layout = layout;
      options.routes = clientRoutes;
      server.hapiReactAlt(options);
      server.route({
        method: 'GET',
        path: '/',
        config: {
          pre: [{ method: function method(request, reply) {
              return reply('preTest');
            }, assign: 'preTest' }]
        },
        handler: function handler(request, reply) {
          return reply.hapiReactAltRender();
        }
      });
      server.inject({
        method: 'GET',
        url: '/'
      }, function (res) {
        expect(res.result).toContain('preTest');
        done();
      });
    });
  });

  it('will redirect if RR has a redirect route in it', function (done) {
    var server = new Hapi.Server();
    server.connection();
    server.register(HapiReactAlt, function (err) {
      options.layout = layout;
      options.routes = redirectClientRoutes;
      server.hapiReactAlt(options);
      server.route({
        method: 'GET',
        path: '/{path*}',
        handler: function handler(request, reply) {
          return reply.hapiReactAltRender();
        }
      });
      server.inject({
        method: 'GET',
        url: '/about'
      }, function (res) {
        expect(res.statusCode).toBe(301);
        done();
      });
    });
  });

  it('will throw error if layout/components are not valid', function (done) {
    var server = new Hapi.Server();
    server.connection();
    server.register(HapiReactAlt, function (err) {
      options.layout = badLayout;
      options.routes = clientRoutes;
      server.hapiReactAlt(options);
      server.route({
        method: 'GET',
        path: '/',
        handler: function handler(request, reply) {
          return reply.hapiReactAltRender();
        }
      });
      server.inject({
        method: 'GET',
        url: '/'
      }, function (res) {
        expect(res.statusCode).toBe(500);
        done();
      });
    });
  });

  it('will 404 if not found', function (done) {
    var server = new Hapi.Server();
    server.connection();
    server.register(HapiReactAlt, function (err) {
      options.layout = layout;
      options.routes = clientRoutes;
      server.hapiReactAlt(options);
      server.route({
        method: 'GET',
        path: '/{path*}',
        handler: function handler(request, reply) {
          return reply.hapiReactAltRender();
        }
      });
      server.inject({
        method: 'GET',
        url: '/notfound'
      }, function (res) {
        expect(res.statusCode).toBe(404);
        done();
      });
    });
  });

  it('will throw error if react router throws an err', function (done) {
    var server = new Hapi.Server();
    server.connection();
    server.register(HapiReactAlt, function (err) {
      options.layout = layout;
      options.routes = badClientRoutes;
      server.hapiReactAlt(options);
      server.route({
        method: 'GET',
        path: '/',
        handler: function handler(request, reply) {
          return reply.hapiReactAltRender();
        }
      });
      server.inject({
        method: 'GET',
        url: '/'
      }, function (res) {
        expect(res.statusCode).toBe(500);
        done();
      });
    });
  });
});
//# sourceMappingURL=index-test.js.map