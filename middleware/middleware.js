const express = require('express');

module.exports = {
  routeValidator: (req, res, next) => {
    return next();
  },

  tokenValidator: (req, res, next) => {
    if (req.get('Autorization')) {
      return next();
    } else console.log("No authorization found")
  },

  general: (req, res, next) => {
    console.log(`[GENERAL MIDDLEWARE]: Incoming request`)
    next()
  }
}