const ResponseStrings = require('../constants/ResponseStrings');
const PagesController = require('../controllers/PagesController');
const Response = require('../models/Response');

const pagesRouter = require('express').Router({mergeParams: true})

pagesRouter.get('/', (req, res)=>{
    res.render('index', {PageTitle: "Welcome"})
})

/**
 * @todo Authenticate this route
 */
pagesRouter.get('/dashboard', (req, res)=>{
    /**
     * @todo Render page after Auth0 middleware approval and send 
     * @param {User} user from 
     * @param {Express.Response} req.odic.user
     * to the view
     */
    res.render('user/dashboard', {user: {username: "diegomfg"}})
})



module.exports = pagesRouter;