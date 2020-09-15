import { compact, isEmpty } from 'lodash/fp'
import { Competition } from '../../models/competition.model'
import { ApolloError } from 'apollo-server'

const competitions = async (_, { _id, area }) => {
  const lookup = compact([
    _id && { $match: { _id } },
    area && { $match: { area } },
    {
      $lookup: {
        from: 'areas',
        localField: 'area',
        foreignField: '_id',
        as: 'area'
      }
    },
    {
      $unwind: '$area'
    }
  ])

  const competitions = await Competition.aggregate(lookup)

  if (_id && isEmpty(competitions)) {
    throw new ApolloError('Competition not found', 404)
  }

  return competitions
}

const competitionsResolvers = {
  Query: {
    competitions
  }
}

export default competitionsResolvers
