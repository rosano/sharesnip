const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

const SNPDocument = require('../_shared/SNPDocument/main.js').default;

kDefaultRoute.OLSKRouteLanguageCodes.forEach(function (OLSKRoutingLanguage) {

	const uLocalized = function (inputData) {
		return OLSKTestingLocalized(inputData, OLSKRoutingLanguage);
	};

	describe('SNPCollectDetail_Localize-' + OLSKRoutingLanguage, function () {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				OLSKRoutingLanguage,
				SNPCollectDetailItem: JSON.stringify(StubDocumentObjectValid({
					SNPDocumentURL: Math.random().toString(),
					SNPDocumentType: SNPDocument.SNPDocumentTypeSite(),
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

		it('localizes SNPCollectDetailDataOpenButton', function () {
			browser.assert.text(SNPCollectDetailDataOpenButton, uLocalized('SNPCollectDetailDataOpenButtonText'));
		});

		it('localizes SNPCollectDetailEditButton', function () {
			browser.assert.text(SNPCollectDetailEditButton, uLocalized('OLSKWordingEditText'));
		});

			it('localizes SNPDetailLauncherItemDebug', function () {
				return browser.assert.OLSKLauncherItemText('SNPDetailLauncherItemDebug', uLocalized('OLSKWordingDebugObjectText'));
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
