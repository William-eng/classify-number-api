# Number Classification API

This API provides mathematical properties and fun facts about numbers using Node.js and Express.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the server:
   ```bash
   npm run dev    # for development with auto-reload
   npm start      # for production
   ```

## Endpoints

### GET /api/classify-number

Classifies a number and returns its mathematical properties along with a fun fact from the Numbers API.

#### Query Parameters

- `number` (required): The number to classify

#### Success Response (200 OK)

```json
{
    "number": 371,
    "is_prime": false,
    "is_perfect": false,
    "properties": ["armstrong", "odd"],
    "digit_sum": 11,
    "fun_fact": "371 is an Armstrong number because 3^3 + 7^3 + 1^3 = 371"
}
```

#### Error Response (400 Bad Request)

```json
{
    "number": "invalid_input",
    "error": true
}
```

### GET /health

Health check endpoint to verify the API is running.

#### Success Response (200 OK)

```json
{
    "status": "healthy"
}
```

## Features

- Number classification:
  - Prime number detection
  - Perfect number detection
  - Armstrong number detection
- Parity checking (odd/even)
- Digit sum calculation
- Integration with Numbers API for mathematical fun facts
- CORS enabled
- Error handling
- Input validation

## Technical Details

- Built with Node.js and Express
- Uses Axios for HTTP requests
- Implements CORS for cross-origin requests
- Includes nodemon for development

The API will be available at `http://localhost:3000` by default.