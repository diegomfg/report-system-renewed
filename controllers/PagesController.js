const usersController = require('./UsersController')

module.exports = {

    renderIndexPage: (req, res) => {
        return res.render('index', {
            PageTitle: 'Index'
        })
    },

    renderRegisterPage: (req, res) => {
       return res.render('user/register', {
           PageTitle: 'Register'
       })
    },

    renderLoginPage: (req, res)=>{
        return res.render('user/login', {PageTitle: 'Login'})
    },

    postRegisterPage: usersController.create,

    postLoginPage: (req, res)=>{
        return res.send("Attempt to log in")
    },

    renderDashboard: (req, res)=>{
        return res.render('user/dashboard', {user: {username: 'diegomfg'}, PageTitle: 'Dashboard'})
    }
}