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


  //   bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
  //     if (err) console.log(err);
  //     console.log(`Salt: ${salt}`)
  //     console.log(`Password argument: ${textPassword}`)
  //     // hash the password using our new salt
  //     bcrypt.hash(textPassword, salt, function (err, hash) {
  //         if (err) console.log(err)
  //         console.log(`Hash: ${hash}`)
  //         return hash;
  //     });
  // });
  }
}