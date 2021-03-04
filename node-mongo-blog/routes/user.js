const express = require('express')
const router = express.Router()
const wagner = require('wagner-core')

wagner.invoke(
  (
    passport,
    User,
    isAuth,
    multer,
    storage,
    validateUser,
    UserController,
    Blog,
    fs,
    path
  ) => {
    //injecting dependencies in controller
    UserController.setData(passport, User, validateUser, Blog, fs, path)
    router.get('/login', UserController.showLoginPage)
    router.post('/login', UserController.login)
    router.get('/logout', isAuth, UserController.logout)

    const upload = multer({
      storage,
      limits: { fileSize: 1024 * 1024 * 5 },
    })

    router.get('/profile/:id', UserController.showProfile)
    router.get('/signup', UserController.showSignUpPage)
    router.post('/signup', upload.single('profilePic'), UserController.signUp)
  }
)

module.exports = router
