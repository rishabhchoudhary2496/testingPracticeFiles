const joi = require('joi')
const fs = require('fs').promises
const path = require('path')
const passport = require('passport')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const LocalStrategy = require('passport-local').Strategy
const { Blog, validateBlog } = require('./models/Blog')
const { Comment, validateComment, validateReply } = require('./models/Comment')

const { User, validateUser } = require('./models/User')
const Like = require('./models/Like')
const Dislike = require('./models/Dislike')
const multer = require('multer')
const storage = require('./utils/multerConfig')
const { isAuth } = require('./utils/middlewares')

const UserController = require('./controllers/UserController')
const BlogController = require('./controllers/BlogController')
const CommentController = require('./controllers/CommentController')
const ReplyController = require('./controllers/ReplyController')

module.exports = function (wagner) {
  wagner.factory('joi', function () {
    return joi
  })

  wagner.factory('passport', function () {
    return passport
  })

  wagner.factory('joi', function () {
    return joi
  })

  wagner.factory('LocalStrategy', function () {
    return LocalStrategy
  })

  wagner.factory('Blog', function () {
    return Blog
  })

  wagner.factory('validateBlog', function () {
    return validateBlog
  })

  wagner.factory('validateComment', function () {
    return validateComment
  })

  wagner.factory('validateReply', function () {
    return validateReply
  })

  wagner.factory('User', function () {
    return User
  })

  wagner.factory('Comment', function () {
    return Comment
  })

  wagner.factory('validateUser', function () {
    return validateUser
  })

  wagner.factory('bcrypt', function () {
    return bcrypt
  })

  wagner.factory('multer', function () {
    return multer
  })

  wagner.factory('storage', function () {
    return storage
  })

  wagner.factory('isAuth', function () {
    return isAuth
  })

  wagner.factory('UserController', function () {
    return UserController
  })

  wagner.factory('BlogController', function () {
    return BlogController
  })

  wagner.factory('CommentController', function () {
    return CommentController
  })

  wagner.factory('ReplyController', function () {
    return ReplyController
  })

  wagner.factory('mongoose', function () {
    return mongoose
  })

  wagner.factory('Like', function () {
    return Like
  })

  wagner.factory('Dislike', function () {
    return Dislike
  })

  wagner.factory('fs', function () {
    return fs
  })

  wagner.factory('path', function () {
    return path
  })
}
