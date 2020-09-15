import { omit } from 'lodash/fp'
import httpStatusCodes from 'http-status-codes'

const errorHandler = (err, req, res, next) => {
  if (!err) return next()

  res
    .status(err.status || httpStatusCodes.INTERNAL_SERVER_ERROR)
    .json(omit(['name', 'status'], err))
}

export default errorHandler
