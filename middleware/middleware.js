const express = require('express');
const axios = require('axios').default;

module.exports = {
  routeValidator: (req, res, next) =>
  {
    // Validates presence of session data from Auth0
    return next();
  },

  tokenValidator: async (req, res, next) =>
  {
    console.log('Request API token')
    console.log(req.session)
    if(!req.session.api_token){
      
      try {
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
        req.session.api_token = access_token;
        return next()
      } catch (error) {
        return next(error)
      }
    } else {
      console.log(req.session)
      return next()
    }
  },

  general: async (req, res, next) =>
  {
    res.locals.user = req.oidc.user;
    // try
    // {
    //   if (req.oidc.user)
    //   {
    //     // Configure URL for requesting current User.
    //     const url = process.env.audience + `users-by-email?email=${req.oidc.user.email}`;
    //     // Set headers for calling the API
    //     const options = { headers: { 'Authorization': `Bearer ${req.cookies['api_token']}` } }

    //     const response = await axios
    //       .get(url, options)
    //     const profile = response.data;
    //   }
    // } catch (error)
    // {
    //   return next(error)
    // }
    next()
  }
}