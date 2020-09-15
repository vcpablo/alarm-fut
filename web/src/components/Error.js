import React from 'react'
import { Alert } from 'react-bootstrap'
import { BsFillExclamationTriangleFill } from 'react-icons/bs'

const Error = ({ text = 'An error occurred' }) => (
  <Alert variant="warning" className="d-flex align-items-center">
    <BsFillExclamationTriangleFill className="mr-2" /> {text}
  </Alert>
)

export default Error
