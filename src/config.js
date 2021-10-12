require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  ATLAS_URI: process.env.NODE_ENV === 'test' ? process.env.TEST_ATLAS_URI : process.env.ATLAS_URI,
  JWT_SECRET: process.env.JWT_SECRET || 'a-fakeo-secret',
  JWT_EXPIRY: process.env.JWT_EXPIRY || '3h'
};
