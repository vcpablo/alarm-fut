import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import FormControlFeedback from '@/components/FormControlFeedback/FormControlFeedback'
import Wait from '@/components/Wait/Wait'

const LoginForm = ({ handleChange, handleSubmit, values, errors, loading }) => {
  const [validated, setValidated] = useState(false)
  return (
    <Form
      noValidate
      validated={validated}
      onSubmit={(values) => {
        setValidated(true)
        handleSubmit(values)
      }}
    >
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          name="email"
          type="email"
          isInvalid={errors.email}
          placeholder="Enter your email address"
          required
          onChange={handleChange}
          value={values.email}
        />
        <FormControlFeedback message={errors.email} />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          name="password"
          type="password"
          required
          isInvalid={errors.password}
          placeholder="Enter your password"
          onChange={handleChange}
          value={values.password}
        />
        <FormControlFeedback message={errors.password} />
        <Form.Text className="text-muted text-right">
          <NavLink to="/recover-password" exact className="p-0">
            Forgotten Password?
          </NavLink>
        </Form.Text>
      </Form.Group>
      <Button variant="success" type="submit" size="block" disabled={loading}>
        <Wait text="Sign In" loading={loading} />
      </Button>
    </Form>
  )
}

export default LoginForm
