const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('E-Commerce Project Running')
})

app.listen(port, () => {
  console.log(`E-Commerce app listening on port ${port}`)
})