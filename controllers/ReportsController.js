const ResponseStrings = require('../constants/ResponseStrings');
const Report = require('../models/Report');
const Response = require('../models/Response');
const User = require('../models/User')

module.exports = {
    findAll: async (req, res) => {

        try {
            const reports = await Report.find();
        return res.render('report/all-reports', { reports })
        } catch (error) {
            return res.render('report/error', {error: error.message})
        }
    },

    findById: async (req, res) => {

        const { id } = req.params;

        try {
            const report = await Report.findById(id);
            if(!report) return res.render('report/error', {error: `Coudln't find report with id ${id}`})
            return res.render('report/single', {report: report, PageTitle: `ID: ${report.id}`})
        } catch (error) {
            return res.render('report/error', {error: error.message})
        }
    },

    create: async (req, res) => {

        try {
            // const { user } = req.oidc;
            // const author = User.find({email: user.email})
            // console.log('Potential Author: ', author)
            // const created = await Report.create(req.body);
            console.log(req.body)
            return res.send("Test")
            // return res.render('report/all-reports', {message: `Successfully created: ${created.title}`})
        } catch (error) {
            return res.render('report/error', {error})
        }
    },

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
                return res.send(new Response(ResponseStrings.ERROR, `No report found with id ${ id }`))
            }
            const deleted = await Report.findByIdAndDelete(id);
            return res.send(new Response(ResponseStrings.SUCCESS, deleted))
        } catch (error) {
            return res.send(new Response(ResponseStrings.ERROR, error.message))
        }
    }
}