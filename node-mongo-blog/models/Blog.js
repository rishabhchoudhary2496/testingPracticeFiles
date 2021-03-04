const mongoose = require('mongoose')
const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

const blogSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    minLength: 5,
    maxLength: 500,
  },
  content: {
    type: String,
    required: true,
    minLength: 10,
  },
  tags: {
    type: ['string'],
  },
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
})

const Blog = mongoose.model('Blog', blogSchema)

const validateBlog = function (blog) {
  const schema = Joi.object({
    title: Joi.string().required().min(5).max(500),
    content: Joi.string().required().min(10),
  })
  return schema.validate(blog)
}

module.exports = {
  Blog,
  validateBlog,
}
