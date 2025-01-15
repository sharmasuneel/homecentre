const express = require('express')
const bodyParser = require('body-parser');
var cors = require('cors')
const app = express()
const port = 3020
const productRoute = require('./routes/productRoute')

app.use(cors())

// Use body-parser middleware
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('This is node service of Home Centre!')
})

app.use('/products', productRoute)

  app.listen(port, () => {
    console.log(' ')
    console.log(` Home Centre service running on port ${port} -------->>`)
  })