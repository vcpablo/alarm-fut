import React from 'react'
import { pipe, map, join } from 'lodash/fp'
import Alert from 'react-bootstrap/Alert'

const GraphQLError = ({ errors, onClose }) => {
  return (
    <Alert show variant="danger" dismissible onClose={onClose}>
      {pipe(
        map(({ message }) => message),
        join(' | ')
      )(errors)}
    </Alert>
  )
}

export default GraphQLError
