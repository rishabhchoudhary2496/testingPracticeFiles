const express = require('express')
const router = express.Router()
const wagner = require('wagner-core')

wagner.invoke((Comment, User, validateReply, isAuth, ReplyController) => {
  //injecting dependencies in controller
  ReplyController.setData(Comment, User, validateReply)
  router.post('/', isAuth, ReplyController.postReply)
  router.put('/:id', isAuth, ReplyController.updateReply)
  router.delete('/:id', isAuth, ReplyController.deleteReply)
})

module.exports = router
