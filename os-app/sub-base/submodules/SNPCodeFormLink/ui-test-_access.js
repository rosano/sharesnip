const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	SNPCodeFormLink: '.SNPCodeFormLink',
	
	SNPCodeFormLinkField: '.SNPCodeFormLinkField',
}).map(function (e) {
	return global[e.shift()] = e.pop();
});

describe('SNPCodeFormLink_Access', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});

	it('shows SNPCodeFormLink', function () {
		browser.assert.elements(SNPCodeFormLink, 1);
	});

	it('shows SNPCodeFormLinkField', function () {
		browser.assert.elements(SNPCodeFormLinkField, 1);
	});

});
