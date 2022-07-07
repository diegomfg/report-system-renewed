const mongoose = require('mongoose');
const timeStamp = require("mongoose-timestamps");
const REPORT_CATEGORIES = require('../constants/ReportCategories')


const reportSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is a required field'],
        min: [3, 'Title must be at least 3 characters long']
    },
    body: {
        type: String,
        required: [true, 'Report must have a text body']
    },
    author: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    category: {
        type: String,
        enum: REPORT_CATEGORIES,
        default: 'general'
    }
})

reportSchema.plugin(timeStamp);

module.exports = mongoose.model('Report', reportSchema);