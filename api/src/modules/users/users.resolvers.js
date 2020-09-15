import { User } from '../../models/user.model'

const userResolver = {
  Query: {
    users: () => User.find()
  },
  Mutation: {
    saveUser: async (_, { name, email, password }) => {
      const user = await new User({ name, email, password })
      return [await user.save()]
    }
  }
}

export default userResolver
