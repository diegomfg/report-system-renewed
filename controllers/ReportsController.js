const ResponseStrings = require('../constants/ResponseStrings');
const Report = require('../models/Report');
const Response = require('../models/Response');

module.exports = {
    findAll: (req, res) => {
        Report
        .find({})
        .exec()
        .then((reports) => {
            return res.send(new Response(ResponseStrings.SUCCESS, reports))
        })
        .catch((err) => { 
            return res.send(err.message)
        })
    },

    findById: (req, res) => {

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

    update: async (req, res) => {
       
         const { id } = req.params;

         try {
             const updated = await Report.updateOne({id}, {...req.body})
             res.status(200).send({updated})
 
         } catch (error) {
            console.log(error.message);
             res.send(error.message)
         }
    },

    delete: (req, res) => {

        const { id } = req.params;

        Report
        .deleteOne({id})
        .exec()
        .then((deleteResult) => res.status(200).send((deleteResult)))
        .catch((error) => { 
            console.log(error); res.send(error.message)
        })
    }
}