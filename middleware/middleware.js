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
    if (req.cookies['api_token'])
    {
      console.log('Access token found')
      return next();
    } else
    {
      /**
          * @todo Need to find a way to make this call one every N minutes,
          * because we're going to be spamming Auth0 for tokens in each request
          * 
          * Maybe set token as cookies via middleware
          */
      console.log('Request access token')
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

  general:  async(req, res, next) =>
  {
    res.locals.user = req.oidc.user;
    try {
      // Set headers for calling the API
      const options = { headers: { 'Authorization': `Bearer ${req.cookies['api_token']}` } }
      const url = process.env.audience + `users-by-email?email=${req.oidc.user.email}`;
      // Get users from Auth0 API
      // url = `${url}{req.oidc.user.id}`
      const users = await axios
          .get(url, options)
      
    } catch (error) {
      return next(error)
    }
    next()
  }
}