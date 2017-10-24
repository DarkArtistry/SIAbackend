import { Schema } from 'mongoose'
import bcrypt from 'bcrypt-nodejs'

const userSchema = new Schema({
  firstname: {
    type: String,
    required: [true, 'first name is required'],
    minlength: [1, 'Username must be longer than 1 character']
  },
  lastname: {
    type: String,
    required: [true, 'last name is required'],
    minlength: [1, 'Username must be longer than 1 character']
  },
  email: {
    type: String,
    required: [true, 'email is required to be filled'],
    match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Entered invalid email'],
    unique: true
  }
  password: {
    type: String,
    minlength: [8, 'Password must be longer than 8 character']
  },
  localCountryCode: {
    type: String,
    minlength: [3, 'country must be at least 2 numbers']
  }
  birthday: {
    type: Number,
    required: true
  },
  birthmonth: {
    type: Number,
    required: true
  },
  birthyear: {
    type: Number,
    required: true
  },
  phone: {
    type: String,
  },
  overseasCountryCode: {
    type: String,
  },
  overseasPhone: {
    type: String,
  },
  flights: [{
    type: Schema.ObjectId,
    ref: 'Flight'
  }],
  facebook: {
    type: String
  },
  line: {
    type: String
  },
  isAdmin: {
    type: Boolean,
    default: false,
    required: true
  }

})

userSchema.pre('save', function(next) {
  let user = this
  let saltRounds = 5

  if (!user.isModified('password')) return next()

  bcrypt.genSalt(saltRounds, (err, salt) => {
    if (err) return next(err)
    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) return next(err)
      user.password = hash;
      next()
    })
  })
})

export default userSchema
