import React from 'react'
import { first } from 'lodash/fp'
import { Alert } from 'react-bootstrap'
import { BsFillExclamationTriangleFill } from 'react-icons/bs'
import Loading from './Loading'
import Error from './Error'
import { useHistory } from 'react-router-dom'

const withState = (Component) => {
  return (props) => {
    const { error, loading, data } = props

    if (loading) {
      return <Loading />
    } else if (error) {
      if (first(error.networkError.result.errors).extensions.code === 401) {
        const history = new useHistory()
        history.push('/login')
        return null
      } else {
        return <Error />
      }
    } else {
      return data && data.length === 0 ? (
        <Alert variant="light" className="d-flex align-items-center">
          <BsFillExclamationTriangleFill className="mr-2" /> No items found...
        </Alert>
      ) : (
        <Component {...props} />
      )
    }
  }
}

export default withState
