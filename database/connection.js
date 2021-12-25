const Mongoose = require('mongoose');
const connection_url = process.env.local_db || 'mongodb://localhost:27017/report_system_node';

module.exports = () => {

        Mongoose.connect(connection_url)
        .then(()=> console.log("database connection ok"))
        .catch((error) => console.log(error.message));
    
}