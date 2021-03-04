class CommentController {
  static Comment
  static Blog
  static User
  static validateComment

  static setData = (Comment, Blog, User, validateComment) => {
    this.Comment = Comment
    this.Blog = Blog
    this.User = User
    this.validateComment = validateComment
  }

  // @desc    post new comment
  // @route   POST /comment
  // @access  Private
  static postComment = async (req, res) => {
    const { commentText } = req.body
    const { blogId } = req.params
    const { error } = this.validateComment({ commentText })
    if (error) return res.status(400).json({ error: error.details[0].message })

    const blog = await this.Blog.findOne({ _id: blogId })
    if (!blog) return res.status(404).json({ message: "Blog doesn't exist" })

    const comment = new this.Comment({
      commentText: commentText,
      userId: req.user._id,
      blogId: blogId,
      layout: './layouts/AuthLayout',
    })

    await comment.save()
    res.status(200).json({ comment })
  }

  // @desc    update comment
  // @route   PUT /comment
  // @access  Private
  static updateComment = async (req, res) => {
    console.log('re.body', req.body)
    let { commentText } = req.body
    const { id } = req.params

    const { error } = this.validateComment({ commentText })
    if (error)
      return res.status(400).json({ message: error.details[0].message })

    let comment = await this.Comment.findOne({ _id: id })
    if (!comment)
      return res.status(200).json({ message: 'Comment with this id not found' })

    if (String(comment.userId) !== String(req.user._id)) {
      return res.status(403).json({ message: "You can't update this comment" })
    }

    comment = await this.Comment.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          commentText: commentText,
        },
      },
      { new: true }
    )

    res.status(200).json(comment)
  }

  // @desc    delete comment
  // @route   DELETE /comment
  // @access  Private
  static deleteComment = async (req, res) => {
    const { id } = req.params
    let comment = await this.Comment.findOne({ _id: id })
    if (!comment)
      return res.status(200).json({ message: 'Comment with this id not found' })

    const commentUserId = String(comment.userId)
    const loggedInUserId = String(req.user._id)

    if (commentUserId !== loggedInUserId) {
      console.log(comment.userId, req.user._id)
      return res.status(403).json({ message: "You can't delete this comment" })
    }

    comment = await this.Comment.deleteOne({ _id: id })
    res.status(200).json({ comment })
  }
}

module.exports = CommentController
