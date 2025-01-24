const express = require('express')
const bodyParser = require('body-parser')

var cors = require('cors')
const app = express()
const port = 3020
const productRoute = require('./routes/productRoute')
const { ValidationError, NotFoundError, AuthenticationError } = require('./utils/customError')

app.use(cors())

// Use body-parser middleware
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('This is node service of Home Centre!')
})

app.use('/products', productRoute)

// Middleware to handle custom errors
app.use((err, req, res, next) => {
  if (err instanceof ValidationError) {
    res.status(err.statusCode).send(err.message);
  } else if (err instanceof NotFoundError) {
    res.status(err.statusCode).send(err.message);
  } else if (err instanceof AuthenticationError) {
    res.status(err.statusCode).send(err.message);
  } else {
    res.status(500).send('Internal Server Error');
  }
});

// Route that triggers a ValidationError
app.get('/validate', (req, res, next) => {
  next(new ValidationError('Invalid input data'));
});

// Route that triggers a NotFoundError
app.get('/not-found', (req, res, next) => {
  next(new NotFoundError('Resource not found'));
});

// Route that triggers an AuthenticationError
app.get('/auth', (req, res, next) => {
  next(new AuthenticationError('Authentication failed'));
});

app.listen(port, () => {
  console.log(" ");
  console.log(` Home Centre service running on port ${port} -------->>`);
});