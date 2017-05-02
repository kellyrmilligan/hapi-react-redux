import React from 'react'
import App from './Root'
import Home from './Home'

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
        component: NotFound
      }
    ]
  }
]

export default routes
