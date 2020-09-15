import React from 'react'
import Form from 'react-bootstrap/Form'

const FormControlFeedback = ({ message, type = 'invalid' }) => {
  return (
    (message && (
      <Form.Control.Feedback type={type}>{message}</Form.Control.Feedback>
    )) ||
    null
  )
}

export default FormControlFeedback
