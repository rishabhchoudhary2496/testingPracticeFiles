class ReplyController {
  static Comment
  static User
  static validateReply

  static setData(Comment, User, validateReply) {
    this.Comment = Comment
    this.User = User
    this.validateReply = validateReply
  }

  static postReply = async (req, res) => {
    const { replyText, commentId } = req.body
    const { error } = this.validateReply({ replyText, commentId })
    if (error) return res.status(400).json({ error: error.details[0].message })

    let comment = await this.Comment.findOneAndUpdate(
      { _id: commentId },
      {
        $push: {
          replies: {
            replyText: replyText,
            userId: req.user._id,
          },
        },
      },
      {
        new: true,
      }
    )

    if (!comment) return res.status(200).json({ message: 'comment not found' })
    res.status(200).json({ comment })
  }

  static updateReply = async (req, res) => {
    const { replyText, commentId } = req.body
    const { id } = req.params
    const { error } = this.validateReply({ replyText, commentId })
    if (error)
      return res.status(400).json({ message: error.details[0].message })

    //find if reply user is same as logged in user if yes then only he can update

    let comment = await this.Comment.aggregate().match({
      'replies.userId': req.user._id,
    })

    if (comment.length <= 0)
      return res.status(403).json({ message: 'You cannot update this reply' })

    comment = await this.Comment.findOneAndUpdate(
      {
        $and: [{ _id: commentId }, { 'replies._id': id }],
      },
      {
        'replies.$.replyText': replyText,
      },
      {
        new: true,
      }
    )

    if (!comment)
      return res.status(404).json({ message: 'comment or reply not found' })

    res.status(200).json({ comment: comment })
  }

  static deleteReply = async (req, res) => {
    const { id } = req.params

    //find if reply user is same as logged in user if yes then only he can delete
    let comment = await this.Comment.aggregate().match({
      'replies.userId': req.user._id,
    })

    if (comment.length <= 0)
      return res.status(403).json({ message: 'You cannot delete this reply' })

    comment = await this.Comment.findOneAndUpdate(
      { 'replies._id': req.params.id },
      { $pull: { replies: { _id: id } } },
      { new: true }
    )
    if (!comment) return res.status(404).json({ message: 'comment not found' })
    res.status(200).json(comment)
  }
}

module.exports = ReplyController
