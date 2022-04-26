const ResponseStrings = require("../constants/ResponseStrings");
const Response = require("../models/Response");
const User = require("../models/User");
const utilities = require("../utils/utilities");

module.exports = {
  findAll: async (req, res, next) => {
    try {
      const allUsers = await User.find({}, {username: 1, role: 1}).exec();
      res.status(200).send(new Response(ResponseStrings.SUCCESS, allUsers));
    } catch (error) {
      next(error)
    }
  },

  /**
   * @todo Call back here after login/signup
   * By default, users are being stored on db only after signing up with email, username and password.
   * Users login in with Google OAuth are not being stored since Auth0 actions only run on 'create'
   */
  create: (req, res) => {
    // const {given_name, family_name, nickname, picture?, email} = req.oidc.user;
    // const created_user = await User.create(data above);
    // return res.render('/dashboard', {created_user})
    return res.render('/dashboard')
  },

  findByUsername: async (req, res, next) => {
    try {
      // console.log(req.params.username)
      // console.log(req.oidc.user)

      const u = await User.find({email:req.oidc.user.email}, {password: 0, transaction: 0}).limit(1);
      res.render('user/profile', {user: u[0]})
    } catch (e) {
      next(e)
    }
  },

  update: async (req, res, next) => {
    const { user_id } = req.params;

    // If the request body contains password, password must be re-hashed
    if (req.body.password) {
      try {
        let hashedPassword = await utilities.hashPassword(req.body.password);
        req.body.password = hashedPassword;
      } catch (error) {
        next(error)
        // return res.render('user/update', {error: error.message})
      }
    }

    const user = await User.findById(user_id);
    if(!user) return res.render('user/update', {error: `Could not find user with id ${user_id}`})

    try {
      const updated = await User.findByIdAndUpdate(user_id, {$set: req.body});
      return res.render('user/update', {message: `Successfully updated ${user_id}`})
    } catch (error) {
      next(error)
      // return res.render('user/update', {error: error.message})
    }
  },
};
