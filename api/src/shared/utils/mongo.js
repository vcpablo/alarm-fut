import { pipe, keys, reduce, isArray, get, pickBy, identity } from 'lodash/fp'

export const buildFilter = fields =>
  pipe(
    keys,
    reduce((result, key) => {
      const value = get(key, fields)
      const current = isArray(value)
        ? { [get(0, value)]: get(1, value) }
        : { [key]: value }

      return {
        ...result,
        ...current
      }
    }, {}),
    sanitizeFilter
  )(fields)

export const sanitizeFilter = filter => pickBy(identity, filter)
