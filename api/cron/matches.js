const {
  findIndex,
  filter,
  map,
  get,
  flatMap,
  pipe,
  reduce,
  omit,
  concat,
  uniqBy
} = require('lodash/fp')

const fs = require('fs')
const api = require('./api')
const path = require('path')
const { seed } = require('../seeder/seeder')
const matchesSeedFile = './seeder/collections/update/1-matches/matches.json'

const sleep = ms =>
  new Promise(resolve => {
    setTimeout(resolve, ms)
  })

const fetchMatches = async filter => {
  const params = new URLSearchParams(filter).toString()
  const URL = `/matches?${params}`
  return get('data.matches', await api.get(URL))
}

const fetchMatchById = async id => {
  const URL = `/matches/${id}`
  console.log('URL', URL)
  return get('data.match', await api.get(URL))
}

const init = async ({ dateFrom, dateTo }) => {
  const matches = await fetchMatches({ dateFrom, dateTo })

  const newMatches = pipe(
    map(match => ({
      ...omit(['id', 'homeTeam', 'awayTeam', 'competition'], match),
      _id: match.id,
      homeTeam: get('homeTeam.id', match),
      awayTeam: get('awayTeam.id', match),
      competition: get('competition.id', match)
    })),
    concat(require(path.resolve(matchesSeedFile))),
    uniqBy('_id'),
    JSON.stringify
  )(matches)

  fs.writeFile(path.resolve(matchesSeedFile), newMatches, seed)
}

const update = async () => {
  const matchesSeed = require(path.resolve(matchesSeedFile))
  const unfinishedMatches = filter(
    match =>
      !['FINISHED', 'POSTPONED'].includes(match.status) &&
      new Date(match.utcDate) < new Date(new Date().toISOString()),
    matchesSeed
  )

  console.log(`Starting to update ${unfinishedMatches.length} matches...`)
  let count = 0

  for (const unfinishedMatch of unfinishedMatches) {
    console.log(`Fetching match ${unfinishedMatch._id}...`)
    const match = await fetchMatchById(unfinishedMatch._id)
    const index = findIndex(({ _id }) => _id === match.id)
    if (index) {
      count++
      matchesSeed[index] = {
        ...omit(['id'], match),
        _id: match.id
      }
    }

    await sleep(6500)
  }

  await fs.writeFile(
    path.resolve(matchesSeedFile),
    JSON.stringify(match => match, matchesSeed),
    seed
  )
  console.log(`${count} updated matches. Done!`)
}

module.exports = {
  init,
  update
}
