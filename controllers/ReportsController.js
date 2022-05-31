const Report = require('../models/Report');

module.exports = {

    renderCreate: (req, res) => {
        return res.render('report/new', {PageTitle: "Create new report"});
      },

    renderUpdate: async (req, res) => {
        try {
          const report = await Report.findById(req.params.id)
          return res.render('report/update', {PageTitle: "Update report", report});
        } catch (error) {
          return next(error)
        }
      },

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

    create: async (req, res, next) => {

        try {
            /**
             * @todo Validate prescence of request' body
             */

            const created = await Report.create({title: req.body.title, body: req.body.body, author: req.oidc.user.nickname})
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
                const error = {message: `No report found with id ${id}`}
                next(error)
            }
            const deleted = await Report.findByIdAndDelete(id);
            return res.status(200).redirect('/reports')
        } catch (error) {
            return next(error)
        }
    }
}