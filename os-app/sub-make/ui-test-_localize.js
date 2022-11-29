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

		it('localizes SNPCodeMakeHeading', function () {
			browser.assert.text(SNPCodeMakeHeading, uLocalized('SNPCodeMakeHeadingText'));
		});

		it('localizes SNPCodeMakeTypesNoteButton', function () {
			browser.assert.text(SNPCodeMakeTypesNoteButton, uLocalized('SNPCodeMakeTypesNoteButtonText'));
		});

		it('localizes SNPCodeMakeTypesLinkButton', function () {
			browser.assert.text(SNPCodeMakeTypesLinkButton, uLocalized('SNPCodeMakeTypesLinkButtonText'));
		});

		context('option', function () {
			
			before(function () {
				return browser.pressButton(SNPCodeMakeTypesNoteButton);
			});

			it('localizes SNPCodeMakeChangeButton', function () {
				browser.assert.text(SNPCodeMakeChangeButton, uLocalized('SNPCodeMakeChangeButtonText'));
			});

		});

	});

});
