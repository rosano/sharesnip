const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	SNPFormWifi: '.SNPFormWifi',
	
	SNPFormWifiNetworkField: '.SNPFormWifiNetworkField',
	SNPFormWifiPasswordField: '.SNPFormWifiPasswordField',
	SNPFormWifiSecurityNoneOption: '.SNPFormWifiSecurityNoneOption',
	SNPFormWifiSecurityNoneOptionField: '.SNPFormWifiSecurityNoneOptionField',
	SNPFormWifiSecurityWPAOption: '.SNPFormWifiSecurityWPAOption',
	SNPFormWifiSecurityWPAOptionField: '.SNPFormWifiSecurityWPAOptionField',
	SNPFormWifiSecurityWEPOption: '.SNPFormWifiSecurityWEPOption',
	SNPFormWifiSecurityWEPOptionField: '.SNPFormWifiSecurityWEPOptionField',
}).map(function (e) {
	return global[e.shift()] = e.pop();
});

describe('SNPFormWifi_Access', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});

	it('shows SNPFormWifi', function () {
		browser.assert.elements(SNPFormWifi, 1);
	});

	it('shows SNPFormWifiNetworkField', function () {
		browser.assert.elements(SNPFormWifiNetworkField, 1);
	});

	it('shows SNPFormWifiPasswordField', function () {
		browser.assert.elements(SNPFormWifiPasswordField, 1);
	});

	it('shows SNPFormWifiSecurityNoneOption', function () {
		browser.assert.elements(SNPFormWifiSecurityNoneOption, 1);
	});

	it('shows SNPFormWifiSecurityNoneOptionField', function () {
		browser.assert.elements(SNPFormWifiSecurityNoneOptionField, 1);
	});

	it('shows SNPFormWifiSecurityWPAOption', function () {
		browser.assert.elements(SNPFormWifiSecurityWPAOption, 1);
	});

	it('shows SNPFormWifiSecurityWPAOptionField', function () {
		browser.assert.elements(SNPFormWifiSecurityWPAOptionField, 1);
	});

	it('shows SNPFormWifiSecurityWEPOption', function () {
		browser.assert.elements(SNPFormWifiSecurityWEPOption, 1);
	});

	it('shows SNPFormWifiSecurityWEPOptionField', function () {
		browser.assert.elements(SNPFormWifiSecurityWEPOptionField, 1);
	});

	context('SNPFormWifiSecurityNoneOption', function () {
		
		before(function () {
			return browser.click(SNPFormWifiSecurityNoneOption);
		});

		it('hides SNPFormWifiPasswordField', function () {
			browser.assert.elements(SNPFormWifiPasswordField, 0);
		});
	
	});

});
