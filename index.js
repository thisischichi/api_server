const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3010

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({ info: 'A simple inventory API' })
})

app.listen(port, () => {
  console.log(`Inventory app running on port ${port}.`)
 })
