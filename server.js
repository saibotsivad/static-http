var server = require('./express-wrapper.js')
var express = require('express')
var app = express()

app.use('/forever', server({
	root: __dirname + '/forever'
}))

app.use('/', express.static(__dirname + '/site'))

app.listen(80)
