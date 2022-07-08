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
            // Get token response from the auth api
            const token = await axios.post(process.env.tokenUrl,
                {
                    client_id: process.env.token_client_id,
                    client_secret: process.env.token_client_secret,
                    audience: process.env.audience,
                    grant_type: process.env.grant_type
                },

                {
                    headers: { 'content-type': 'application/json' }
                })
            // Get the token and access type from the response
            const { access_token, token_type } = token.data;


            // Set headers for calling the API
            const options = { headers: { 'Authorization': `${token_type} ${access_token}` } }
            const url = process.env.audience + `users-by-email?email=${req.oidc.user.email}`;
            // Get user profile from Auth0 API - Add /{id} to the url to call for one specific user.
            // url = `${url}{req.oidc.user.id}`
            const response = await axios
                .get(url, options)
            const profile = response.data;
            console.log(profile)
            // Users can have more than one profile (OAuth, Auth0, Github)
            // @todo Write hbs helper for checking if there is more than one profile
            res.render('user/profile', { PageTitle: "My Profile", profile })
        } catch (error)
        {
            next(error)
        }
    }
}