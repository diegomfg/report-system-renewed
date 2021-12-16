const express = require('express');

// config vars
const dotenv  = require('dotenv').config();
// Database connection
                require('./database/connection')()
// User model
const User    = require('./models/User');
// User routes
const userRoutes = require('./routes/user.routes')

const port    = process.env.PORT || 8080;

/**
 * Setup main Express application.
 */
const app = express();

app.use(express.json())

/**
 * Set up the external routes.
 */
 app.use('/users', userRoutes)

app.get('/', async (req, res) => {    
    res.send("ok")
})

app.listen(port, () => {
    console.log(`Service running at port: ${port}`)
})