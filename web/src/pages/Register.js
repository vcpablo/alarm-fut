import React from 'react'
import { NavLink } from 'react-router-dom'
import { Button, Row, Col, Image } from 'react-bootstrap'

import RegisterFormik from '@/components/RegisterFormik/RegisterFormik'

const Register = () => {
  const onSubmit = (values) => {
    console.log('lift', values)
  }

  return (
    <>
      <Row>
        <Col className="text-center">
          <Image src="/logo.png" className="w-25" />
          <hr />
        </Col>
      </Row>
      <Row>
        <Col>
          <RegisterFormik onSubmit={onSubmit} />
        </Col>
      </Row>
      <hr />
      <Row>
        <Col>
          <p>
            <Button variant="outline-danger" size="block">
              Register with Google
            </Button>
            <Button variant="outline-primary" size="block">
              Register with Facebook
            </Button>
          </p>
          <hr />
          <p className="text-center">
            Already have an account?
            <NavLink
              className="nav-link"
              activeClassName="active"
              exact
              to="/login"
            >
              Sign in
            </NavLink>
          </p>
        </Col>
      </Row>
    </>
  )
}

export default Register
