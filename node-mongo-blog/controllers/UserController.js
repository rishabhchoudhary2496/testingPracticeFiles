class UserController {
  static passport
  static User
  static validateUser
  static Blog
  static fs
  static path

  static setData(passport, User, validateUser, Blog, fs, path) {
    this.passport = passport
    this.User = User
    this.validateUser = validateUser
    this.Blog = Blog
    this.fs = fs
    this.path = path
  }

  static showSignUpPage = async (req, res) => {
    res.render('SignUp', { title: 'SignUp', layout: './layouts/AuthLayout' })
  }

  static showLoginPage = async (req, res) => {
    res.render('Login', { title: 'Login', layout: './layouts/AuthLayout' })
  }

  static showProfile = async (req, res) => {
    const { id } = req.params
    if (!id && req.user) {
      id = req.user._id
    }
    const user = await this.User.findOne({ _id: id }).select('-password')
    if (!user) return res.status(404).json({ message: 'User Not Found' })
    const userBlogs = await this.Blog.find({ authorId: user._id })
    res.render('Profile', {
      title: 'profile',
      data: { user: user, userBlogs: userBlogs, loggedInUserId: req.user._id },
    })
  }

  // @desc    login
  // @route   POST /login
  // @access  Public
  static login = async (req, res, next) => {
    this.passport.authenticate('local', function (error, user, info) {
      if (error) {
        console.log('error', error)
        return res.status(500).json(error)
      }
      if (!user) {
        return res.status(400).json(info.message)
      } else {
        req.login(user, function (err) {
          if (err) {
            console.log('err', err)
            return res.status(500).json(err)
          }
        })
      }
      res.status(200).json({
        user: {
          _id: user._id,
          email: user.email,
          profilePic: user.profilePic,
        },
      })
    })(req, res, next)
  }

  // @desc    logout
  // @route   GET /logout
  // @access  Private
  static logout = async (req, res) => {
    req.logout()
    return res.redirect('/user/login')
  }

  // @desc    signup
  // @route   POST /signup
  // @access  Public
  static signUp = async (req, res) => {
    const { name, email, password } = req.body
    const { error } = this.validateUser({ name, email, password })

    if (error)
      return res.status(400).send({ message: error.details[0].message })

    if (!req.file)
      return res.status(400).send({ message: 'Profile pic required!' })

    let user = await this.User.findOne({
      email: email,
    })

    if (user) {
      //delete the uploaded file that multer has uploaded
      if (req.file.path) {
        try {
          await this.fs.unlink(req.file.path)
        } catch (error) {
          console.log(error)
          return res.status(500).json({ message: 'something went wrong' })
        }
      }
      return res.status(400).json({
        message: 'user already exists!',
      })
    }

    user = new this.User({
      name: name,
      email: email,
      password: password,
      profilePic: req.file.path,
    })
    await user.save()
    res.json({
      user: { name: user.name, email: user.email, profilePic: user.profilePic },
    })
  }
}

module.exports = UserController
