const axios = require('axios').default;
module.exports = {
    /**
     * First, call Auth0 API to get the current user's user accounts (may be Google, Auth0, Github, etc)
     * Second, call the Auth0 roles API to get the current users associated with the USER role
     * Third, loop through the @param currentUserAccounts to control each account's information
     * Inside the @param currentUserAccounts, check if @param usersWithUserRole actually contains users
     * otherwise push the current loop account's ID into an array.
     * If the @param usersWithUserRole contains users, 
     * loop through that array to check if the current user account's id is in the @param usersWithUserRole (sigh)
     * 
     * If any of the current user accounts has less than 2 logins, push id to array and set default role.
     * @returns Next middleware
     */
    setDefaultRole: async (req, res, next) =>
    {
        try
        {
            if (req.oidc.user)
            {
                const url = process.env.audience + `users-by-email?email=${req.oidc.user.email}`;
                // Set headers for calling the API
                const options = {
                    headers: {
                        'Authorization': `Bearer ${req.session.api_token}`
                    }
                }

                // Call user API and ask for current user
                const currentUsers = await axios.get(url, options);
                // Get the current user's accounts (google, github, auth0)
                const currentUserAccounts = currentUsers.data;

                let ids = []
                // The roles API url, with /roles/{role_id}/users @param role_id belongs to the USER role.
                const rolesApiURL = process.env.audience + 'roles/rol_mlQ0FG5lHcnUNL4y/users';
                // get the users associated with the USER role
                const users = await axios.get(rolesApiURL, options);
                const usersWithUserRole = users.data;

                currentUserAccounts.forEach((account) =>
                {
                    if(account.logins_count < 2){
                        ids.push(account.user_id)
                    }
                })

                if(ids.length > 0){
                    // Associate the 'new' user with the USER role.
                    
                    await axios.post(rolesApiURL, {users: ids}, options)
                }
                
                return next();

            } else return next()

        } catch (error)
        {
            return next(error)
        }
    }
}