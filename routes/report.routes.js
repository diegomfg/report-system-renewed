const reportRoutes = require('express').Router({mergeParams: true});
const reportsController = require('../controllers/ReportsController');

reportRoutes.get('/', reportsController.findAll);

reportRoutes.post('/', reportsController.create)

reportRoutes.get('/new-report', (req, res) => {
  return res.render('report/new')
})

reportRoutes.get('/:id', reportsController.findById)

reportRoutes.put('/:id', reportsController.update)

reportRoutes.delete('/:id', reportsController.delete)

module.exports = reportRoutes;