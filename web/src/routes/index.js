import React from 'react'
import { Switch, withRouter } from 'react-router-dom'
import PublicRoute from './PublicRoute'
import PrivateRoute from './PrivateRoute'

import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import About from '@/pages/About'
import RecoverPassword from '@/pages/RecoverPassword'
import Countries from '@/pages/Countries'
import Teams from '@/pages/Teams'

export const routes = [
  {
    name: 'About',
    path: '/about',
    component: About,
    public: true
  },
  {
    name: 'Teams',
    path: '/teams',
    component: Teams
  },
  {
    name: 'Countries',
    path: '/countries',
    component: Countries,
    public: true
  },
  {
    name: 'RecoverPassword',
    path: '/recover-password',
    component: RecoverPassword,
    public: true
  },
  {
    name: 'Login',
    path: '/login',
    component: Login,
    public: true
  },
  {
    name: 'Register',
    path: '/register',
    component: Register,
    public: true
  },
  {
    name: 'Home',
    path: '/',
    component: Home
  }
]

const Routes = ({ history }) => (
  <Switch>
    {routes.map((route) =>
      route.public ? (
        <PublicRoute
          key={route.path}
          path={route.path}
          component={() => route.component({ history })}
          exact
        />
      ) : (
        <PrivateRoute
          key={route.path}
          path={route.path}
          history={history}
          component={() => route.component({ history })}
          exact
        />
      )
    )}
  </Switch>
)

export default withRouter(Routes)
