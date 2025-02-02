const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config(); // Load environment variables
const config = require('./config');
const { MESSAGES, PROPERTIES } = require('./constants');

const app = express();
const port = process.env.PORT || 3000;
const NUMBERS_API_BASE_URL = process.env.NUMBERS_API_BASE_URL || 'http://numbersapi.com';

app.use(cors());
app.use(express.json());

// Helper functions
function isArmstrong(num) {
  const digits = String(num).split('');
  const power = digits.length;
  const sum = digits.reduce((acc, digit) => acc + Math.pow(parseInt(digit), power), 0);
  return sum === num;
}

function isPrime(num) {
  if (num <= 1) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
}

function isPerfect(num) {
  if (num <= 1) return false;
  let sum = 1;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) {
      sum += i;
      if (i !== num / i) sum += num / i;
    }
  }
  return sum === num;
}

function digitSum(num) {
  return String(num).split('').reduce((acc, digit) => acc + parseInt(digit), 0);
}

function getProperties(num) {
  const properties = [];
  if (isArmstrong(num)) properties.push(PROPERTIES.ARMSTRONG);
  properties.push(num % 2 === 0 ? PROPERTIES.EVEN : PROPERTIES.ODD);
  return properties;
}

// Main API Endpoint
app.get('/api/classify-number', async (req, res) => {
  const numberStr = req.query.number;  // Extract query param

  if (!numberStr || isNaN(numberStr) || !Number.isInteger(Number(numberStr))) {
    return res.status(400).json({ number: numberStr || null, error: true, message: MESSAGES.INVALID_INPUT });
  }

  const number = Number(numberStr);

  try {
    const funFactResponse = await axios.get(`${NUMBERS_API_BASE_URL}/${number}/math?json`);

    const response = {
      number,
      is_prime: isPrime(number),
      is_perfect: isPerfect(number),
      properties: getProperties(number),
      digit_sum: digitSum(number),
      fun_fact: funFactResponse.data.text
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({ number, error: true, message: MESSAGES.ERROR_FETCHING });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

app.listen(config.port, () => {
  console.log(`Server running in ${config.environment} mode on port ${config.port}`);
});
