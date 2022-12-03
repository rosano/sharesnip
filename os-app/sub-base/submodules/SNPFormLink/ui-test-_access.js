const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	SNPFormLink: '.SNPFormLink',
	
	SNPFormLinkField: '.SNPFormLinkField',
}).map(function (e) {
	return global[e.shift()] = e.pop();
});

describe('SNPFormLink_Access', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});

	it('shows SNPFormLink', function () {
		browser.assert.elements(SNPFormLink, 1);
	});

	it('shows SNPFormLinkField', function () {
		browser.assert.elements(SNPFormLinkField, 1);
	});

});
