import React, { useState } from 'react'
import { useMutation } from '../hooks/graphQL'
import { NavLink } from 'react-router-dom'
import { Button, Row, Col, Image } from 'react-bootstrap'
import { mutations } from '@/services'

import LoginFormik from '@/components/LoginFormik/LoginFormik'
import GraphQLError from '@/components/GraphQLError/GraphQLError'

const Login = ({ history }) => {
  const [errors, setErrors] = useState()
  const [authenticate, { loading }] = useMutation(
    mutations.AUTHENTICATE_MUTATION,
    {
      path: 'authenticate',
      unique: true
    }
  )

  const onSubmit = async (variables) => {
    const { data, errors } = await authenticate({ variables })
    if (errors) {
      setErrors(errors)
    } else {
      localStorage.setItem(`${process.env.REACT_APP_CODE}__token`, data.token)
      const route = data.user.lastAccess ? '/' : '/teams'
      history.push(route)
    }
  }

  return (
    <>
      <Row>
        <Col className="text-center">
          <Image src="/logo.png" className="w-25" />
        </Col>
      </Row>
      {errors && <GraphQLError errors={errors} onClose={() => setErrors()} />}
      <Row>
        <Col>
          <LoginFormik onSubmit={onSubmit} {...{ loading }} />
        </Col>
      </Row>
      <hr />
      <Row>
        <Col>
          <p>
            <Button variant="outline-danger" size="block">
              Sign In with Google
            </Button>
            <Button variant="outline-primary" size="block">
              Sign In with Facebook
            </Button>
          </p>
          <hr />
          <p className="text-center">
            Don't have an account?
            <NavLink
              className="nav-link"
              activeClassName="active"
              exact
              to="/register"
            >
              Register
            </NavLink>
          </p>
        </Col>
      </Row>
    </>
  )
}

export default Login
