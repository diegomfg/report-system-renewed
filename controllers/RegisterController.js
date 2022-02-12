var express = require('express')

module.exports = {
    renderRegisterPage: (req, res) => {
       return res.render("user/register", {
           PageTitle: "Register"
       })
    },

    postRegisterPage: (req, res) => {
        return res.redirect(307, '/users/create')
        // Redirect to User controller or call User entity here?
    }
}