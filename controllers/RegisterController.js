const usersController = require('./UsersController')

module.exports = {
    renderRegisterPage: (req, res) => {
       return res.render("user/register", {
           PageTitle: "Register"
       })
    },

    postRegisterPage: usersController.create
}