const express = require('express');

module.exports = {
  routeValidator: (req, res, next) => {
    // Validates presence of session data from Auth0
    return next();
  },

  general: (err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
    // Try another url after.
  }
}