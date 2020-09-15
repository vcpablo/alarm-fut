import { map } from 'lodash/fp'
import { buildFilter } from '../../shared/utils/mongo'
import { UserTeam } from '../../models/userTeam.model'
import { User } from '../../models/user.model'

const userTeams = async (_, params, { user }) => {
  const filter = buildFilter({ user: user.id })

  return await UserTeam.find(filter)
    .populate('team')
    .populate('user')
}

const saveUserTeams = async (_, { teams }, { user }) => {
  const { _id } = user
  const userTeams = map(
    teamId => ({
      user: _id,
      team: teamId
    }),
    teams
  )
  await User.update({ lastAccess: new Date() }, _id)
  await UserTeam.deleteMany({ user: user._id })
  return await UserTeam.insertMany(userTeams)
}

const userTeamsResolvers = {
  Query: {
    userTeams
  },
  Mutation: {
    saveUserTeams
  }
}

export default userTeamsResolvers
