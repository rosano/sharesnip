const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

kDefaultRoute.OLSKRouteLanguageCodes.forEach(function (OLSKRoutingLanguage) {

	const uLocalized = function (inputData) {
		return OLSKTestingLocalized(inputData, OLSKRoutingLanguage);
	};

	describe('SNPMake_Localize-' + OLSKRoutingLanguage, function () {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				OLSKRoutingLanguage,
			});
		});

		it('localizes SNPMakeScanButton', function () {
			browser.assert.text(SNPMakeScanButton, uLocalized('SNPMakeScanButtonText'));
		});

		it('localizes SNPMakeTypesNoteButton', function () {
			browser.assert.text(SNPMakeTypesNoteButton, uLocalized('SNPMakeTypesNoteButtonText'));
		});

		it('localizes SNPMakeTypesLinkButton', function () {
			browser.assert.text(SNPMakeTypesLinkButton, uLocalized('SNPMakeTypesLinkButtonText'));
		});

		it('localizes SNPMakeTypesEmailButton', function () {
			browser.assert.text(SNPMakeTypesEmailButton, uLocalized('SNPMakeTypesEmailButtonText'));
		});

		it('localizes SNPMakeTypesPhoneButton', function () {
			browser.assert.text(SNPMakeTypesPhoneButton, uLocalized('SNPMakeTypesPhoneButtonText'));
		});

		it('localizes SNPMakeTypesWifiButton', function () {
			browser.assert.text(SNPMakeTypesWifiButton, 'Wi-Fi');
		});

	});

});
