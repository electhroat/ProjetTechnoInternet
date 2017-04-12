// Imports
var express = require('express');
var router = express.Router();
var scrapper = require('scrapper');

// Data


// Map the root page to our index pug view
router.get('/', function(req, res, next) {
	nosEvements = scrapper.WebScrapper();
	res.render('index', {evenements: nosEvements});
});


// Export the router
module.exports = router;

