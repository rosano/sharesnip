const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

kDefaultRoute.OLSKRouteLanguageCodes.forEach(function (OLSKRoutingLanguage) {

	const uLocalized = function (inputData) {
		return OLSKTestingLocalized(inputData, OLSKRoutingLanguage);
	};

	describe('SNPCollectDetail_Localize-' + OLSKRoutingLanguage, function () {

		context('SNPCollectDetailItem', function() {
		
			before(function() {
				return browser.OLSKVisit(kDefaultRoute, {
					OLSKRoutingLanguage,
					SNPCollectDetailItem: JSON.stringify(StubDocumentObjectValid({
						SNPDocumentURL: Math.random().toString(),
					})),
				});
			});

			it('localizes SNPCollectDetailToolbarBackButton', function () {
				browser.assert.attribute(SNPCollectDetailToolbarBackButton, 'title', uLocalized('SNPCollectDetailToolbarBackButtonText'));
			});

			it('localizes SNPCollectDetailToolbarCloneButton', function () {
				browser.assert.attribute(SNPCollectDetailToolbarCloneButton, 'title', uLocalized('SNPCollectDetailToolbarCloneButtonText'));
			});

			it('localizes SNPCollectDetailToolbarDiscardButton', function () {
				browser.assert.attribute(SNPCollectDetailToolbarDiscardButton, 'title', uLocalized('SNPCollectDetailToolbarDiscardButtonText'));
			});

			it('localizes SNPCollectDetailFormNameField', function () {
				browser.assert.attribute(SNPCollectDetailFormNameField, 'placeholder', uLocalized('SNPCollectDetailFormNameFieldText'));
			});

			it('localizes SNPCollectDetailDataField', function () {
				browser.assert.attribute(SNPCollectDetailDataField, 'placeholder', uLocalized('SNPCollectDetailDataFieldText'));
			});

			context('discard', function () {
			
				it('localizes SNPCollectDetailDiscardConfirm', function() {
					browser.assert.OLSKConfirmQuestion(function () {
						return browser.pressButton(SNPCollectDetailToolbarDiscardButton);
					}, uLocalized('OLSKWordingConfirmText'));
				});
		
			});

		});

	});

});
