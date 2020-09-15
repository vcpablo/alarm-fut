import React from 'react'
import { Row, Col, Spinner } from 'react-bootstrap'

const Loading = () => (
  <Row>
    <Col className="d-flex align-items-center justify-content-center">
      <Spinner animation="grow" className="mr-2" /> Loading...
    </Col>
  </Row>
)

export default Loading
