import { compact } from 'lodash/fp'
import { Team } from '../../models/team.model'

const teams = async (_, { _id, name, area }) => {
  const lookup = compact([
    _id && { $match: { _id } },
    area && { $match: { area } },
    name && { $match: { name: new RegExp(name, 'i') } },
    {
      $lookup: {
        from: 'areas',
        let: { area: '$area' },
        pipeline: [
          { $match: { $expr: { $eq: ['$_id', '$$area'] } } },
          {
            $lookup: {
              from: 'areas',
              let: { parentArea: '$parentArea' },
              pipeline: [
                { $match: { $expr: { $eq: ['$_id', '$$parentArea'] } } }
              ],
              as: 'parentArea'
            }
          },
          { $unwind: '$parentArea' }
        ],
        as: 'area'
      }
    },
    { $unwind: '$area' },
    { $sort: { name: 1 } }
  ])

  return await Team.aggregate(lookup)
}

const teamsResolvers = {
  Query: {
    teams
  }
}

export default teamsResolvers
