const { get, has } = require('lodash/fp')
const { formatDate, getDateMonth } = require('../src/shared/utils')
const matches = require('./matches')
const cronJob = require('cron').CronJob

const addDaysToDate = (date, days) => {
  const clone = new Date(date)
  clone.setDate(clone.getDate() + days)
  return clone
}

const sleep = ms =>
  new Promise(resolve => {
    setTimeout(resolve, ms)
  })

const currentDate = new Date()

const feedMatchesJob = async () => {
  const job = new cronJob('*/10 * * * * *', async () => {
    const dateFrom = new Date()
    const dates = [
      {
        dateFrom,
        dateTo: addDaysToDate(dateFrom, 10)
      },
      {
        dateFrom: addDaysToDate(dateFrom, 10),
        dateTo: addDaysToDate(dateFrom, 20)
      },
      {
        dateFrom: addDaysToDate(dateFrom, 20),
        dateTo: addDaysToDate(dateFrom, 31)
      }
    ]

    for (const date of dates) {
      console.log(
        `Feeding matches from ${dateFrom.toISOString()} to ${date.dateTo.toISOString()}`
      )
      await sleep(5000)
      await matches.init(formatDate(date.dateFrom), formatDate(date.dateTo))
    }
  })
  job.start()
}

const updateMatchesJob = async () => {
  const job = new cronJob('*/10 * * * * *', async () => {
    console.log(`Starting [Update] job at ${currentDate.toISOString()}`)
    await matches.update()
  })
  job.start()
}

const execute = job => {
  try {
    job()
  } catch (err) {
    const error = has('response.data', err)
      ? `Error: [${get('response.data.errorCode', err)}] ${get(
          'response.data.message',
          err
        )}`
      : err
    console.log(error)
  }
}

// execute(feedMatchesJob)
execute(updateMatchesJob)
