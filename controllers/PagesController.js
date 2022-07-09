const axios = require('axios')

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
            // Set headers for calling the API
            const options = { headers: { 'Authorization': `Bearer ${req.cookies['api_token']}` } }
            const url = process.env.audience + `users-by-email?email=${req.oidc.user.email}`;
            // Get user profile from Auth0 API - Add /{id} to the url to call for one specific user.
            // url = `${url}{req.oidc.user.id}`
            const response = await axios
                .get(url, options)
            const profile = response.data;
            // Users can have more than one profile (OAuth, Auth0, Github)
            // @todo Write hbs helper for checking if there is more than one profile
            res.render('user/profile', { PageTitle: "My Profile", profile })
        } catch (error)
        {
            next(error)
        }
    }
}