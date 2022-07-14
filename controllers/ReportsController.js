const Report = require('../models/Report');
const REPORT_CATEGORIES = require('../constants/ReportCategories')

module.exports = {
    renderCreate: (req, res) =>
    {
        return res.render('report/new', {
            PageTitle: "Create new report",
            categories: REPORT_CATEGORIES
        });
    },
    renderUpdate: async (req, res, next) =>
    {
        try
        {
            const report = await Report.findById(req.params.id)
            return res.render('report/update', {
                PageTitle: "Update report",
                report,
                categories: REPORT_CATEGORIES
            });
        } catch (error)
        {
            return next(error)
        }
    },

    findAll: async (req, res, next) =>
    {

        try
        {
            /**
             * @todo Research pagination?
             */
            const reports = await (await Report.find()).reverse();
            return res.render('report/all-reports', {
                reports,
                PageTitle: "All Reports"
            })
        } catch (error)
        {
            return next(error)
        }
    },

    findById: async (req, res, next) =>
    {

        const {
            id
        } = req.params;

        try
        {
            const report = await Report.findById(id);

            if (!report) return res.redirect('/reports')
            return res.render('report/single', {
                report: report,
                PageTitle: 'View Report'
            })
        } catch (error)
        {
            return next(error)
        }
    },

    create: async (req, res, next) =>
    {

        if (!req.body.title || !req.body.body || !req.oidc.user)
        {
            return res.redirect(req.baseUrl)
        }

        try
        {

            const created = await Report
                .create({
                    title: req.body.title,
                    body: req.body.body,
                    author: req.oidc.user.email,
                    category: req.body.category
                })
            return res.redirect('/reports')
        } catch (error)
        {
            return next(error)
        }
    },

    update: async (req, res, next) =>
    {

        const {
            id
        } = req.params;

        if (!req.body.title || !req.body.body || !req.oidc.user)
        {
            return res.redirect('/reports')
        }

        try
        {
            const updated = await Report.findByIdAndUpdate(id, {
                $set: req.body
            })
            if (updated.modifiedCount == 0)
            {
                let error = {
                    message: 'Something happened and no reports were updated'
                }
                return next(error)
            }

            return res.redirect(`/reports/${updated.id}`)

        } catch (error)
        {
            return next(error)
        }
    },

    delete: async (req, res, next) =>
    {

        const {
            id
        } = req.params;

        try
        {
            const report = await Report.findById(id)
            if (!report)
            {
                const error = {
                    message: `No report found with id ${id}`
                }
                next(error)
            }
            const deleted = await Report.findByIdAndDelete(id);
            return res.status(200).redirect('/reports')
        } catch (error)
        {
            return next(error)
        }
    },

    complete: async (req, res, next) =>
    {
        try
        {
            const { id } = req.params;
            const report = await Report.findById(id);
            report.completed = true;
            await report.save();
            if (!report)
            {
                return next(new Error(`Couldn't find report with id: ${req.params.id}`))
            }
            return res.redirect(`/reports/${id}`)
        } catch (error)
        {
            return next(error)
        }
    },

    filterComplete: async (req, res, next) =>
    {
        const { isComplete } = req.params;
        try
        {
            const reports = await Report.find({ completed: isComplete })

            res.render('report/all-reports', { reports, PageTitle: `${isComplete ? 'Completed' : 'Pending'} reports`, route: `${isComplete ? 'pending' : 'complete'}` })
        } catch (error)
        {
            return next(error)
        }
    }
}