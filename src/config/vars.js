const path = require('path');
require('dotenv').config();
module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  jwtSecret: process.env.JWT_SECRET,
  frontEncSecret: process.env.FRONT_ENC_SECRET,
  jwtExpirationInterval: process.env.JWT_EXPIRATION_MINUTES,
  mailgunDomain: process.env.MAILGUN_DOMAIN,
  pwEncruptionKey: process.env.PW_ENCRYPTION_KEY,
  mongo: {
    uri: `mongodb+srv://MWA:mwa@123@cluster0.wfdtd4q.mongodb.net/?retryWrites=true&w=majority`,
  },
  pwdSaltRounds: process.env.PWD_SALT_ROUNDS,
};
