const Report = require('../models/Report');

module.exports = {
    getAll: (req, res) => {
        Report
        .find({})
        .exec()
        .then((reports) => {
            res.send(reports)
        })
        .catch((err) => res.send(err.message))
    }
}