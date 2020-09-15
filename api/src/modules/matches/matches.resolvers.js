import mongoose, { Schema } from 'mongoose'
mongoose.set('debug', true)
import { map, compact, isEmpty } from 'lodash/fp'
import { ApolloError } from 'apollo-server'
import { Match } from '../../models/match.model'
import { UserTeam } from '../../models/userTeam.model'

const matches = async (_, { _id, dateFrom, dateTo }) => {
  if (!_id && !dateFrom && !dateTo) {
    throw new ApolloError('You must specify an _id or a date from or a date to')
  }

  const formattedDateTo = new Date(dateTo)
  formattedDateTo.setDate(formattedDateTo.getDate() + 1)

  const lookup = compact([
    {
      $lookup: {
        from: 'teams',
        let: { homeTeam: '$homeTeam' },
        pipeline: [
          { $match: { $expr: { $eq: ['$_id', '$$homeTeam'] } } },
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
          { $unwind: '$area' }
        ],
        as: 'homeTeam'
      }
    },
    { $unwind: '$homeTeam' },
    _id && { $match: { _id } },
    (dateFrom || dateTo) && {
      $match: {
        $and: [
          {
            utcDate: {
              ...(dateFrom ? { $gte: new Date(dateFrom).toISOString() } : {}),
              ...(dateTo ? { $lte: formattedDateTo.toISOString() } : {})
            }
          }
        ]
      }
    }
  ])

  const matches = await Match.aggregate(lookup)

  if (_id && isEmpty(matches)) {
    throw new ApolloError('Match not found', 404)
  }

  return matches
}

const userMatches = async (_, { dateFrom, dateTo }, { user }) => {
  if (!dateFrom && !dateTo) {
    throw new ApolloError('You must specify a date from or a date to')
  }

  const userTeams = map(
    ({ team }) => team,
    await UserTeam.find({ user: user._id }, { team: 1 })
  )

  const formattedDateTo = new Date(dateTo)
  formattedDateTo.setDate(formattedDateTo.getDate() + 1)

  const lookup = compact([
    {
      $match: {
        $expr: {
          $or: [
            { $in: ['$homeTeam', userTeams] },
            { $in: ['$awayTeam', userTeams] }
          ]
        }
      }
    },
    {
      $lookup: {
        from: 'competitions',
        as: 'competition',
        let: { competition: '$competition' },
        pipeline: [
          { $match: { $expr: { $eq: ['$_id', '$$competition'] } } },
          {
            $lookup: {
              from: 'areas',
              let: { area: '$area' },
              as: 'area',
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
              ]
            }
          },
          { $unwind: '$area' }
        ]
      }
    },
    { $unwind: '$competition' },
    {
      $lookup: {
        from: 'teams',
        let: { homeTeam: '$homeTeam' },
        pipeline: [
          { $match: { $expr: { $eq: ['$_id', '$$homeTeam'] } } },
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
          { $unwind: '$area' }
        ],
        as: 'homeTeam'
      }
    },
    { $unwind: '$homeTeam' },
    {
      $lookup: {
        from: 'teams',
        let: { awayTeam: '$awayTeam' },
        pipeline: [
          { $match: { $expr: { $eq: ['$_id', '$$awayTeam'] } } },
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
          { $unwind: '$area' }
        ],
        as: 'awayTeam'
      }
    },
    { $unwind: '$awayTeam' },
    {
      $lookup: {
        from: 'usermatches',
        let: { id: '$_id' },
        pipeline: [
          {
            $match: {
              $expr: { $eq: ['$match', '$$id'] }
            }
          }
        ],
        as: 'userMatch'
      }
    },
    { $unwind: { path: '$userMatch', preserveNullAndEmptyArrays: true } },
    (dateFrom || dateTo) && {
      $match: {
        $and: [
          {
            utcDate: {
              ...(dateFrom ? { $gte: new Date(dateFrom).toISOString() } : {}),
              ...(dateTo ? { $lte: formattedDateTo.toISOString() } : {})
            }
          }
        ]
      }
    }
  ])

  return await Match.aggregate(lookup)
}

const matchesResolvers = {
  Query: {
    matches,
    userMatches
  }
}

export default matchesResolvers
