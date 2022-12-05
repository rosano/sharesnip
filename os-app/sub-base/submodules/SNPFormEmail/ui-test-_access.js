const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	SNPFormEmail: '.SNPFormEmail',
	
	SNPFormEmailField: '.SNPFormEmailField',
}).map(function (e) {
	return global[e.shift()] = e.pop();
});

describe('SNPFormEmail_Access', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});

	it('shows SNPFormEmail', function () {
		browser.assert.elements(SNPFormEmail, 1);
	});

	it('shows SNPFormEmailField', function () {
		browser.assert.elements(SNPFormEmailField, 1);
	});

});
