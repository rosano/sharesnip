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

		it('localizes SNPPlayShareLinkField', function () {
			browser.assert.attribute(SNPPlayShareLinkField, 'placeholder', uLocalized('SNPPlayShareLinkFieldText'));
		});

		it('localizes SNPPlayShareCopyButton', function () {
			browser.assert.text(SNPPlayShareCopyButton, uLocalized('SNPPlayShareCopyButtonText'));
		});

	});

});
