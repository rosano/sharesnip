const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe.skip('SNPDownload_Misc', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});

});
