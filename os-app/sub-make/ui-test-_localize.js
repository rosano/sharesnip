const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

kDefaultRoute.OLSKRouteLanguageCodes.forEach(function (OLSKRoutingLanguage) {

	const uLocalized = function (inputData) {
		return OLSKTestingLocalized(inputData, OLSKRoutingLanguage);
	};

	describe('SNPCodeMake_Localize-' + OLSKRoutingLanguage, function () {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				OLSKRoutingLanguage,
			});
		});

		it('localizes SNPCodeMakeTypesLinkButton', function () {
			browser.assert.text(SNPCodeMakeTypesLinkButton, uLocalized('SNPCodeMakeTypesLinkButtonText'));
		});

		it('localizes SNPCodeMakeTypesNoteButton', function () {
			browser.assert.text(SNPCodeMakeTypesNoteButton, uLocalized('SNPCodeMakeTypesNoteButtonText'));
		});

	});

});
