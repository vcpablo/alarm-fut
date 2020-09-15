import { Schema, model } from 'mongoose'

const UserTeamSchema = new Schema({
  _id: Schema.Types.ObjectId,
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  team: { type: Number, ref: 'Team' }
})

export const UserTeam = model('UserTeam', UserTeamSchema)
