import React from 'react'
import App from './Root'
import Home from './Home'
import { Redirect, Route } from 'react-router-dom'

const RedirectHOC = (from, to, statusCode) => {
 return ({ staticContext }) => {
   staticContext.statusCode = statusCode
   return <Redirect from={from} to={to} />
 }
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
        path: '/redirectroute',
        exact: true,
        component: RedirectHOC('/redirectroute', '/redirectroutenew', 301)
      },
    ]
  }
]

export default routes
