const express = require('express')
const morgan = require('morgan')
const path = require('path')
// config environment vars
const dotenv = require('dotenv').config()
// Database connection
const connection = require('./database/connection')
      connection();
// User routes
const userRoutes = require('./routes/user.routes')
const reportRoutes = require('./routes/report.routes')
const registerRoutes = require('./routes/register.routes')
const Report = require('./models/Report');

const port = process.env.PORT || 8080;

/**
 * Setup main Express application.
 */
const app = express();

app.set('views', path.join(__dirname) + '/views')
app.set('view engine', 'hbs')

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
 app.use('/register', registerRoutes)

app.listen(port, () => {
    console.log(`Service running at port: ${port}`)
})
