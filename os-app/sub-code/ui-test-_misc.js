const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe.skip('SNPCode_Misc', function () {

	const SNPDocumentData = Math.random().toString();

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			SNPCodeObject: JSON.stringify({
				SNPDocumentData,
			}),
		});
	});

	it.skip('creates canvas', function () {
		browser.assert.elements(SNPCode + ' canvas', 1);
	});

});
