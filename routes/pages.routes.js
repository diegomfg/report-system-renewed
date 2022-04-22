const ResponseStrings = require('../constants/ResponseStrings');
const PagesController = require('../controllers/PagesController');
const Response = require('../models/Response');

const pagesRouter = require('express').Router({mergeParams: true})

/**
 * @abstract Render the homepage
 */
pagesRouter.get('/', PagesController.renderIndexPage)

// pagesRouter.get('/login', PagesController.renderLoginPage)

// pagesRouter.get('/register', PagesController.renderRegisterPage)

pagesRouter.get('/dashboard', PagesController.renderDashboard)

// pagesRouter.post('/login', PagesController.postLoginPage)

// pagesRouter.post('/register', PagesController.postRegisterPage)

module.exports = pagesRouter;