const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	SNPFormPhone: '.SNPFormPhone',
	
	SNPFormPhoneField: '.SNPFormPhoneField',
}).map(function (e) {
	return global[e.shift()] = e.pop();
});

describe('SNPFormPhone_Access', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});

	it('shows SNPFormPhone', function () {
		browser.assert.elements(SNPFormPhone, 1);
	});

	it('shows SNPFormPhoneField', function () {
		browser.assert.elements(SNPFormPhoneField, 1);
	});

});
