module.exports = {

    renderIndexPage: (req, res) => {
        return res.render('index', {
            PageTitle: 'Index',
            isAuthenticated: req.oidc.isAuthenticated()
        })
    },

    renderDashboard: (req, res)=>{
        return res.render('user/dashboard',
        {
            user: req.oidc.user 
        })
    },

    renderUserProfile: async (req, res, next) => {
        try {
            // Call Auth0 API v2 for sending the user JSON data
            res.render('user/profile')
        } catch (error) {
            next(error)
        }
    }
}