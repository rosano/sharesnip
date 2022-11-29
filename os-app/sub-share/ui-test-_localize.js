const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

kDefaultRoute.OLSKRouteLanguageCodes.forEach(function (OLSKRoutingLanguage) {

	const uLocalized = function (inputData) {
		return OLSKTestingLocalized(inputData, OLSKRoutingLanguage);
	};

	describe('SNPCodeShare_Localize-' + OLSKRoutingLanguage, function () {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				OLSKRoutingLanguage,
			});
		});

		it('localizes SNPCodeShareLinkField', function () {
			browser.assert.attribute(SNPCodeShareLinkField, 'placeholder', uLocalized('SNPCodeShareLinkFieldText'));
		});

		it('localizes SNPCodeShareCopyButton', function () {
			browser.assert.text(SNPCodeShareCopyButton, uLocalized('SNPCodeShareCopyButtonText'));
		});

	});

});
