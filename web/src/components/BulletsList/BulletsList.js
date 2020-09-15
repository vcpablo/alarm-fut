import React from 'react'
import { map } from 'lodash/fp'
import { Row, Col } from 'react-bootstrap'
import BulletItem from './BulletItem/BulletItem'

const BulletsList = ({ items, onClick }) => (
  <>
    <p>
      <b>
        Selected Teams <small>Click the "x" to remove</small>
      </b>
    </p>
    <Row>
      <Col className="d-flex">
        {map(
          (item) => (
            <BulletItem key={item._id} item={item} onClick={onClick} />
          ),
          items
        )}
      </Col>
    </Row>
  </>
)

export default BulletsList
