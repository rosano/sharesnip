const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

kDefaultRoute.OLSKRouteLanguageCodes.forEach(function (OLSKRoutingLanguage) {

	const uLocalized = function (inputData) {
		return OLSKTestingLocalized(inputData, OLSKRoutingLanguage);
	};

	describe('SNPDownload_Localize-' + OLSKRoutingLanguage, function () {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				OLSKRoutingLanguage,
			});
		});

		it('localizes SNPDownloadHeading', function () {
			browser.assert.text(SNPDownloadHeading, uLocalized('SNPDownloadHeadingText'));
		});

		it('localizes SNPDownloadButton', function () {
			browser.assert.text(SNPDownloadButton, uLocalized('OLSKWordingDownloadText'));
		});

	});

});
