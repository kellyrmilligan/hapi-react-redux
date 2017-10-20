hapi-react-redux
=====================
hapi plugin for supporting universal rendering on both server and client

[![Build Status](https://travis-ci.org/kellyrmilligan/hapi-react-redux.svg?branch=master)](https://travis-ci.org/kellyrmilligan/hapi-react-redux)
[![Coverage Status](https://coveralls.io/repos/github/kellyrmilligan/hapi-react-redux/badge.svg?branch=master)](https://coveralls.io/github/kellyrmilligan/hapi-react-redux?branch=master)
[![peerDependencies Status](https://david-dm.org/kellyrmilligan/hapi-react-redux/peer-status.svg)](https://david-dm.org/kellyrmilligan/hapi-react-redux?type=peer)
[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

# Why?
yes you could just write a module, import it, and re-use it in handlers and what not. but why not follow hapi's nice plugin architecture and make it easy?


## Usage
hapi-react-redux tries to be un-opinionated where possible. In a few places for the sake of ease of use, a few constraints are in place for the top level component of your application. The pattern for the plugin itself is modeled after the wonderful [vision](https://github.com/hapijs/vision) module for rendering views.

## Register the plugin and configure it
```js
import HapiReactRedux from 'hapi-react-redux'
import configureStore from 'path/to/configure/store/function'
const server = new Hapi.Server()
server.connection()
server.register(HapiReactRedux, (err) => {
  server.hapiReactRedux({
    routes : clientRoutes, // routes for react-router-config, see examples below
    layout : layout, // layout file, see more below
    configureStore, // should be a function that configures the redux store
    config : { // any app config you want passed to the client side app, should be process.env values most likely :)
      value: '1234'
    },
    assets : { // any assets you want to use in your layout file, styles and scripts shown below are arbitrary
      styles: {
      },
      scripts: {
      }
    }
  })
})
```

this registers the plugin and configures it for use.

## Options

### Routes
These are the routes for use in react router that comply with the route shape found in [react-router-config](https://www.npmjs.com/package/react-router-config)

```js
import React from 'react'
import App from './Root'
import Home from './Home'
import Search from './Search'

const NotFound = ({ staticContext }) => {
  staticContext.statusCode = 404
  return <p>Not found</p>
}

const routes = [
  {
    component: App,
    routes: [
      {
        path: '/',
        exact: true,
        component: Home
      },
      {
        path: '/search',
        component: Search
      },
      {
        component: NotFound
      }
    ]
  }
]

export default routes
```

this will allow you to set the routes in  `hapi-react-redux` and on your client-side entry point.

### Layout
For server rendering to work, you need a layout file for other parts of the markup that are not directly rendered by react.

below is a sample layout from the tests:

```js
import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Layout extends Component {
  static propTypes = {
    assets: PropTypes.object,
    config: PropTypes.object,
    content: PropTypes.string,
    state: PropTypes.string
  }

  render () {
    const { assets, content, state } = this.props
    return (
      <html lang='en-us'>
        <head>
          {Object.keys(assets.styles).map((style, key) =>
            <link href={`${assets.styles[style]}`} key={key} rel='stylesheet' type='text/css' charSet='UTF-8' />
          )}
        </head>
        <body>
          <div id='react-root' dangerouslySetInnerHTML={{__html: content}} />
          <script type='application/json' dangerouslySetInnerHTML={{ __html: `window.__data=${state}` }} charSet='UTF-8' />
          {Object.keys(assets.scripts).map((script, key) =>
            <script src={assets.scripts[script]} key={key} async />
          )}
        </body>
      </html>
    )
  }
}

```

the layout file is written in react, and is passed the data you configure in assets and config. The result of the react-router rendering is passed into the layout as content. Lastly the state of the redux store for the request is stored in the `state` prop. It is up to you to make this available to your client side application. The data is serialized using the [serialize-javascript](https://github.com/yahoo/serialize-javascript) module to protect against xss attacks.

if you are utilizing content security policies and inline scripts are not allowed, you will have to embed the data a little differently:

```js
<script type="application/json" id="initialState" dangerouslySetInnerHTML={{ __html: state }} charSet="UTF-8" />
```

The script type allows this to pass through CSP without any issues.

Then in your client side entry point, instead of just accessing the data in the variable, you have to grab the script tag and parse it.

```js
const preloadedState = JSON.parse(document.getElementById('initialState').textContent)
```

## configureStore
This should be a function that returns your fully configured redux store. an example may look something like this:

```js
import rootReducer from 'reducers'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
export default function (preloadedState) {
  return createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(
      thunk
    )
  )
}
```

## assets
this should have the paths to any javascript and css files you want on the page. these will end up as `props.assets` in your layout file, so structure it any way you want, but assets at the top level is required.

## config
this is any config you want to be made available to your client side app.

## Use the `reply.hapiReactReduxRender` method to respond to a request

```js
import HapiReactRedux from 'hapi-react-redux'
const server = new Hapi.Server()
server.connection()
server.register(HapiReactRedux, (err) => {
  server.hapiReactRedux({
    routes : clientRoutes,//routes for react router
    layout : layout,//layout file, see more below
    createStore: createStore,//should be a function that configures the redux store
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
      return reply.hapiReactReduxRender()
    }
  })
})
```
The plugin decorates the `reply` server method, and adds the `hapiReactReduxRender` method to it. This will use the options configured for your application, such as routes from react router, etc. if you need to pass some additional data from the server in your controller, you can send an object to the method:

```js
server.route({
  method: 'GET',
  path: '/',
  handler(request, reply) {
    //fetch some data
    return reply.hapiReactReduxRender({
      user: {
        name: 'Homer'//this will be available to your application as well. more on this in a bit
      }
    })
  }
})
```

this data will be available in the serverContext section of your store.

## Use the server handler
hapi also has server handlers, where you can assign a predefined handler to a route if you know it will be the same all the time.

```js
server.route({
  method: 'GET',
  path: '/',
  handler: { hapiReactReduxHandler: {} }
})
```

this will call the `reply.hapiReactReduxRender` for you in your controller mapped to that route. Note that you will not be able to send any server context with this method.

## Fetching data for routes on the server and the client
Another constraint that this plugin imposes is the high level way that requests for data are made for routes.

Each component that needs data for a route needs to be in the RR handler hierarchy and have a static fetch method that returns a promise. The returned promise will be resolved/rejected when any requests are completed. Other than that, inside that method you can retrieve data any way that you like.

### Example
```js
static fetch = function(match, location, { dispatch, getState }) {
  //a source method on an alt store returns a promise
  return store.dispatch(fetchTrunks())//dispatch an async action
}
```

The [reactRouterFetch](https://github.com/kellyrmilligan/react-router-fetch) module is used to call the static methods on the matched route handlers. it will call the fetch method with the react router [match object](https://reacttraining.com/react-router/web/api/match), the [location](https://reacttraining.com/react-router/web/api/location), and the redux `dispatch` and `getState` methods.

## Reducers
This library provides a set of reducers to add to your store configuration to facilitate the server rendering process to add it's data to the redux store.

### Auth
Hapi has an auth object that ends up being populated after a user has signed in. This object is added to the store during the rendering process. Simply include this reducer in your store and access it like you would any other data.

### Config
Any configuration data your application needs is passed from the server to the client. The provided reducer adds it to the redux store for your app to use.

### Pre handlers
Hapi has a concept called route prerequisites. These are functions that execute before a route handler is invoked. To enable this data being available in your react app, a reducer is provided to add it to the store.

### Server Context
If there is a case where you want to send some data in a response directly from the server, you can send this data to the render method provided. It will be added to the `serverContext` key of your store.  this is populated when you pass data directly from your server handler to the render method.

## Flux standard actions
The reducers and action creators included with this module try to adhere to flux standard actions spec
https://github.com/acdlite/flux-standard-action

## client side entry point
To accomplish universal rendering, there needs to be a symmetry between how the server renders the app and how the client renders the app. In order to accomplish this the app needs to:

- embed the data from the server request into the rendered response, so that the app can pick up the preloaded state and use it.
- go through the same rendering process as the server as far as `react` is concerned.
- fetch data when transitioning from route to route.

```js
import React from 'react'
import { hydrate } from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'

import clientRoutes from 'routes/routeConfig'
import configureStore from 'store/configure-store'

const store = configureStore(window.__data)

hydrate(
  <Provider store={store}>
    <Router>
      {renderRoutes(routeConfig)}
    </Router>
  </Provider>,
  document.getElementById('root')
)
```

This example is using the same routes as before. It gets the data that was embedded in the response (which in the sample layout file was made available via `window.data` variable), and bootstraps the redux store with it.

## fetching data between route transitions on the client side
There are multiple ways to accomplish this, and you may want to think about what your UX should be when the app is moving from page to page. [reactRouterFetch](https://github.com/kellyrmilligan/react-router-fetch) is used internally to do a few things:
- call `react-router-config` `matchRoutes` on the path
- call fetch on any matched components to get the data

You may choose to do something similar on your client-side app. The `react-router-fetch` repo has some sample code for this sort of component.

## TODO/UPCOMING
- fully featured sample app
- better dev ux in sample app
