const Mongoose = require('mongoose');
const connection_url = process.env.local_db || 'mongodb://localhost:27017/report_system_node';

module.exports = async () => {
    try {
        await Mongoose.connect(connection_url);
        console.log('Database connection ready')
    } catch (error) {
        console.log(error.message);
    }
}