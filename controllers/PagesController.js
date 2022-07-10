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
        try
        {
            // Configure URL for requesting current User.
            const url = process.env.audience + `users-by-email?email=${req.oidc.user.email}`;
            // Set headers for calling the API
            const options = { headers: { 'Authorization': `Bearer ${req.session.api_token}` } }

            // Call user API and ask for current user
            // const currentUser = await axios.get(url, options);
            // if (currentUser.logins < 2) {
            // await axios.post('/api/v2/roles/{role_id}/users, {users: [currentUSer.user_id]})
            // return res.render('user/dashboard', {PageTitle: "Dashboard"})
            // }
            // If current user has less than 2 logins, post the ROLES API to set USER as default role
            // else render dashboard
            // const response = await axios.get(url, options);
            // const profile = response.data;
            // console.log('[renderDashboard]: ', profile)
            return res.render('user/dashboard', {
                PageTitle: "Dashboard"
            })
        } catch (error)
        {
            console.log('dashboard error')
            return next(error)
        }
    },

    renderUserProfile: async (req, res, next) =>
    {
        try
        {
            // Configure URL for requesting current User.
            const url = process.env.audience + `users-by-email?email=${req.oidc.user.email}`;
            // Set headers for calling the API
            const options = { headers: { 'Authorization': `Bearer ${req.session.api_token}` } }

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