import { Schema, model } from 'mongoose'

const CompetitionSchema = new Schema({
  _id: Number,
  name: String,
  code: String,
  emblemUrl: String,
  season: Object,
  plan: String,
  numberOfAvailableSeasons: Number,
  lastUpdated: Date,
  area: { type: Number, ref: 'Area' }
})

export const Competition = model('Competition', CompetitionSchema)
