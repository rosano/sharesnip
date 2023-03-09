const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

kDefaultRoute.OLSKRouteLanguageCodes.forEach(function (OLSKRoutingLanguage) {

	const uLocalized = function (inputData) {
		return OLSKTestingLocalized(inputData, OLSKRoutingLanguage);
	};

	describe('SNPGenerate_Localize-' + OLSKRoutingLanguage, function () {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				OLSKRoutingLanguage,
			});
		});

		it('localizes title', function() {
			browser.assert.text('title', uLocalized('SNPGenerateTitle'));
		});

		it('localizes SNPGenerateShareLink', function () {
			browser.assert.text(SNPGenerateShareLink, OLSKTestingFormatted(uLocalized('SNPGenerateShareLinkTextFormat'), 'rosano.ca/qr'));
		});

	});

});
