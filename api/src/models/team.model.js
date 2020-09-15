import { Schema, model } from 'mongoose'

const TeamSchema = new Schema({
  _id: Number,
  name: String,
  shortName: String,
  tla: String,
  crestUrl: String,
  address: String,
  phone: String,
  website: String,
  email: String,
  founded: Number,
  clubColors: String,
  venue: String,
  lastUpdated: Date,
  area: { type: Number, ref: 'Area' }
})

export const Team = model('Team', TeamSchema)
