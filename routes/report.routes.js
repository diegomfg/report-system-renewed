const reportRoutes = require('express').Router({ mergeParams: true });
const { requiresAuth } = require('express-openid-connect');
const reportsController = require('../controllers/ReportsController');
const Report = require('../models/Report');

reportRoutes.get('/', reportsController.findAll);
reportRoutes.get('/create', reportsController.renderCreate)
reportRoutes.post('/create', reportsController.create)
reportRoutes.get('/update/:id', reportsController.renderUpdate)
reportRoutes.post('/update/:id', reportsController.update)
reportRoutes.get('/delete/:id', reportsController.delete)
reportRoutes.get('/:id', reportsController.findById)

module.exports = reportRoutes;