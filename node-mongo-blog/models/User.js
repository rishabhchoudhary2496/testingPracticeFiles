const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Joi = require('joi')

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    validate: function (v) {
      const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
      return emailRegex.test(v)
    },
    message: (props) => `${props.value} is not valid email`,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 255,
    trim: true,
  },
  profilePic: {
    type: String,
    required: true,
    trim: true,
  },
})

//hashing password before saving to db
userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

const User = mongoose.model('User', userSchema)

const validateUser = function (user) {
  console.log('user', user)
  const schema = Joi.object({
    name: Joi.string().required().min(3).max(255),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
      .required(),
    password: Joi.string().required().min(8),
  })
  return schema.validate(user)
}

module.exports = {
  User,
  validateUser,
}
