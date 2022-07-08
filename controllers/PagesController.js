module.exports = {

    renderLandingPage: (req, res) =>
    {
        return res.render('index', {
            PageTitle: 'Landing',
            isAuthenticated: req.oidc.isAuthenticated()
        })
    },

    renderDashboard: (req, res) =>
    {
        return res.render('user/dashboard', {
            PageTitle: "Dashboard"
        })
    },

    renderUserProfile: async (req, res, next) =>
    {
        try
        {
            // Call Auth0 API v2 for sending the user JSON data
            res.render('user/profile', { PageTitle: "My Profile" })
        } catch (error)
        {
            next(error)
        }
    }
}