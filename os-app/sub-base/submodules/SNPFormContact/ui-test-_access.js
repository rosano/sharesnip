const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	SNPFormContact: '.SNPFormContact',
	
	SNPFormContactFirstNameField: '.SNPFormContactFirstNameField',
	SNPFormContactLastNameField: '.SNPFormContactLastNameField',
	SNPFormContactPhoneField: '.SNPFormContactPhoneField',
	SNPFormContactEmailField: '.SNPFormContactEmailField',
	SNPFormContactSiteField: '.SNPFormContactSiteField',
	SNPFormContactOrganizationField: '.SNPFormContactOrganizationField',
}).map(function (e) {
	return global[e.shift()] = e.pop();
});

describe('SNPFormContact_Access', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});

	it('shows SNPFormContact', function () {
		browser.assert.elements(SNPFormContact, 1);
	});

	it('shows SNPFormContactFirstNameField', function () {
		browser.assert.elements(SNPFormContactFirstNameField, 1);
	});

	it('shows SNPFormContactLastNameField', function () {
		browser.assert.elements(SNPFormContactLastNameField, 1);
	});

	it('shows SNPFormContactPhoneField', function () {
		browser.assert.elements(SNPFormContactPhoneField, 1);
	});

	it('shows SNPFormContactEmailField', function () {
		browser.assert.elements(SNPFormContactEmailField, 1);
	});

	it('shows SNPFormContactSiteField', function () {
		browser.assert.elements(SNPFormContactSiteField, 1);
	});

	it('shows SNPFormContactOrganizationField', function () {
		browser.assert.elements(SNPFormContactOrganizationField, 1);
	});

});
