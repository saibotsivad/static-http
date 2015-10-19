var test = require('tape')
var parse = require('../parser')

var hash = '7a5179eecc0fe18760ba615f92603372ae3fe302860098a019e15927551fee3b'

test('hash is extracted', function(t) {
	t.equal(hash, parse('/' + hash).hash, 'hash is extracted')
	t.end()
})

test('hash too short is not extracted', function(t) {
	t.notOk(parse('/abc123'), 'short hash does not extract')
	t.end()
})

test('filename is extracted', function(t) {
	var parsed = parse('/' + hash + '.txt')
	t.equal(hash, parsed.hash, 'hash is extracted')
	t.equal('txt', parsed.extension, 'extension is extracted')
	t.end()
})
