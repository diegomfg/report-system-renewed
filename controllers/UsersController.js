const ResponseStrings = require("../constants/ResponseStrings");
const Response = require("../models/Response");
const User = require("../models/User");
const utilities = require("../utils/utilities");

module.exports = {
  /**
   * @todo remove this endpoint
   * @todo Secure all endpoints
   */
  findAll: async (req, res) => {
    try {
      const allUsers = await User.find({}).exec();
      res.status(200).send(new Response(ResponseStrings.SUCCESS, allUsers));
    } catch (error) {
      res.send(error.message);
    }
  },

  create: async (req, res) => {
    console.log(`Request body at user controller:`, req.body)

    try {

      let user = await User.create(req.body);
      let { id, username, role } = user;

      if (!user)
        return res.send(
          new Response(ResponseStrings.ERROR, {error: "Error creating new user"})
        );

      /**
       * @todo Temporary, only render Dashboard when:
       * 1* Register
       * 2* Login
       * 3* Authenticated but navigates to /dashboard
       * 4* Try rendering user/dashboard, passing new Response(RS.SUCCESS, {user: the actual user})
       */
      return res.render('user/dashboard', new Response(ResponseStrings.SUCCESS, {user: {
        id, 
        username, 
        role 
      }}))
      
    } catch (error) {
      // Handle error for duplicated username keys
      if (error.code == 11000) {
        return res.render('user/register', {error: `Username ${req.body.username} is already in use`});
      } else {
        for (const [key, value] of Object.entries(error.errors)) {
          if (key == "role") {
            return res.send(
              new Response(
                ResponseStrings.ERROR,
                "Invalid value for option role"
              )
            );
          }
        }

        return res.send(new Response(ResponseStrings.ERROR, error.message));
      }
    }
  },

  findByUsername: async (req, res) => {
    try {
      const user = await User.findOne({
        username: req.params.username,
      }).limit(1);

      if(user) {
        const { username, role, _id } = user;
          return res.send(
            new Response(ResponseStrings.SUCCESS, {
              username,
              role,
              _id,
            })
          );
      }
      return res.send(new Response(ResponseStrings.ERROR, `Coudln't find record with username: ${req.params.username}`))
    } catch (error) {
      return res.send(new Response(ResponseStrings.ERROR, error.message));
    }
  },

  update: async (req, res) => {
    const { user_id } = req.params;

    // If the request body contains password, password must be re-hashed
    if (req.body.password) {
      try {
        let hashedPassword = await utilities.hashPassword(req.body.password);
        req.body.password = hashedPassword;
      } catch (error) {
        return res.send(new Response(ResponseStrings.ERROR, error.message));
      }
    }

    try {
      const updated = await User.findByIdAndUpdate(user_id, {$set: req.body});
      return res.send(new Response(ResponseStrings.SUCCESS, updated))
    } catch (error) {
      return res.send(new Response(ResponseStrings.ERROR, error.message))
    }
  },

  delete: async (req, res) => {
    const { user_id } = req.params;

    try {
      const user = await User.findById(user_id);
      if (user == null) {
        return res.send(
          new Response(
            ResponseStrings.ERROR,
            `Couldn't find any user with id: ${user_id}`
          )
        );
      }
      // const deleted = await Report.deleteOne({_id: id});
      const deleted = await User.deleteOne({
        _id: user_id,
      });
      // const deleted = await User.findByIdAndDelete(user_id);
      return res.send(new Response(ResponseStrings.SUCCESS, deleted));
    } catch (e) {
      console.log(e.message);
      res.send(new Response(ResponseStrings.ERROR, e.message));
    }
  },
};
