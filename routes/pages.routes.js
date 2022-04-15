const ResponseStrings = require('../constants/ResponseStrings');
const Response = require('../models/Response');

const pagesRouter = require('express').Router({mergeParams: true})

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