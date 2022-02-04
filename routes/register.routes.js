const registerRoutes = require('express').Router({mergeParams: true})
const registerController = require('../controllers/RegisterController')

registerRoutes.get('/', registerController.renderRegisterPage)

module.exports = registerRoutes;