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

			it('localizes SNPPlayDetailToolbarArchiveButton', function () {
				browser.assert.attribute(SNPPlayDetailToolbarArchiveButton, 'title', uLocalized('SNPPlayDetailToolbarArchiveButtonText'));
			});

			it('localizes SNPPlayDetailToolbarDiscardButton', function () {
				browser.assert.attribute(SNPPlayDetailToolbarDiscardButton, 'title', uLocalized('SNPPlayDetailToolbarDiscardButtonText'));
			});

			it('localizes SNPPlayDetailMediaURLField', function () {
				browser.assert.attribute(SNPPlayDetailMediaURLField, 'placeholder', uLocalized('SNPPlayDetailMediaURLFieldText'));
			});

			it('localizes SNPPlayDetailMediaOpenButton', function () {
				browser.assert.text(SNPPlayDetailMediaOpenButton, uLocalized('SNPPlayDetailMediaOpenButtonText'));
			});

			it('localizes SNPPlayDetailMediaFetchButton', function () {
				browser.assert.text(SNPPlayDetailMediaFetchButton, uLocalized('SNPPlayDetailMediaFetchButtonText'));
			});

			it('localizes SNPPlayDetailFormNameField', function () {
				browser.assert.attribute(SNPPlayDetailFormNameField, 'placeholder', uLocalized('SNPPlayDetailFormNameFieldText'));
			});

			it('localizes SNPPlayDetailFormNotesField', function () {
				browser.assert.attribute(SNPPlayDetailFormNotesField, 'placeholder', uLocalized('SNPPlayDetailFormNotesFieldText'));
			});

			it('localizes SNPPlayDetailLauncherItemArchive', function () {
				return browser.assert.OLSKLauncherItemText('SNPPlayDetailLauncherItemArchive', uLocalized('SNPPlayDetailToolbarArchiveButtonText'));
			});

			context('discard', function () {
			
				it('localizes SNPPlayDetailDiscardConfirm', function() {
					browser.assert.OLSKConfirmQuestion(function () {
						return browser.pressButton(SNPPlayDetailToolbarDiscardButton);
					}, uLocalized('OLSKWordingConfirmText'));
				});
		
			});

			context('SNPDocumentArchiveDate', function() {

				before(function() {
					return browser.OLSKVisit(kDefaultRoute, {
						OLSKRoutingLanguage,
						SNPPlayDetailItem: JSON.stringify(StubDocumentObjectValid({
							SNPDocumentArchiveDate: new Date(),
						})),
					});
				});

				it('localizes SNPPlayDetailToolbarUnarchiveButton', function () {
					browser.assert.attribute(SNPPlayDetailToolbarUnarchiveButton, 'title', uLocalized('SNPPlayDetailToolbarUnarchiveButtonText'));
				});

				it('localizes SNPPlayDetailLauncherItemUnarchive', function () {
					return browser.assert.OLSKLauncherItemText('SNPPlayDetailLauncherItemUnarchive', uLocalized('SNPPlayDetailToolbarUnarchiveButtonText'));
				});

			});

			context('$SNPDocumentIsInbox', function() {

				before(function() {
					return browser.OLSKVisit(kDefaultRoute, {
						OLSKRoutingLanguage,
						SNPPlayDetailItem: JSON.stringify(StubDocumentObjectValid({
							$SNPDocumentIsInbox: true,
						})),
					});
				});

				it('localizes SNPPlayDetailToolbarQueueButton', function () {
					browser.assert.attribute(SNPPlayDetailToolbarQueueButton, 'title', uLocalized('SNPPlayDetailToolbarQueueButtonText'));
				});

			});
		
		});

	});

});
