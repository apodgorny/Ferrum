var Scraper = new function() {
	var _nScrapeInterval = 5000;
	var _oThis			 = this;
	var _bCanScrape		 = false;
	
	function _send(o) {
		$.get(window.PHANTOM_SERVER_ENDPOINT + '?', o, function(oData) {
			console.log('Server response: ', oData);
		});
	};
	
	function _scrape(f) {
		_send(f(window.document));
		if (_nScrapeInterval && _bCanScrape) {
			setTimeout(function() {
				_scrape(f);
			}, _nScrapeInterval);
		}
	}
	
	/**
		Sets scrape interval. If n=0, no repeated scraping is scheduled
		otherwise next scraping will occur in n milliseconds
	*/
	this.setInterval = function(n) {
		_nScrapeInterval = n;
	};
	
	/**
		@param function f - provides scraping algorithm and 
			returns an object of collected data to be
			sent to the server with function send()
	*/
	this.start = function(f) {
		_bCanScrape = true;
		_scrape(f);
	}
	
	this.stop = function() {
		_bCanScrape = false;
	}
}



