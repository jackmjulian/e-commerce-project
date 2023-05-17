const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const port = 3000
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

// get request on the root
app.get('/', (request, response) => {
  response.json({
      info: 'Node.js, Express, and Postgres API'
  })
})

// Listen on the port created
app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})

