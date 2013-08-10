if (typeof phantom.args[0] == 'undefined') {
	error('Please supply url command line parameter');
}

var oPage       = require('webpage').create(),
	oFs         = require('fs'),
	sConfigPath = 'config.txt',
	oConfig     = {},
	sUrl        = phantom.args[0],
	bLoaded     = false,
	aScripts    = [
		'../js/jquery.js',
		'../js/class.Scraper.js'
	];

/******************************************************/

function error(s) {
	phantom.exit();
	throw(s);
}

function display() {
	var m, s;

    for (var n=0; n<arguments.length; n++) {
		m = arguments[n];

		switch (typeof m) {
			case 'string':
				s = m;
				break;
			case 'object':
				s = "{";
				for (var sKey in m) {
					s += "\n\t" + sKey + ': ' + m[sKey];
				}
				s = s + "\n}";
				break;
			default: 
				s = 'unknown type: ' + m;
		}
        console.log(s);
    }
}
	
function getConfig(sPath) {
	var aLines,
		oFile,
		sKey,
		oConfig = {},
		aKeyVal = [],
		n;
	
	try {
		oFile  = oFs.open(sPath, 'r');
		aLines = oFile.read().split('\n');
		console.log('Loading configuration file - success!');
	} catch (oException) {
		error('Loading configuration file - failure!');
	}
	
	if (typeof aLines != 'undefined') {
		for (n=0; n<aLines.length; n++) {
			if (aLines[n].replace(/[^\s]/g, '').length == 0) { continue; }              // Skip empty lines
			aKeyVal = aLines[n].split('=');                                             // Split key=value
			sKey = aKeyVal[0].replace(/^\s\s*/, '').replace(/\s\s*$/, '');              // Trim key
			oConfig[sKey] = aKeyVal[1].replace(/^\s\s*/, '').replace(/\s\s*$/, '');     // Trim and save value
		}
	}
	return oConfig;
}

/******************************************************/

// Load and process configuration file
oConfig = getConfig(sConfigPath);
if (typeof oConfig.js == 'undefined') {
	error('Parameter "js" is not defined in ' + sConfigPath);
}
if (typeof oConfig.server_endpoint == 'undefined') {
	error('Parameter "server_endpoint" is not defined in ' + sConfigPath);
}

aScripts.push('../../' + oConfig.js);

oPage.onConsoleMessage  = display;
oPage.onAlert           = display;

oPage.settings.localToRemoteUrlAccessEnabled = true;
oPage.settings.webSecurityEnabled            = false;
oPage.settings.userAgent                     = 'Mozilla/5.0 (Macintosh; Intel Mac OS X)';

oPage.open(sUrl, function (sStatus) {
	console.log('Loaded ' + sUrl + '[' + sStatus + ']');
	if (!bLoaded) {
		oPage.evaluate(function(sServerEndpoint) {
			window.PHANTOM_SERVER_ENDPOINT = sServerEndpoint;
		}, oConfig.server_endpoint);
		for (var n=0; n<aScripts.length; n++) {
			if (oPage.injectJs(aScripts[n])) {
				console.log(aScripts[n] + ' is injected');
			} else { 
				console.log('Failed to inject ' + aScripts[n]); 
			}
		}
	}
	bLoaded = true;
});

