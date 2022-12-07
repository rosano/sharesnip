const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	SNPFormWifi: '.SNPFormWifi',
	
	SNPFormWifiNetworkField: '.SNPFormWifiNetworkField',
	SNPFormWifiPasswordField: '.SNPFormWifiPasswordField',
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

});
