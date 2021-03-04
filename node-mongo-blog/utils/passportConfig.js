module.exports = function (wagner) {
  wagner.invoke((passport, LocalStrategy, User, bcrypt) => {
    passport.use(
      new LocalStrategy(
        { usernameField: 'email', passwordField: 'password' },
        async (email, password, done) => {
          try {
            const user = await User.findOne({ email: email })
            if (!user) {
              return done(null, false, {
                message: 'Email or Password is Incorrect',
              })
            }

            const isPasswordMatched = await bcrypt.compare(
              password,
              user.password
            )

            if (!isPasswordMatched)
              return done(null, false, {
                message: 'Email or Password is Incorrect',
              })

            return done(null, user)
          } catch (err) {
            return done(err)
          }
        }
      )
    )

    passport.serializeUser(function (user, done) {
      done(null, user._id)
    })

    passport.deserializeUser(function (id, done) {
      User.findById(id, function (err, user) {
        done(err, user)
      })
    })
  })
}
