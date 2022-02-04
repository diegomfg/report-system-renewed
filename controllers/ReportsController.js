const ResponseStrings = require('../constants/ResponseStrings');
const Report = require('../models/Report');
const Response = require('../models/Response');

module.exports = {
    findAll: async (req, res) => {

        try {
            const reports = await Report.find();
        return res.send(new Response(ResponseStrings.SUCCESS, reports))
        } catch (error) {
            return res.send(new Response(ResponseStrings.ERROR, error.message))
        }
    },

    findById: async (req, res) => {

        const { id } = req.params;

        try {
            const report = await Report.findOne({id});
            if(!report) return res.send(new Response(ResponseStrings.ERROR, `No report found with id: ${ id }`))
            return res.send(new Response(ResponseStrings.SUCCESS, report))
        } catch (error) {
            return res.send(new Response(ResponseStrings.ERROR, error.message))
        }
    },

    create: async (req, res) => {

        try {
            const created = await Report.create(req.body);
            return res.send(new Response(ResponseStrings.SUCCESS, created))
        } catch (error) {
            return res.send(new Response(ResponseStrings.ERROR, error.message))
        }
    },

    update: async (req, res) => {
       
        /**
         * @todo Test update
         */
         const { id } = req.params;

         try {
             const updated = await Report.updateOne({id}, {...req.body})
             if(updated.modifiedCount != 0) return res.status(200).send(new Response(ResponseStrings.SUCCESS, "Successfully updated record"))

             return res.send(new Response(ResponseStrings.ERROR, "Unable to update record"))

         } catch (error) {
            console.log(error.message);
            return res.send(new Response(ResponseStrings.ERROR, error.message))
         }
    },

    delete: async (req, res) => {

        const { id } = req.params;

        try {
            const report = await Report.findOne({id})
            if(report == null) {
                return res.send(new Response(ResponseStrings.ERROR, `No report found with id ${ id }`))
            } 
            const deleted = await Report.deleteOne({_id: id});
            return res.send(new Response(ResponseStrings.SUCCESS, deleted))
        } catch (error) {
            return res.send(new Response(ResponseStrings.ERROR, error.message))
        }
    }
}