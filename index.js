const express = require('express')
const morgan = require('morgan')
const hbs = require('hbs')

/**
 *
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
const userRoutes = require('./routes/user.routes')
const reportRoutes = require('./routes/report.routes')
const registerRoutes = require('./routes/register.routes')

const port = process.env.PORT || 8080;

/**
 * Setup main Express application.
 */
const app = express();

app.set('view engine', 'hbs')

/**
 * Serve static content
 */
app.use(express.static(__dirname + '/public'))
app.set('views','public/views/')

hbs.registerPartials(__dirname + '/public/views/partials')

/**
 * Setup logger
 */
app.use(morgan('common'))

/**
 * Setup json middleware
 */
app.use(express.json())

/**
 * Set up the external routes.
 */

app.get('/', (req, res) => {
    res.send({
        "/users": "Users API",
        "/reports": "Reports API"
    })
})
/**
 * @todo Add middleware to protect routes
 * @todo Use authorization token middleware
 */
app.use('/users', userRoutes)
app.use('/reports', reportRoutes)
app.use('/register', registerRoutes)

app.listen(port, () => {
    console.log(`Service running at port: ${port}`)
})