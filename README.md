Ferrum
======

This utility allows you to periodically scrape page data and send changes to a server endpoint.

To see it in action:

1. In your command prompt navigate into the project directory
2. In terminal window 1 run "tail -f log.txt"
3  In terminal window 2 run "./run.sh http://www.timeanddate.com/worldclock/city.html?n=137"

What happens?

1. run.sh runs phantomjs with configuration provided in config.txt
2. Phantomjs loads url provided as a parameter in the command line
3. Phantomjs injects jquery, scraper and your script into the loaded page
4. Scraper makes ajax call to your server endpoint sending the scraped data

How to set it up?

1. Create and host server endpoint (See server.php for example)
2. Create your own scraping scheme and put it into project folder (where this README.md is found)
3. Change configuration in config.txt if needed to point phantomjs to correct script and server endpoint
4. Run "run.sh" with the url you'd like to scrape
5. Enjoy!


Scraping scheme:

In your javascript file you can use 3 functions available to you:

Scraper.setInterval(5000);			// Sets interval between scrapes in milliseconds

Scraper.start(yourScrapingFunction)	// Sets scraping callback function which receives reference to document as parameter 
									// and must return a data object that
									// scraper will ajax to your server endpoint
									
Scraper.end()						// Stops scraping

NOTE: 	Setting scraping interval to 0 will prevent subsequent scrapes.

DISCLAIMER: Don't do anything illegal with it, respect the law. 
			Use at your own risk and responsibility. 
			No claims of any kind can be made to the author.
			However, questions and comments are welcome.