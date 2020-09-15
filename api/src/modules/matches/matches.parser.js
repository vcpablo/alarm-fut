import { isEmpty, pipe, curry } from 'lodash/fp'
import { sanitizeFilter } from '../../shared/utils/mongo'

const initFilter = ({ _id, areaId }) => ({
  _id,
  'competition.area.id': areaId,
  $and: []
})

const appendTeamsFilter = (teamIds, filter) =>
  !isEmpty(teamIds)
    ? {
        ...filter,
        $or: [
          { 'homeTeam.id': { $in: teamIds } },
          { 'awayTeam.id': { $in: teamIds } }
        ]
      }
    : filter

const appendDatesFilter = (dateFrom, dateTo, filter) => {
  const formattedDateTo = new Date(dateTo)
  formattedDateTo.setDate(formattedDateTo.getDate() + 1)

  return dateFrom || dateTo
    ? {
        ...filter,
        $and: [
          ...filter.$and,
          {
            utcDate: {
              ...(dateFrom ? { $gte: new Date(dateFrom).toISOString() } : {}),
              ...(dateTo ? { $lte: formattedDateTo.toISOString() } : {})
            }
          }
        ]
      }
    : filter
}

const appendCompetitionsFilter = (competitionIds, filter) =>
  !isEmpty(competitionIds)
    ? {
        ...filter,
        $and: [
          ...filter.$and,
          {
            'competition.id': { $in: competitionIds }
          }
        ]
      }
    : filter

export const buildFilter = ({
  _id,
  teamIds,
  areaId,
  competitionIds,
  dateFrom,
  dateTo
}) => {
  return pipe(
    initFilter,
    curry(appendTeamsFilter)(teamIds),
    curry(appendDatesFilter)(dateFrom, dateTo),
    curry(appendCompetitionsFilter)(competitionIds),
    sanitizeFilter
  )({ _id, teamIds, areaId, competitionIds, dateFrom, dateTo })
}

export const groupByCompetition = matches => matches
