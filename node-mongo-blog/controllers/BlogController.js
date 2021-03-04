class BlogController {
  static Blog
  static Comment
  static validateBlog
  static Like
  static Dislike
  static mongoose

  static setData(Blog, Comment, validateBlog, Like, Dislike, mongoose) {
    this.Blog = Blog
    this.Comment = Comment
    this.validateBlog = validateBlog
    this.Like = Like
    this.Dislike = Dislike
    this.mongoose = mongoose
  }

  // @desc    Get all the blogs
  // @route   GET /blog
  // @access  Public
  static getBlogList = async (req, res) => {
    const blogs = await this.Blog.find().populate('authorId')

    res.render('Home', {
      title: 'Home',
      blogs: blogs,
      loggedInUserId: req.user._id,
    })
  }

  static writeBlog = async (req, res) => {
    res.render('CreateBlog', {
      title: 'Create Blog',
      loggedInUserId: req.user._id,
    })
  }

  // @desc    Create new blog
  // @route   POST /blog
  // @access  Private
  static createBlog = async (req, res) => {
    let { title, content, tags } = req.body
    const { error } = this.validateBlog({ title, content })
    if (error)
      return res.status(400).json({ message: error.details[0].message })
    let blog = await this.Blog.findOne({ title: title })
    if (blog)
      return res.status(400).json({
        message: 'Choose Another Title.Blog With This Title Already Exist',
      })

    tags = JSON.parse(tags)

    blog = new this.Blog({
      title: title,
      content: content,
      tags: tags,
      authorId: req.user._id,
    })
    await blog.save()
    res.json({ blog })
  }

  // @desc    Get blog by id
  // @route   GET /blog/:id
  // @access  Public
  static getBlog = async (req, res) => {
    const { id } = req.params
    const blog = await this.Blog.findOne({ _id: id }).populate('authorId')

    if (!blog)
      return res.status(404).json({ message: 'No Blog Exist With This Id' })

    const comments = await this.Comment.find({ blogId: id }).deepPopulate(
      'userId replies.userId'
    )

    const LikeCount = await this.Like.aggregate()
      .match({
        blogId: this.mongoose.Types.ObjectId(id),
      })
      .group({ _id: '$blogId', count: { $sum: 1 } })

    const disLikeCount = await this.Dislike.aggregate()
      .match({
        blogId: this.mongoose.Types.ObjectId(id),
      })
      .group({ _id: '$blogId', count: { $sum: 1 } })

    const loggedInUserLiked = await this.Like.findOne({
      blogId: id,
      userId: req.user._id,
    })

    const loggedInUserDisliked = await this.Dislike.findOne({
      blogId: id,
      userId: req.user._id,
    })

    res.render('Blog', {
      title: 'Blog',
      data: {
        blog: blog,
        comments: comments,
        likeCount: LikeCount,
        dislikeCount: disLikeCount,
        loggedInUserLiked: loggedInUserLiked ? true : false,
        loggedInUserDisliked: loggedInUserDisliked ? true : false,
        loggedInUserId: req.user._id,
      },
      layout: './layouts/NavLess',
    })
  }

  // @desc    Update blog
  // @route   PUT /blog/:id
  // @access  Private
  static updateBlog = async (req, res) => {
    const { id } = req.params
    const { title, content, tags } = req.body
    const blog = await this.Blog.findOneAndUpdate(
      { _id: id },
      {
        title: title,
        content: content,
        tags: tags,
      },
      { new: true }
    )

    if (!blog)
      return res.status(404).json({ message: 'No Blog Exist With This Id' })

    res.status(200).json({ blog })
  }

  // @desc    Delete blog
  // @route   DELETE /blog/:id
  // @access  Private
  static deleteBlog = async (req, res) => {
    const { id } = req.params
    const blog = await this.Blog.findOneAndDelete({ _id: id })

    if (!blog)
      return res.status(404).json({ message: 'No Blog Exist With This Id' })

    res.status(200).json({ blog })
  }

  static LikeBlog = async (req, res) => {
    const { id } = req.params
    const haveLiked = await this.Like.findOne({
      blogId: id,
      userId: req.user._id,
    })
    if (haveLiked) return res.json({ message: 'Already Liked by user' })

    await this.Dislike.findOneAndDelete({ blogId: id, userId: req.user._id })

    let like = new this.Like({
      blogId: id,
      userId: req.user._id,
    })

    await like.save()
    res.status(200).json({ message: 'liked' })
  }

  static DislikeBlog = async (req, res) => {
    const { id } = req.params
    const haveDisliked = await this.Dislike.findOne({
      blogId: id,
      userId: req.user._id,
    })
    if (haveDisliked) return res.json({ message: 'Already Disliked by user' })

    await this.Like.findOneAndDelete({ blogId: id, userId: req.user._id })

    let dislike = new this.Dislike({
      blogId: id,
      userId: req.user._id,
    })

    await dislike.save()
    res.status(200).json({ message: 'dislike' })
  }
}

module.exports = BlogController
