import bcrypt from 'bcrypt'
// import normalize from 'normalize-mongoose'
import { Schema, model } from 'mongoose'
import { isValidEmail } from '../shared/utils/validators'

const UserSchema = new Schema({
  _id: String,
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    validate: {
      validator: isValidEmail,
      message: props => `${props.value} is not a valid email`
    },
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isReady: Boolean
})

UserSchema.pre('save', function(next) {
  const user = this
  if (!this.isModified('password')) return next()

  bcrypt.genSalt(10, function(err, salt) {
    if (err) return next(err)

    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err)
      // eslint-disable-next-line fp/no-mutation
      user.password = hash
      next()
    })
  })
})

// eslint-disable-next-line fp/no-mutation
UserSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.password)
}

export const User = model('User', UserSchema)
