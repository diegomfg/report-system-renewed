var express = require('express')

module.exports = {
    renderRegisterPage: (req, res) => {
       return res.render("user/register", {
           PageTitle: "Register"
       })
    },

    postRegisterPage: (req, res) => {
        // return res.redirect(307, '/users/create')
        console.log("Request body: ", req.body)
        res.send("ok")
    }
}