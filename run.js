Scraper.setInterval(5000);
Scraper.start(function(oDocument) {
	return {
	 	'time' : $('#ct')[0].innerHTML,
	};
});