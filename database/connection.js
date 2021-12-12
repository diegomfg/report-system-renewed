const Mongoose = require('mongoose');
const connection_url = process.env.local_db || 'mongodb://localhost:27017/report_system_node';

module.exports = () => {
    
        Mongoose.connect(connection_url, (error) => {
            if(error) console.log(error);
            console.log("database connection ok")
        });
    
}