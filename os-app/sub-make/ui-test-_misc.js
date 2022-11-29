const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('SNPCodeMake_Misc', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});

});
