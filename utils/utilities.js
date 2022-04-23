const bcrypt = require('bcrypt');
const { text } = require('express');
const SALT_WORK_FACTOR = 12;

module.exports = {
  hashPassword: async function (textPassword) {
    try {
      let salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
      let hash = bcrypt.hash(textPassword, salt);
      return hash;
    } catch (error) {
      console.log("ERROR AT hashPassword: ", error)
      return 'Error'
    }
  }
}