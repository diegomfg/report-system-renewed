const axios = require('axios')

module.exports = {

    renderLandingPage: (req, res) =>
    {

        return res.render('index', {
            PageTitle: 'Landing',
            isAuthenticated: req.oidc.isAuthenticated()
        })
    },

    renderDashboard: async (req, res, next) =>
    {
        return res.render('user/dashboard', {
            PageTitle: "Dashboard"
        })
    },

    renderUserProfile: async (req, res, next) =>
    {
        try
        {
            // Configure URL for requesting current User.
            const url = process.env.audience + `users-by-email?email=${req.oidc.user.email}`;
            // Set headers for calling the API
            const options = {
                headers: {
                    'Authorization': `Bearer ${req.session.api_token}`
                }
            }

            const response = await axios
                .get(url, options)
            const profile = response.data;
            if (profile.length > 1)
            {
                // Users can have more than one profile (OAuth, Auth0, Github)
                // @todo Write hbs helper for checking if there is more than one profile
                return res.render('user/profile', {
                    PageTitle: "My Profile",
                    profile
                })
            }

            return res.render('user/profile', {
                PageTitle: "My Profile",
                profile: profile[0]
            })

        } catch (error)
        {
            next(error)
        }
    }
}