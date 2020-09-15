import { filter, pipe, reduce, pick, flatMap, sortBy } from 'lodash/fp'

const getMatchesByCompetition = ({ matches, competitionId }) => {
  // console.log(matches)
  return filter((match) => {
    // console.log(match.competition._id, competitionId)
    return match.competition._id === competitionId
  }, matches)
}

export const groupMatchesByCompetition = (matches) =>
  pipe(
    reduce(
      (result, match) => ({
        ...result,
        [match.competition._id]: {
          ...pick(['_id', 'name', 'area'], match.competition),
          matches: getMatchesByCompetition({
            matches,
            competitionId: match.competition._id
          })
        }
      }),
      {}
    )
    // flatMap((match) => match),
    // sortBy('competition.name')
  )(matches)

export const formatDate = (utcDate) =>
  new Date(utcDate).toLocaleTimeString().replace(/(.*)\D\d+/, '$1')
