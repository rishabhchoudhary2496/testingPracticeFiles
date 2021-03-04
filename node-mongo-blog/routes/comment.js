const express = require('express')
const router = express.Router()
const wagner = require('wagner-core')

wagner.invoke(
  (Comment, Blog, User, validateComment, isAuth, CommentController) => {
    CommentController.setData(Comment, Blog, User, validateComment)
    router.post('/:blogId', isAuth, CommentController.postComment)
    router.put('/:id', isAuth, CommentController.updateComment)
    router.delete('/:id', isAuth, CommentController.deleteComment)
  }
)

module.exports = router
