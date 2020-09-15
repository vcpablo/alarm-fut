import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import FormControlFeedback from '@/components/FormControlFeedback/FormControlFeedback'

const RecoverPasswordForm = ({
  handleChange,
  handleSubmit,
  values,
  errors
}) => {
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
          required
          placeholder="Enter your email address"
          onChange={handleChange}
          value={values.email}
        />
        <FormControlFeedback message={errors.email} />
      </Form.Group>
      <Button variant="success" type="submit" size="block">
        Recover Password
      </Button>
    </Form>
  )
}

export default RecoverPasswordForm
