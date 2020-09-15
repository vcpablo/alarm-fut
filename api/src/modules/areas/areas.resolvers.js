import { isEmpty } from 'lodash/fp'
import { ApolloError } from 'apollo-server'
import { Area } from '../../models/area.model'

const areas = async (_, { _id }) => {
  const lookup = [
    {
      $lookup: {
        from: 'areas',
        localField: 'parentArea',
        foreignField: '_id',
        as: 'parentArea'
      }
    },
    {
      $unwind: '$parentArea'
    },
    {
      $sort: { name: 1 }
    }
  ]

  const areas = await Area.aggregate(lookup)

  if (_id && isEmpty(areas)) {
    throw new ApolloError('Area not found', 404)
  }

  return areas
}

const areasResolver = {
  Query: {
    areas
  }
}

export default areasResolver
