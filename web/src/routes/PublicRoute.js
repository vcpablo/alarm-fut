import React from 'react'
import { Route } from 'react-router-dom'
import Container from 'react-bootstrap/Container'

const PublicRoute = ({ component: Component, ...rest }) => (
  <Container className="pt-3 pb-5">
    <Route {...rest} render={(props) => <Component {...props} />} />
  </Container>
)

export default PublicRoute
