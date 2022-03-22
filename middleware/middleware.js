const express = require('express');

module.exports = {
  routeValidator: (req, res, next) => {
    return next();
  },

  tokenValidator: (req, res, next) => {
    if (req.get('Autorization')) {
      return next();
    }
  },

  general: (err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  }
}