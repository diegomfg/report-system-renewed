const mongoose = require('mongoose');
const timeStamp = require("mongoose-timestamp");

const reportSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        min: [3, 'Title must be at least 3 characters long']
    },

    body: {
        type: String
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