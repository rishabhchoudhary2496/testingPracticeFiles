const mongoose = require('mongoose')

const dislikeSchema = mongoose.Schema({
  blogId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog',
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
})

const Dislike = mongoose.model('Dislike', dislikeSchema)

module.exports = Dislike
