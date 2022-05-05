const { Mongoose, mongo } = require('mongoose');
const ResponseStrings = require('../constants/ResponseStrings');
const Report = require('../models/Report');
const Response = require('../models/Response');

module.exports = {
    findAll: async (req, res) => {

        try {
            const reports = await Report.find();
        return res.render('report/all-reports', { reports })
        } catch (error) {
            return res.render('report/error', {error: error.message})
        }
    },

    findById: async (req, res, next) => {

        const { id } = req.params;

        try {
            const report = await Report.findById(id);
            if(!report) return res.redirect(404, '/')
            return res.render('report/single', {report: report, PageTitle: `ID: ${report.id}`})
        } catch (error) {
            next(error)
        }
    },

    create: async (req, res) => {

        try {
            console.log(req.body)
            // Create the report and associate it with the current User
            // To beging with, just create the report so the application can render it in the reports page
            const created = await Report.create({title: req.body.title, body: req.body.body})

            return res.redirect('/')
        } catch (error) {
            return next(error)
        }
    },

    /**
     * 
     * @todo Validate request body
     */
    update: async (req, res) => {

         const { id } = req.params;

         try {
             const updated = await Report.findByIdAndUpdate(id, {$set: req.body})
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
            const report = await Report.findById(id)
            if(!report) {
                return res.render('report/error', {error: `No report found with id: ${id}`});
            }
            const deleted = await Report.findByIdAndDelete(id);
            // Redirect to /reports with status message
            return res.redirect('/')
        } catch (error) {
            return res.send(new Response(ResponseStrings.ERROR, error.message))
        }
    }
}