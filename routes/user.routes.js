const userRouter = require('express').Router({mergeParams: true});

const userController = require('../controllers/UsersController');

userRouter.get('/:username', userController.getByUsername);

userRouter.put('/:username', userController.update)

module.exports = userRouter;