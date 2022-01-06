const userRouter = require('express').Router({
  mergeParams: true
});

const userController = require('../controllers/UsersController');

userRouter.get('/', userController.findAll)

userRouter.post('/', userController.create);

userRouter.get('/:username', userController.findByUsername);

userRouter.put('/:user_id', userController.update)

userRouter.delete('/:user_id', userController.delete)

module.exports = userRouter;