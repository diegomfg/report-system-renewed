const express = require('express')
const morgan = require('morgan')
const hbs = require('hbs')
const cors = require('cors')
const bodyParser = require('body-parser')
const middleware = require('./middleware/middleware')
const hbsSetup = require('./utils/hbsHelpers')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const authMiddleware = require('./utils/authHelpers')
const mongoose = require('mongoose')
/**
 * @summary Configure environment variables
 * Loads a local .env file with configuration variables such as PORT, local_db_uri, prod_db_uri
 */
const dotenv = require('dotenv')
dotenv.config()
/**
 * @summary Requires Mongodb and starts the connection
 */
const connection = require('./database/connection')
connection();
/**
 * @summary Import the routes for pages and reports controllers
 */
const pagesRoutes = require('./routes/pages.routes')
const reportRoutes = require('./routes/report.routes')
const port = process.env.PORT || 8080;
/**
 * @summary The Auth0 authentication middleware
 */
const {
  auth,
  requiresAuth
} = require('express-openid-connect');

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.secret,
  baseURL: process.env.baseURL,
  clientID: process.env.clientID,
  issuerBaseURL: process.env.issuerBaseURL
};
/**
 * Setup main Express application.
 * @param {Express.Application} app
 */
const app = express();
/**
 * @summary Serve static content
 * Set up views
 * Register Handlebars partials
 */
app.set('view engine', 'hbs')
app.set('views', __dirname + '/public/views/')
app.use(express.static(__dirname + '/public/'))
hbs.registerPartials(__dirname + '/public/views/partials/')
hbsSetup(hbs)
/**
 * @summary Setup logger
 */
app.use(morgan('dev'))
/**
 * @summary Middleware set up
 * auth router attaches /login, /logout, and /callback routes to the baseURL
 */
app.use(auth(config))
app.use(session({
  secret: '20192-3920-129',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.prod_db_uri,
    dbName: "report-system",
    collectionName: "sessions",
    autoRemove: 'interval',
    autoRemoveInterval: 15,
    touchAfter: 1800
  })
}))
app.use(express.json())
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(cors())
app.use(middleware.tokenValidator)
app.use(middleware.general)
app.use(authMiddleware.setDefaultRole)

/**
 * @summary Resource routes
 */
app.use('/', pagesRoutes)
app.use('/reports', requiresAuth(), reportRoutes)

app.use((req, res, next) =>
{
  return next({ message: 'Not found 404' })
})

app.use((err, req, res, next) =>
{
  let error;
  console.log(err)
  error = err
  res.render('index', {
    error,
    PageTitle: 'Landing'
  })
})

app.listen(port, () =>
{
  console.log(`Service running at port: ${port}`)
})