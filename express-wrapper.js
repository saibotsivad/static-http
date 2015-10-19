var fs = require('fs')
var path = require('path')
var Promise = require('promise')

var filestat = Promise.denodeify(fs.stat)

var urlRegex = /\/([a-z0-9]{64}\.[a-z0-9]+$)/

function noop() {}

module.exports = function(options) {
	function setFileHeaders(response, hash, stats) {
		response.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type, If-Match, If-Modified-Since, If-None-Match, If-Unmodified-Since')
		response.setHeader('Access-Control-Allow-Origin', '*')
		response.setHeader('Cache-Control', 'max-age=3155760000, public')
		response.setHeader('Content-Type', 'text/plain; charset=UTF-8')
		response.setHeader('Content-Length', stats.size)
		// response.setHeader('Expires', 'Thu, 1 Jan 2099 00:00:00 GMT')
		// response.setHeader('ETag', '"' + hash + '"')
		// response.setHeader('Last-Modified', 'Thu, 1 Jan 2015 00:00:00 GMT')
	}

	return function(request, response, next) {
		var requestedHash = urlRegex.exec(request.originalUrl)
		requestedHash = requestedHash && requestedHash[1]
		if (requestedHash) {
			console.log('forever:', requestedHash)
			var requestedFile = path.join(options.root, requestedHash)
			var requestedFileGzipped = path.join(options.root, requestedHash + '.gz')
			Promise.all([
				filestat(requestedFile).catch(noop),
				filestat(requestedFileGzipped).catch(noop)
			]).then(function(results) {
				var stats = results[0]
				var gzipStats = results[1]
				if (stats) {
					console.log('file found:', requestedHash)
					setFileHeaders(response, requestedHash, stats)
					fs.createReadStream(requestedFile).pipe(response)
				} else if (gzipStats) {
					console.log('gzipped file found:', requestedHash)
					setFileHeaders(response, requestedHash, gzipStats)
					response.setHeader('Content-Encoding', 'gzip')
					fs.createReadStream(requestedFileGzipped).pipe(response)
				} else {
					next()
				}
			})
		} else {
			next()
		}
	}
}
