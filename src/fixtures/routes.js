import React from 'react'
import App from './Root'
import Home from './Home'

const routes = [
  {
    component: App,
    routes: [
      {
        path: '/',
        exact: true,
        component: Home
      },
    ]
  }
]

export default routes
