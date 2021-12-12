const reportRoutes = require('express').Router({mergeParams: true});
const reportsController = require('../controllers/ReportsController');

reportRoutes.get('/reports', reportsController.getAll);

module.exports = reportRoutes;