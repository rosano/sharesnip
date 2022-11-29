const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

kDefaultRoute.OLSKRouteLanguageCodes.forEach(function (OLSKRoutingLanguage) {

	const uLocalized = function (inputData) {
		return OLSKTestingLocalized(inputData, OLSKRoutingLanguage);
	};

	describe('SNPShare_Localize-' + OLSKRoutingLanguage, function () {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				OLSKRoutingLanguage,
			});
		});

		it('localizes SNPCodeMakeHeading', function () {
			browser.assert.text(SNPCodeMakeHeading, uLocalized('SNPCodeMakeHeadingText'));
		});

		it('localizes SNPCodeMakeNoteButton', function () {
			browser.assert.text(SNPCodeMakeNoteButton, uLocalized('SNPCodeMakeNoteButtonText'));
		});

		it('localizes SNPCodeMakeLinkButton', function () {
			browser.assert.text(SNPCodeMakeLinkButton, uLocalized('SNPCodeMakeLinkButtonText'));
		});

	});

});
