hapi-react-alt
=====================
hapi plugin for supporting universal rendering on the server side.

# Dependencies
* react router 2
* react 15
* alt 0.18

# Why?
yes you could just write a module, import it, and re-use it in handlers and what not. but why not follow hapi's nice plugin architecture and make it easy?

## Usage
hapi-react-alt tries to be un-opinionated where possible. In a few places for the sake of ease of use, a few constraints are in place for the top level component of your application. The patterns are modeled after the `vision` hapi plugin for rendering template views.

## Register the plugin and configure it
```js
import HapiReactAlt from 'hapi-react-alt'
const server = new Hapi.Server()
server.connection()
server.register(HapiReactAlt, (err) => {
  server.hapiReactAlt({
    routes : clientRoutes,//routes for react router
    layout : layout,//layout file, see more below
    alt    : alt,//alt instance
    config : {//any app config you want passed to the client side app
      value: '1234'
    },
    assets : {//any assets you want to use in your layout file, styles and scripts shown below are arbitrary
      styles: {
      },
      scripts: {
      }
    }
  })
})
```

this registers the plugin, and configures it for use.

## Use the `reply.hapiReactAltRender` method to respond to a request
```js
import HapiReactAlt from 'hapi-react-alt'
const server = new Hapi.Server()
server.connection()
server.register(HapiReactAlt, (err) => {
  server.hapiReactAlt({
    routes : clientRoutes,//routes for react router
    layout : layout,//layout file, see more below
    alt    : alt,//alt instance
    config : {//any app config you want passed to the client side app
      value: '1234'
    },
    assets : {//any assets you want to use in your layout file, styles and scripts shown below are arbitrary
      styles: {
      },
      scripts: {
      }
    }
  })
  server.route({
    method: 'GET',
    path: '/',
    handler(request, reply) {
      return reply.hapiReactAltRender()
    }
  })
})
```
The plugin decorates the reply server method, and adds the `hapiReactAltRender` method to it. This will use the options configured for your application, such as routes from react router, etc. if you need to pass some additional data from the server in your controller, you can send an object to the method:

```js
server.route({
  method: 'GET',
  path: '/',
  handler(request, reply) {
    //fetch some data
    return reply.hapiReactAltRender({
      user: {
        name: 'Homer'//this will be available to your application as well. more on this in a bit
      }
    })
  }
})
```

## Use the server handler
hapi also has server handlers, where you can assign a predefined handler to a route if you know it will be the same all the time.

```js
server.route({
  method: 'GET',
  path: '/',
  handler: { hapiReactAltHandler: {} }
})
```

this will call the `reply.hapiReactAltRender` for you in your controller mapped to that route.

## Layout file
For server rendering to work, you need a layout file for other parts of the markup that are not directly rendered by react.

`layout = renderToString(<Layout assets={assets} config={config} content={iso.render()} />)`

the layout file is written in react, and is passed the data you configure in assets and config. the result of the react-router rendering is passed into the layout as content.

an example layout file is in the fixtures folder under src.

## Top level component
Server rendering with React Router 2 requires the use of a component `RouterContext`. In order to pass props into this component, there are several methods built into react to do this. This plugin has a light Component that wraps `RouterContext`, `UniversalProvider`.

```js
<UniversalProvider pre={pre} serverContext={context} config={config} >
  <RouterContext {...props} />
</UniversalProvider>
```

is passes config, and data coming from pre route handlers, and any extra context data that may have come from your handler.

In your `App.js` file, an example to handle this would be something like:

```js
import React, { Component } from 'react'

export default class App extends Component {

  static contextTypes = {
    config: React.PropTypes.object,
    pre: React.PropTypes.object,
    serverContext: React.PropTypes.object,
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}
```

## Fetching for routes on the server and the client
Another constraint that this plugin imposes is the high level way that requests for data are made for routes.

Each component that needs data for a route needs to be in the RR handler hierarchy and have a static fetch method that returns a promise that will be resolved when any requests are completed. Other than that, inside that method you can retrieve data any way that you like.

### Example
```js
Component.fetch = function(params, query) {
  //a source method on an alt store returns a promise
  return UserStore.loadUser()
}
```

For more reading, see:
https://github.com/ReactTraining/react-router/issues/3183

if you want to pass the context as props, see this example:
https://github.com/ReactTraining/react-router/blob/master/examples/passing-props-to-children/app.js

## client side entry point
explain the symmetry between the two things
