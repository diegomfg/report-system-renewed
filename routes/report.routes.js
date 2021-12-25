const reportRoutes = require('express').Router({mergeParams: true});
const reportsController = require('../controllers/ReportsController');

reportRoutes.get('/', reportsController.getAll);

reportRoutes.post('/', reportsController.create)

reportRoutes.get('/:id', reportsController.get)

reportRoutes.put('/:id', reportsController.update)

reportRoutes.delete('/:id', reportsController.delete)

module.exports = reportRoutes;