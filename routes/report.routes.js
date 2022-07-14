const reportRoutes = require('express').Router({ mergeParams: true });
const { requiresAuth } = require('express-openid-connect');
const reportsController = require('../controllers/ReportsController');
const Report = require('../models/Report');

reportRoutes.get('/', reportsController.findAll);
reportRoutes.get('/create', reportsController.renderCreate)
reportRoutes.post('/create', reportsController.create)
// Secure role-based
reportRoutes.get('/update/:id', reportsController.renderUpdate)
// Secure role-based
reportRoutes.post('/update/:id', reportsController.update)
// Secure role-based
reportRoutes.get('/delete/:id', reportsController.delete)
reportRoutes.get('/:id', reportsController.findById)
reportRoutes.get('/complete/:id', reportsController.complete)
reportRoutes.get('/completed/:isComplete', reportsController.filterComplete)


module.exports = reportRoutes;