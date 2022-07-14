const Mongoose = require("mongoose");
// const env = require('dotenv').config({path: '../'})
const connection_url = process.env.prod_db_uri;
module.exports = () =>
{
    Mongoose.connect(connection_url, (error) =>
    {
        if (error) console.log(error)

        console.log("Database connection ok")
    })
    // .then((db) =>
    // {
    //     console.log("database connection ok")
    // })
    // .catch((error) =>
    // {
    //     // Throw the error || Handle the error
    //     console.log('Error:', error.message)
    // });

}

