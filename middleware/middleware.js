const express = require('express');

module.exports = {
  routeValidator: (req, res, next) => {
    return next();
  },

  tokenValidator: (req, res, next) => {
    if (req.get('authentication')) {
      return next();
    }
  },

  general: (req, res, next) => {
    return next();
  }
}