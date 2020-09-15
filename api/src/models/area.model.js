import { Schema, model } from 'mongoose'

const AreaSchema = new Schema({
  _id: Number,
  name: String,
  countryCode: String,
  ensignUrl: String,
  parentArea: { type: Number, ref: 'Area' }
})

export const Area = model('Area', AreaSchema)
