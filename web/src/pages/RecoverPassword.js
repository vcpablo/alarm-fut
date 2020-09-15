import React from 'react'
import { NavLink } from 'react-router-dom'
import { Row, Col, Image } from 'react-bootstrap'
import RecoverPasswordFormik from '@/components/RecoverPasswordFormik/RecoverPasswordFormik'

const RecoverPassword = () => {
  const onSubmit = (values) => console.log('lift recover', values)
  return (
    <>
      <Row>
        <Col className="text-center">
          <Image src="/logo.png" className="w-25" />
        </Col>
      </Row>
      <Row>
        <Col>
          <RecoverPasswordFormik onSubmit={onSubmit} />
        </Col>
      </Row>
      <hr />
      <Row>
        <Col>
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

export default RecoverPassword
