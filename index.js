// var connect = require('connect')
// var compression = require('compression')
// var http = require('http')

var server = require('./lib/serve-files')
var saver = require('./lib/save-files')

// var contentDirectory = './'

// var app = connect()

// app.use(compression())
// app.use(server('./'))
// app.use(saver('./'))

// http.createServer(app).listen(3000)





var express = require('express')
var app = express()

app.get('/([0-9a-z]{64}\.[0-9a-z]{2,3})', server('./'))
app.post('/', saver('./'))

var server = app.listen(3000, function () {
  var host = server.address().address
  var port = server.address().port
  console.log('Example app listening at http://%s:%s', host, port)
})
