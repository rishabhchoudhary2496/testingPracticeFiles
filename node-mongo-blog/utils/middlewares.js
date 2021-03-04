const isAuth = function (req, res, next) {
  if (req.isAuthenticated()) {
    next()
  } else {
    res.redirect('/user/login')
  }
}

const handleError = function (err, req, res, next) {
  if (err && err.name == 'MulterError') {
    return res.status(400).send({ message: err.message })
  }
  console.log('error', err)
  res.status(500).send('something wrong!')
  next()
}

module.exports = { isAuth, handleError }
