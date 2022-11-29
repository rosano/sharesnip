const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

kDefaultRoute.OLSKRouteLanguageCodes.forEach(function (OLSKRoutingLanguage) {

	const uLocalized = function (inputData) {
		return OLSKTestingLocalized(inputData, OLSKRoutingLanguage);
	};

	describe('SNPCodeDetail_Localize-' + OLSKRoutingLanguage, function () {

		context('SNPCodeDetailItem', function() {
		
			before(function() {
				return browser.OLSKVisit(kDefaultRoute, {
					OLSKRoutingLanguage,
					SNPCodeDetailItem: JSON.stringify(StubDocumentObjectValid({
						SNPDocumentURL: Math.random().toString(),
					})),
				});
			});

			it('localizes SNPCodeDetailToolbarBackButton', function () {
				browser.assert.attribute(SNPCodeDetailToolbarBackButton, 'title', uLocalized('SNPCodeDetailToolbarBackButtonText'));
			});

			it('localizes SNPCodeDetailToolbarCloneButton', function () {
				browser.assert.attribute(SNPCodeDetailToolbarCloneButton, 'title', uLocalized('SNPCodeDetailToolbarCloneButtonText'));
			});

			it('localizes SNPCodeDetailToolbarDiscardButton', function () {
				browser.assert.attribute(SNPCodeDetailToolbarDiscardButton, 'title', uLocalized('SNPCodeDetailToolbarDiscardButtonText'));
			});

			it('localizes SNPCodeDetailFormNameField', function () {
				browser.assert.attribute(SNPCodeDetailFormNameField, 'placeholder', uLocalized('SNPCodeDetailFormNameFieldText'));
			});

			context('discard', function () {
			
				it('localizes SNPCodeDetailDiscardConfirm', function() {
					browser.assert.OLSKConfirmQuestion(function () {
						return browser.pressButton(SNPCodeDetailToolbarDiscardButton);
					}, uLocalized('OLSKWordingConfirmText'));
				});
		
			});

		});

	});

});
