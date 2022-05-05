const reportRoutes = require('express').Router({mergeParams: true});
const reportsController = require('../controllers/ReportsController');

reportRoutes.get('/', reportsController.findAll);

reportRoutes.get('/create', (req, res) => {
  return res.render('report/new', {PageTitle: "Create new report"});
})

reportRoutes.post('/', reportsController.create)

reportRoutes.get('/update/:id', (req, res) => {
  return res.render('report/update', {PageTitle: "Update report"});
})

reportRoutes.get('/delete/:id', reportsController.delete)

reportRoutes.get('/:id', reportsController.findById)

reportRoutes.put('/:id', reportsController.update)

module.exports = reportRoutes;