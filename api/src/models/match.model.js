import { Schema, model } from 'mongoose'

const MatchSchema = new Schema({
  _id: Number,
  competition: { type: Number, ref: 'Competition' },
  utcDate: String,
  status: String,
  matchday: Number,
  stage: String,
  group: String,
  lastUpdated: String,
  score: Object,
  homeTeam: { type: Number, ref: 'Team' },
  awayTeam: { type: Number, ref: 'Team' },
  referees: Array
})

export const Match = model('Match', MatchSchema)
