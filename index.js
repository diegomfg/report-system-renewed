const express = require('express')
const morgan = require('morgan')
const hbs = require('hbs')
const cors = require('cors')
const middleware = require('./middleware/middleware')
/**
 * @summary Configure environment variables
 * Loads a local .env file with configuration variables such as PORT, local_db_uri, prod_db_uri
 */
const dotenv = require('dotenv').config()
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
/**
 * Setup main Express application.
 * @param {Express.Application} app
 */
const app = express();


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
/**
 * Routes. All defined in their external files.
 * @todo Add middleware to protect routes
 * @todo Use authorization token middleware
 */
app.use('/', pagesRoutes)
app.use('/users', userRoutes)
app.use('/reports', reportRoutes)

app.listen(port, () => {
    console.log(`Service running at port: ${port}`)
})