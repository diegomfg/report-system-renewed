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
            const url = process.env.audience + 'users';

            // Get user profile from Auth0 API
            const userProfile = await axios
                .get(url, options)
            const users = userProfile.data;
            console.log('Users:', users)
            // Call Auth0 Management API to get the access token.
            // Call Auth0 API and send the access token and retrieve user profile
            // Review the received data to decide what will be sent to the view.
            // Sending the user JSON data
            res.render('user/profile', { PageTitle: "My Profile", users })
        } catch (error)
        {
            next(error)
        }
    }
}