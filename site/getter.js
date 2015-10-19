(function(window) {
	window.injectSecureResource = function(hash, extension) {
		if (extension === 'js' || extension === 'css') {
			loadResource(hash, extension)
		}
	}

	function loadResource(hash, extension) {
		getHash(hash, extension, function(text) {
			if (extension === 'js') {
				insertScript(text)
			} else if (extension === 'css') {
				insertStyle(text)
			}			
			console.log('Loaded:', hash)
		})
	}

	function insertScript(script) {
		var element = document.createElement('script')
		element.setAttribute('type', 'text/javascript')
		element.text = script
		insertElementToHead(element)
	}

	function insertStyle(style) {
		var element = document.createElement('style')
		element.setAttribute('type', 'text/css')
		if (element.styleSheet){
			element.styleSheet.cssText = style
		} else {
			element.appendChild(document.createTextNode(style))
		}
		insertElementToHead(element)
	}

	function insertElementToHead(element) {
		var head = document.getElementsByTagName('head')[0]
		head.appendChild(element)
	}

	function getHash(hash, extension, callback) {
		httpGetAsync('http://smartstrap.dev/forever/' + hash + '.' + extension, function(text) {
			if (hash === Sha256.hash(text)) {
				callback(text)
			} else {
				console.error('Retrieved resource did not match given hash')
			}
		})
	}

	function httpGetAsync(theUrl, callback) {
		var xmlHttp = new XMLHttpRequest()
		xmlHttp.onreadystatechange = function() {
			if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
				callback(xmlHttp.responseText)
			}
		}
		xmlHttp.open("GET", theUrl, true) // true for asynchronous 
		xmlHttp.send(null)
	}
})(window)
