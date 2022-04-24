const express = require('express');

module.exports = {
  routeValidator: (req, res, next) => {
    // Validates presence of session data from Auth0
    return next();
  },

  tokenValidator: (req, res, next) => {
    if (req.get('Autorization')) {
      return next();
    } else console.log("[Token Validator]: - No authorization found")
  },

  general: (req, res, next) => {
    next()
  }
}