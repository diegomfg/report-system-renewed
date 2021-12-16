const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 12;
const validationStrings = require('../constants/UserValidationStrings')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        min: [3, validationStrings.USERNAME_TOO_SHORT]
    },
    password: {
        type: String,
        min: [4, validationStrings.PASSWORD_MIN_LENGTH_MSG]
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        required: [true, validationStrings.INVALID_ROLE]
    }
});

/**
 * @TODO Write test cases for the schema validations.
 * @TODO Extract validation strings into external file.
 */

userSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
})

userSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('User', userSchema);