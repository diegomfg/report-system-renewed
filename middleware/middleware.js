const express = require('express');
const axios = require('axios').default;

module.exports = {
  routeValidator: (req, res, next) =>
  {
    return next();
  },

  /**
   * @todo Refactor into client-grants flow
   */
  tokenValidator: async (req, res, next) =>
  {
    if (!req.session.api_token)
    {
      console.log('Req api token not found')
      try
      {
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

      } catch (error)
      {

        return next(error)

      }

    } else
    {
      console.log('request token found')
      console.log(req.session)
      return next()
    }
  },

  general: async (req, res, next) =>
  {
    res.locals.user = req.oidc.user;
    next()
  }
}