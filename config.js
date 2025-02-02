require('dotenv').config();

const config = {
  port: process.env.PORT || 3000,
  numbersApiUrl: process.env.NUMBERS_API_BASE_URL || 'http://numbersapi.com',
  environment: process.env.NODE_ENV || 'development'
};

module.exports = config;
