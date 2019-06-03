const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const port = 3010
const db = require('./queries')

app.use(cors())
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({ info: 'A simple inventory API' })
})

app.get('/products', db.getProducts)
app.get('/products/:id', db.getProductById)
app.post('/products', db.createProduct)
app.put('/products/:id', db.removeStock)
app.patch('/products/:id', db.checkStock)

app.listen(port, () => {
  console.log(`Inventory app running on port ${port}.`)
 })
