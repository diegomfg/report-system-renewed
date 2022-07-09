const express = require('express');
const axios = require('axios');

module.exports = {
  routeValidator: (req, res, next) =>
  {
    // Validates presence of session data from Auth0
    return next();
  },

  tokenValidator: async (req, res, next) =>
  {
    if (req.cookies['api_token'])
    {
      // Validate token
      return next();
    } else
    {
      /**
          * @todo Need to find a way to make this call one every N minutes,
          * because we're going to be spamming Auth0 for tokens in each request
          * 
          * Maybe set token as cookies via middleware
          */
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
      req.cookies['api_token'] = access_token;
      req.cookies['token_type'] = token_type;
      return next();
    }

  },

  general: (req, res, next) =>
  {
    res.locals.user = req.oidc.user;
    // Get roles from Auth0 API
    // If user does not have roles
    // Assign user as default role
    // How/When to add admin as role?
    next()
  }
}