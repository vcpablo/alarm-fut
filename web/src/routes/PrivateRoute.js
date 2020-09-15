import React from 'react'
import Navbar from '@/components/Navbar'
import Container from 'react-bootstrap/Container'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      localStorage.getItem(`${process.env.REACT_APP_CODE}__token`) ? (
        <>
          <Navbar {...props} />
          <Container className="pt-3 pb-5">
            <Component {...props} />
          </Container>
        </>
      ) : (
        <Redirect
          to={{ pathname: '/login', state: { from: props.location } }}
        />
      )
    }
  />
)

export default PrivateRoute
