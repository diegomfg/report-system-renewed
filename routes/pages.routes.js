const PagesController = require('../controllers/PagesController');
/**
 * @summary Router for pages such as '/' '/dashboard', and '/profile/:username'
 */
const pagesRouter = require('express').Router({ mergeParams: true })
const { requiresAuth } = require('express-openid-connect')

pagesRouter.get('/', PagesController.renderLandingPage);
pagesRouter.get('/dashboard', requiresAuth(), PagesController.renderDashboard);
pagesRouter.get('/profile/:username', requiresAuth(), PagesController.renderUserProfile);

module.exports = pagesRouter;