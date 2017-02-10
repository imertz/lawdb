const express = require('express')
var favicon = require('serve-favicon');

const app = express()

app.use(favicon(__dirname + '/favicon.ico'));
app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.listen(8000, function () {
  console.log('Example app listening on port 8000!')
})
