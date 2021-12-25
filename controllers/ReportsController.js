const Report = require('../models/Report');

module.exports = {
    getAll: (req, res) => {
        Report
        .find({})
        .exec()
        .then((reports) => {
            return res.send(reports)
        })
        .catch((err) => { 
            return res.send(err.message)
        })
    },

    get: (req, res) => {

        const { id } = req.params;

        Report
        .findOne({id})
        .exec()
        .then((report)=> res.send(report)).catch((error) => {
            console.log(error)
            res.send(error.message)
        })

    },

    create: (req, res) => {

        Report
        .create(req.body)
        .then((created) => {
            console.log(created)
            return res.send(created)
        }).catch((error) => {
            console.log(error)
            res.send(error.message)
        })

    },

    update: (req, res) => {
       
         const { id } = req.params;

         try {
             const updated = await Report.updateOne({id}, {...req.body})
             res.send({updated})
 
         } catch (error) {
             res.send(error.message)
         }
    },

    delete: (req, res) => {

        const { id } = req.params;

        Report
        .deleteOne({id})
        .exec()
        .then((deleteResult) => res.send(deleteResult))
        .catch((error) => { 
            console.log(error); res.send(error.message)
        })
    }
}