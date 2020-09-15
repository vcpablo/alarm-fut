/* eslint-disable fp/no-mutation */
import { last, split, pipe } from 'lodash/fp'
import jwt, { JsonWebTokenError } from 'jsonwebtoken'
import HttpStatus from 'http-status-codes'
import errors from '@modules/'

const authGuard = (req, res, next) => {
  try {
    const token = req.headers.authorization
    const regex = /authenticate/

    if (!regex.test(req.url)) {
      if (!token) {
        res.statusCode = HttpStatus.UNAUTHORIZED
        throw new JsonWebTokenError(errors.JWT_INVALID_MESSAGE)
      }
      const jwtPayload = verifyToken(token)
      console.log(jwtPayload)
      req.user = jwtPayload
    }

    next()
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      error.status = HttpStatus.UNAUTHORIZED
      error.message = errors.JWT_INVALID_MESSAGE
    }
    throw error
  }
}

function verifyToken(token) {
  const pureToken = pipe(split(' '), last)(token)
  return jwt.verify(pureToken, process.env.JWT_SECRET)
}

export default authGuard
