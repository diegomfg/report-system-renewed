const express = require('express')
const morgan = require('morgan')
const hbs = require('hbs')
const cors = require('cors')
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
const userRoutes = require('./routes/user.routes')
const reportRoutes = require('./routes/report.routes')
const port = process.env.PORT || 8080;

const { auth } = require('express-openid-connect');

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: 'dd7dd637972f52732cae5c3b62f2116d06e2e74a9ef2a4a73e8272fd45194890',
  baseURL: 'http://localhost:8080',
  clientID: 'qZZ8Txao0Oa1b1F0VBA79o739KQjDzq0',
  issuerBaseURL: 'https://diegomfg.us.auth0.com'
};

/**
 * Setup main Express application.
 * @param {Express.Application} app
 */
const app = express();
/**
 * auth router attaches /login, /logout, and /callback routes to the baseURL
 * */
app.use(auth(config));
/**
 * Serve static content and set up view engine config
 */
app.set('view engine', 'hbs')
app.use(express.static(__dirname + '/public'))
app.set('views','public/views/')
hbs.registerPartials(__dirname + '/public/views/partials')
/**
 * Setup logger
 */
// app.use(morgan('common'))

/**
 * Middleware set up
 */
app.use(express.json())
app.use(cors())
app.use(middleware.general)
app.use((req, res, next) => {
    // res.locals.user = req.oidc.user
    next()
})
/**
 * Routes. All defined in their external files.
 * @todo Add middleware to protect routes
 * @todo Use authorization token middleware
 */
app.use('/', pagesRoutes)
app.use('/users', userRoutes)
app.use('/reports', reportRoutes)

/**
 * @todo Set up Error handler
 */
app.use((err, req, res, next) => {
    return process.env.NODE_ENV == 'development' ? res.status(500).send(err) : res.status(404).send('Something broke!!')
})

app.listen(port, () => {
    console.log(`Service running at port: ${port}`)
})