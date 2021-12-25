const express = require('express');

// config environment vars
const dotenv = require('dotenv').config();
// Database connection
require('./database/connection')()
// User routes
const userRoutes = require('./routes/user.routes')
const reportRoutes = require('./routes/report.routes')

const port = process.env.PORT || 8080;

/**
 * Setup main Express application.
 */
const app = express();

/**
 * Setup json middleware
 */
app.use(express.json())

/**
 * Set up the external routes.
 */

 app.use('/users', userRoutes)
 app.use('/reports', reportRoutes)


app.get('/', async (req, res) => {
    res.send("ok")
})

app.listen(port, () => {
    console.log(`Service running at port: ${port}`)
})