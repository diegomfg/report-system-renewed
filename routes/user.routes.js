const userRouter = require('express').Router({
  mergeParams: true
});

const { requiresAuth } = require('express-openid-connect');
const userController = require('../controllers/UsersController');

userRouter.get('/', requiresAuth(), userController.findAll);

/**
 * @todo Delete route. Moving to /user/profile
 */
userRouter.get('/:username', requiresAuth(), userController.findByUsername);

/**
 * @todo Maybe move to /user/profile/:user_id?
 */
userRouter.put('/:user_id', requiresAuth(), userController.update)

module.exports = userRouter;