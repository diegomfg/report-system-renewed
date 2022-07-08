const express = require('express')
const morgan = require('morgan')
const hbs = require('hbs')
const cors = require('cors')
const bodyParser = require('body-parser')
const middleware = require('./middleware/middleware')
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
 * @summary Import the routes for the two main entities.
 * Each entity has its own API.
 */
const pagesRoutes = require('./routes/pages.routes')
const reportRoutes = require('./routes/report.routes')
const port = process.env.PORT || 8080;
/**
 * @summary The Auth0 authentication middleware
 */
const { auth, requiresAuth } = require('express-openid-connect');

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
app.set('views', 'public/views/')
app.use(express.static(__dirname + '/public/'))
/**
 * @summary Set up Handlebars
 * Added the isLanding helper function 
 * to ensure that the navbar is rendered everywhere else 
 * but the landing page
 */
hbs.registerPartials(__dirname + '/public/views/partials/')
hbs.registerHelper("isLanding", function (page)
{
  return page !== "Landing"
})
/**
 * @summary Helper function to summary down a report's description down to 150 characters
 */
hbs.registerHelper("summary", function (text)
{
  return text.slice(0, 150) + '...'
})
hbs.registerHelper("isDefaultValue", function (candidate, value)
{
  return candidate == value;
})











/**
 * Setup logger
 */
app.use(morgan('dev'))
/**
 * @summary Middleware set up
 * @todo Remove json middleware for form-data parsing?
 * auth router attaches /login, /logout, and /callback routes to the baseURL
 */
app.use(auth(config));
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(middleware.general)











app.use('/', pagesRoutes)
app.use('/reports', requiresAuth(), reportRoutes)

app.use((err, req, res, next) =>
{
  /**
   * @todo Check if user is authenticated.
   *       If Authenticated, go back with error message.
   *       If not Authenticated, render index with base error.
   *       Actually, what I'm thinking is using req.originalUrl to redirect to the previous page with the error message.
   */
  res.render('index', { error: err, PageTitle: 'Landing' })
})

app.listen(port, () =>
{
  console.log(`Service running at port: ${port}`)
})