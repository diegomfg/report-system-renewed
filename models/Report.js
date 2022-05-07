const mongoose = require('mongoose');
const timeStamp = require("mongoose-timestamps");
/**
 * @TODO Add external validation strings.
 */
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
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    },
    approved: {
        type: Boolean,
        default: false
    }
})

reportSchema.plugin(timeStamp);

module.exports = mongoose.model('Report', reportSchema);