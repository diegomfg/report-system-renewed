const express = require('express');
const morgan = require('morgan');
// config environment vars
const dotenv = require('dotenv').config();
// Database connection
const connection = require('./database/connection');
      connection();
// User routes
const userRoutes = require('./routes/user.routes')
const reportRoutes = require('./routes/report.routes');
const Report = require('./models/Report');

const port = process.env.PORT || 8080;

/**
 * Setup main Express application.
 */
const app = express();

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

app.get('/', (req, res)=>{
    res.send({"/users": "Users API",
              "/reports": "Reports API"})
})

 app.use('/users', userRoutes)
 app.use('/reports', reportRoutes)

app.listen(port, () => {
    console.log(`Service running at port: ${port}`)
})
