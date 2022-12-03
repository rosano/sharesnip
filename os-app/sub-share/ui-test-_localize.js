const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

kDefaultRoute.OLSKRouteLanguageCodes.forEach(function (OLSKRoutingLanguage) {

	const uLocalized = function (inputData) {
		return OLSKTestingLocalized(inputData, OLSKRoutingLanguage);
	};

	describe('SNPCollectShare_Localize-' + OLSKRoutingLanguage, function () {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				OLSKRoutingLanguage,
			});
		});

		it('localizes SNPCollectShareLinkField', function () {
			browser.assert.attribute(SNPCollectShareLinkField, 'placeholder', uLocalized('SNPCollectShareLinkFieldText'));
		});

		it('localizes SNPCollectShareCopyButton', function () {
			browser.assert.text(SNPCollectShareCopyButton, uLocalized('SNPCollectShareCopyButtonText'));
		});

	});

});
