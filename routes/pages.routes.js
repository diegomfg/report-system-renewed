const PagesController = require('../controllers/PagesController');
const pagesRouter = require('express').Router({mergeParams: true})
const { requiresAuth } = require('express-openid-connect')
pagesRouter.get('/', (req, res)=>{
    res.render('index', {PageTitle: "Welcome"})
})

/**
 * @todo Authenticate this route
 */
pagesRouter.get('/', PagesController.renderIndexPage)

pagesRouter.get('/dashboard', requiresAuth(), PagesController.renderDashboard)

module.exports = pagesRouter;