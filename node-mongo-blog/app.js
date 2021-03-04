const express = require('express')
const app = express()
const mongoose = require('mongoose')
const path = require('path')
const cors = require('cors')
require('express-async-errors')
const expressLayouts = require('express-ejs-layouts')
const session = require('express-session')
const wagner = require('wagner-core')
const MongoStore = require('connect-mongo')(session)
const passport = require('passport')
const { handleError } = require('./utils/middlewares')
const { connectToDB } = require('./utils/db')
app.use(express.json())
require('./bootstrap')(wagner)
require('./utils/passportConfig')(wagner)

app.use(
  session({
    secret: 'MySession',
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      collection: 'sessions',
    }),

    cookie: {
      maxAge: 2592000000,
    },
  })
)

app.use(passport.initialize())
app.use(passport.session())
app.use(cors())
app.use(expressLayouts)
app.use('/public', express.static(path.resolve(__dirname, 'public')))
app.set('layout', './layouts/FullWidthLayout')
app.set('view engine', 'ejs')
app.set('views', path.resolve(__dirname, 'views/'))
require('./routes')(app)
app.use(handleError)

const PORT = process.env.PORT || 5000

const server = app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
  connectToDB()
})

module.exports = server
