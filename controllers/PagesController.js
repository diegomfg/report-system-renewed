const usersController = require('./UsersController')

module.exports = {

    renderIndexPage: (req, res) => {
        console.log(req.oidc)
        return res.render('index', {
            PageTitle: 'Index',
            isAuth: req.oidc.isAuthenticated()
        })
    },

    renderDashboard: (req, res)=>{
        return res.render('user/dashboard',
        {
            user: req.oidc.user 
        })
    }
}