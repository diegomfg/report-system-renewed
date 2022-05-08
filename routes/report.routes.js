const reportRoutes = require('express').Router({mergeParams: true});
const reportsController = require('../controllers/ReportsController');
const Report = require('../models/Report');

reportRoutes.get('/', reportsController.findAll);

reportRoutes.get('/create', (req, res) => {
  return res.render('report/new', {PageTitle: "Create new report"});
})

reportRoutes.post('/', reportsController.create)

reportRoutes.get('/update/:id', async (req, res) => {
  
  try {
    const report = await Report.findById(req.params.id)
    return res.render('report/update', {PageTitle: "Update report", report});
  } catch (error) {
    return next(error)
  }
})

reportRoutes.post('/update/:id', reportsController.update)

reportRoutes.get('/delete/:id', reportsController.delete)

reportRoutes.get('/:id', reportsController.findById)

module.exports = reportRoutes;