const Mongoose = require('mongoose');
const fallback = 'mongodb://localhost:27017/report_system_node'

module.exports = async () => {
    try {
        await Mongoose.connect(process.env.local_db || fallback);
        console.log('Database connection ready')
    } catch (error) {
        console.log(error.message);
    }
}