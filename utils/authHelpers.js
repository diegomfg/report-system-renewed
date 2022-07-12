const axios = require('axios').default;
module.exports = {
    setDefaultRole: async (req, res, next) =>
    {
        try
        {
            if (req.oidc.user)
            {
                // Configure URL for requesting current User.
                const url = process.env.audience + `users-by-email?email=${req.oidc.user.email}`;
                // Set headers for calling the API
                const options = {
                    headers: {
                        'Authorization': `Bearer ${req.session.api_token}`
                    }
                }

                // Call user API and ask for current user
                const currentUsers = await axios.get(url, options);
                const currentUserAccounts = currentUsers.data;
                let ids = []

                currentUserAccounts.forEach((user) =>
                {
                    ids.push(user.user_id)
                })

                const rolesApiURL = process.env.audience + 'roles/rol_mlQ0FG5lHcnUNL4y/users';
                const users = await axios.get(rolesApiURL, options);
                // If users is empty
                const usersWithUserRole = users.data;
                // Loop through usersWithUserRole and check if the user accounts are in the usersWithUserRole
                // If they are, return next()
                // else, await await axios.post(rolesApiURL, { users: ids }, options)
                if (usersWithUserRole.length < 1)
                {
                    await axios.post(rolesApiURL, { users: ids }, options)

                }

                return next();

            } else return next()

        } catch (error)
        {
            return next(error)
        }
    }
}