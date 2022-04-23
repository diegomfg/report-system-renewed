const userRouter = require('express').Router({
  mergeParams: true
});

const userController = require('../controllers/UsersController');

/**
 * @todo Delete route
 */
userRouter.get('/', userController.findAll)

/**
 * @todo Delete route
 */
userRouter.post('/', userController.create);

/**
 * @todo Delete route. Moving to /user/profile
 */
userRouter.get('/:username', userController.findByUsername);

/**
 * @todo Maybe move to /user/profile/:user_id?
 */
userRouter.put('/:user_id', userController.update)

/**
 * @todo What to do here? Do we really need this route.
 */
userRouter.delete('/:user_id', userController.delete)

module.exports = userRouter;