const usersController = require('./UsersController')

module.exports = {

    renderIndexPage: (req, res) => {
        return res.render('index', {
            PageTitle: 'Index',
            isAuth: req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out'
        })
    },

    renderDashboard: (req, res)=>{
        // req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out'
        return res.render('user/dashboard', {user: req.oidc.user })
    }
}