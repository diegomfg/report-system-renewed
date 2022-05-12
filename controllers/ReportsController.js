const Report = require('../models/Report');

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
            if(!report) return res.redirect('/')
            return res.render('report/single', {report: report, PageTitle: `ID: ${report.id}`})
        } catch (error) {
            return next(error)
        }
    },

    create: async (req, res) => {

        try {
            // Create the report and associate it with the current User
            // To beging with, just create the report so the application can render it in the reports page
            const created = await Report.create({title: req.body.title, body: req.body.body})

            return res.redirect('/reports')
        } catch (error) {
            return next(error)
        }
    },

    /**
     * 
     * @todo Validate request body
     */
    update: async (req, res, next) => {

         const { id } = req.params;
         console.log(req.body)
         
         try {
             const updated = await Report.findByIdAndUpdate(id, {$set: req.body})
             if(updated.modifiedCount != 0) return res.redirect('/reports')

             return res.redirect(`/reports/${updated.id}`)

         } catch (error) {
            return next(error)
         }
    },

    delete: async (req, res, next) => {

        const { id } = req.params;
        
        try {
            const report = await Report.findById(id)
            if(!report) {
                /**
                 * @todo Fix this. Not good idea.
                 */
                const error = {message: `No report found with id ${id}`}
                next(error)
            }
            const deleted = await Report.findByIdAndDelete(id);
            // Redirect to /reports with status message
            return res.redirect('/reports')
        } catch (error) {
            return next(error)
        }
    }
}