const Mongoose = require("mongoose");
const connection_url =
    process.env.local_db_uri || process.env.prod_db_uri || "mongodb://localhost:27017/report_system_node";
/**
 * @todo Research logging to files
 */
module.exports = () => {
        Mongoose.connect(connection_url)
        .then(()=> console.log("database connection ok"))
        .catch((error) => {
            // Throw the error || Handle the error
            console.log(error.message)
        });
    
}

