const path = require('path')
require('dotenv').config()

const { Seeder } = require('mongo-seeding')

const config = {
  database: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    name: process.env.DB_NAME
  },
  dropDatabase: process.env.ENV === 'development'
}

const seed = async function() {
  try {
    const seeder = new Seeder(config)
    const collections = seeder.readCollectionsFromPath(
      path.resolve(`./seeder/collections/${process.env.SEED}`)
    )
    await seeder.import(collections)
  } catch (err) {
    console.log(err)
  }
}

module.exports = {
  seed
}
