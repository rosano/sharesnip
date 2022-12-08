const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	SNPFormSite: '.SNPFormSite',
	
	SNPFormSiteField: '.SNPFormSiteField',
}).map(function (e) {
	return global[e.shift()] = e.pop();
});

describe('SNPFormSite_Access', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});

	it('shows SNPFormSite', function () {
		browser.assert.elements(SNPFormSite, 1);
	});

	it('shows SNPFormSiteField', function () {
		browser.assert.elements(SNPFormSiteField, 1);
	});

});
