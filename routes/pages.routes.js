const PagesController = require('../controllers/PagesController');
const pagesRouter = require('express').Router({mergeParams: true})
const { requiresAuth } = require('express-openid-connect')

pagesRouter.get('/', PagesController.renderLandingPage);
pagesRouter.get('/dashboard',           requiresAuth(),   PagesController.renderDashboard);
pagesRouter.get('/profile/:username',   requiresAuth(),   PagesController.renderUserProfile);

module.exports = pagesRouter;