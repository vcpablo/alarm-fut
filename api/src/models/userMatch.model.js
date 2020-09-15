import { Schema, model } from 'mongoose'

const UserMatchSchema = new Schema({
  _id: Schema.Types.ObjectId,
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  match: { type: Number, ref: 'Match' },
  notification: Boolean,
  favorite: Boolean
})

export const UserMatch = model('UserMatch', UserMatchSchema)
