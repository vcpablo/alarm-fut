import React from 'react'
import { Row, Col, Form } from 'react-bootstrap'

const Countries = () => (
  <>
    <Row>
      <Col>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Control type="search" placeholder="Type to search..." />
          </Form.Group>
        </Form>
      </Col>
    </Row>
    <h1>Suggested Countries</h1>
  </>
)

export default Countries
