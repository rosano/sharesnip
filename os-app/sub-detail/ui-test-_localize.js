const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

kDefaultRoute.OLSKRouteLanguageCodes.forEach(function (OLSKRoutingLanguage) {

	const uLocalized = function (inputData) {
		return OLSKTestingLocalized(inputData, OLSKRoutingLanguage);
	};

	describe('SNPPlayDetail_Localize-' + OLSKRoutingLanguage, function () {

		context('SNPPlayDetailItem', function() {
		
			before(function() {
				return browser.OLSKVisit(kDefaultRoute, {
					OLSKRoutingLanguage,
					SNPPlayDetailItem: JSON.stringify(StubDocumentObjectValid({
						SNPDocumentURL: Math.random().toString(),
					})),
				});
			});

			it('localizes SNPPlayDetailToolbarBackButton', function () {
				browser.assert.attribute(SNPPlayDetailToolbarBackButton, 'title', uLocalized('SNPPlayDetailToolbarBackButtonText'));
			});

			it('localizes SNPPlayDetailToolbarQueueButton', function () {
				browser.assert.attribute(SNPPlayDetailToolbarQueueButton, 'title', uLocalized('SNPPlayDetailToolbarQueueButtonText'));
			});

			it('localizes SNPPlayDetailToolbarDiscardButton', function () {
				browser.assert.attribute(SNPPlayDetailToolbarDiscardButton, 'title', uLocalized('SNPPlayDetailToolbarDiscardButtonText'));
			});

			it('localizes SNPPlayDetailFormNameField', function () {
				browser.assert.attribute(SNPPlayDetailFormNameField, 'placeholder', uLocalized('SNPPlayDetailFormNameFieldText'));
			});

			context('discard', function () {
			
				it('localizes SNPPlayDetailDiscardConfirm', function() {
					browser.assert.OLSKConfirmQuestion(function () {
						return browser.pressButton(SNPPlayDetailToolbarDiscardButton);
					}, uLocalized('OLSKWordingConfirmText'));
				});
		
			});

		});

	});

});
