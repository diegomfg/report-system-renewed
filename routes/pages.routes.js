const PagesController = require('../controllers/PagesController');
const pagesRouter = require('express').Router({mergeParams: true})

pagesRouter.get('/', (req, res)=>{
    res.render('index', {PageTitle: "Welcome"})
})

/**
 * @todo Authenticate this route
 */
pagesRouter.get('/', PagesController.renderIndexPage)

// pagesRouter.get('/login', PagesController.renderLoginPage)

// pagesRouter.get('/register', PagesController.renderRegisterPage)

pagesRouter.get('/dashboard', PagesController.renderDashboard)

// pagesRouter.post('/login', PagesController.postLoginPage)

// pagesRouter.post('/register', PagesController.postRegisterPage)

module.exports = pagesRouter;