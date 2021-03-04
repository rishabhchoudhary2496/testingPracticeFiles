const mongoose = require('mongoose')

const likeSchema = mongoose.Schema({
  blogId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog',
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
})

const Like = mongoose.model('Like', likeSchema)

module.exports = Like
