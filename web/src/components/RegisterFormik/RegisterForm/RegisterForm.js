import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import FormControlFeedback from '@/components/FormControlFeedback/FormControlFeedback'

const RegisterForm = ({ handleChange, handleSubmit, values, errors }) => {
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
      <Form.Group controlId="registerFormName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          name="name"
          type="text"
          required
          placeholder="Enter your full name"
          onChange={handleChange}
          value={values.name}
        />
        <FormControlFeedback message={errors.name} />
      </Form.Group>
      <Form.Group controlId="registerFormEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          name="email"
          type="email"
          required
          placeholder="Enter your email address"
          onChange={handleChange}
          value={values.email}
        />
        <FormControlFeedback message={errors.email} />
      </Form.Group>

      <Form.Group controlId="registerFormPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          name="password"
          type="password"
          required
          placeholder="Enter your password"
          onChange={handleChange}
          value={values.password}
        />
        <FormControlFeedback message={errors.password} />
      </Form.Group>
      <Button variant="success" type="submit" size="block">
        Create Free Account
      </Button>
    </Form>
  )
}

export default RegisterForm
