const ResponseStrings = require("../constants/ResponseStrings");
const Response = require("../models/Response");
const User = require("../models/User");
const utilities = require("../utils/utilities");

module.exports = {
  findAll: async (req, res) => {
    try {
      const allUsers = await User.find({}).exec();
      res.status(200).send(new Response(ResponseStrings.SUCCESS, allUsers));
    } catch (error) {
      res.send(error.message);
    }
  },

  create: async (req, res) => {
    console.log(`Request body:`, req.body)
    try {
      let user = await User.create(req.body);
      let { id, username, role } = user;
      if (!user)
        return res.send(
          new Response(ResponseStrings.ERROR, "Error creating new user")
        );

      return res.send(
        new Response(ResponseStrings.SUCCESS, {
          id,
          username,
          role,
        })
      );
    } catch (error) {
      // Handle error for duplicated username keys
      if (error.code == 11000) {
        return res.send(
          new Response(ResponseStrings.ERROR, "Username already in use!")
        );
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
      });

      const { username, role, _id } = user;
      res.send(
        new Response(ResponseStrings.SUCCESS, {
          username,
          role,
          _id,
        })
      );
    } catch (error) {
      res.send(new Response(ResponseStrings.ERROR, error.message));
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

    /**
     * @todo refactor into async await
     */
    User.findByIdAndUpdate(user_id, req.body, {
      new: true,
    })
      .then((updated) => {
        return res.send(new Response(ResponseStrings.SUCCESS, updated));
      })
      .catch((error) => {
        console.log(error.message);
        return res.send(new Response(ResponseStrings.ERROR, error.message));
      });
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
