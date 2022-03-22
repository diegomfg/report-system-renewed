const ResponseStrings = require('../constants/ResponseStrings');
const Response = require('../models/Response');

const pagesRouter = require('express').Router({mergeParams: true})

pagesRouter.get('/dashboard', (req, res)=>{
    // new Response(RS.SUCESS, data, error?, user?)
    res.render('user/dashboard', {user: {username: "diegomfg"}})
})

module.exports = pagesRouter;