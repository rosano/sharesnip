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

		it('localizes SNPMakeTypesLinkButton', function () {
			browser.assert.text(SNPMakeTypesLinkButton, uLocalized('SNPMakeTypesLinkButtonText'));
		});

		it('localizes SNPMakeTypesNoteButton', function () {
			browser.assert.text(SNPMakeTypesNoteButton, uLocalized('SNPMakeTypesNoteButtonText'));
		});

		it('localizes SNPMakeTypesPhoneButton', function () {
			browser.assert.text(SNPMakeTypesPhoneButton, uLocalized('SNPMakeTypesPhoneButtonText'));
		});

	});

});
