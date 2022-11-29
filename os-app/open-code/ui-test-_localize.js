const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

const SNPCodeLogic = require('./ui-logic.js').default;
const OLSKObject = require('OLSKObject');

kDefaultRoute.OLSKRouteLanguageCodes.forEach(function (OLSKRoutingLanguage) {

	const uLocalized = function (inputData) {
		return OLSKTestingLocalized(inputData, OLSKRoutingLanguage);
	};

	describe('SNPCode_Localize-' + OLSKRoutingLanguage, function () {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				OLSKRoutingLanguage,
			});
		});

		it('localizes title', function() {
			browser.assert.text('title', uLocalized('SNPCodeTitle'));
		});

		it('localizes SNPCodeStashButton', function () {
			browser.assert.attribute(SNPCodeStashButton, 'title', uLocalized('SNPCodeStashButtonText'));
		});

		it('localizes SNPCodeToggleFormButton', function () {
			browser.assert.attribute(SNPCodeToggleFormButton, 'title', uLocalized('SNPCodeToggleFormButtonText'));
		});

		describe('OLSKAppToolbarLauncherButton', function test_OLSKAppToolbarLauncherButton () {

			before(function () {
				return browser.pressButton('.OLSKAppToolbarLauncherButton');
			});

			it('localizes LCHLauncherFilterInput', function () {
				browser.assert.attribute('.LCHLauncherFilterInput', 'placeholder', uLocalized('OLSKWordingTypeToSearch'));
			});

			after(function () {
				return browser.pressButton('#TestLCHDebugCloseButton');
			});

		});

		describe('OLSKAppToolbarLanguageButton', function test_OLSKAppToolbarLanguageButton () {

			before(function () {
				return browser.pressButton('.OLSKAppToolbarLanguageButton');
			});

			it('localizes LCHLauncherFilterInput', function () {
				browser.assert.attribute('.LCHLauncherFilterInput', 'placeholder', uLocalized('OLSKWordingTypeToFilter'));
			});

			after(function () {
				return browser.pressButton('#TestLCHDebugCloseButton');
			});

		});

		describe('SNPCodeFormField', function test_SNPCodeFormField () {

			before(function () {
				return browser.pressButton(SNPCodeToggleFormButton);
			});

			it('localizes SNPCodeFormField', function () {
				browser.assert.attribute(SNPCodeFormField, 'placeholder', uLocalized('SNPCodeFormFieldText'));
			});
			
		});

		describe('SNPCodeFormSubmitButton', function test_SNPCodeFormSubmitButton () {

			it('localizes SNPCodeFormSubmitButton', function () {
				browser.assert.text(SNPCodeFormSubmitButton, uLocalized('SNPCodeFormSubmitButtonText'));
			});
			
		});

		context('archive', function test_archive () {

			before(function () {
				browser.fill(SNPCodeFormField, Math.random().toString());
			});

			before(function () {
				return browser.pressButton(SNPCodeFormSubmitButton);
			});

			before(function () {
				return browser.click(SNPCodeListItem);
			});

			before(function () {
				return browser.pressButton('.SNPCodeDetailToolbarArchiveButton');
			});

			before(function () {
				return browser.OLSKFireKeyboardEvent(browser.window, 'Escape');
			});

			it('localizes SNPCodeRevealArchiveButton', function () {
				browser.assert.text(SNPCodeRevealArchiveButton, uLocalized('SNPCodeRevealArchiveButtonText'));
			});

			it('localizes SNPCodeLauncherItemRevealArchive', function () {
				return browser.assert.OLSKLauncherItemText('SNPCodeLauncherItemRevealArchive', uLocalized('SNPCodeRevealArchiveButtonText'));
			});

		});

		describe('OLSKApropos', function test_OLSKApropos() {

			before(function () {
				return browser.pressButton('.OLSKAppToolbarAproposButton');
			});

			it('sets OLSKModalViewTitleText', function () {
				browser.assert.text('.OLSKModalViewTitle', uLocalized('OLSKAproposHeadingText'));
			});

			after(function () {
				browser.pressButton('.OLSKModalViewCloseButton');
			});

		});

		describe('tongue', function test_tongue() {

			before(function () {
				return browser.pressButton('.OLSKAppToolbarLanguageButton');
			});

			kDefaultRoute.OLSKRouteLanguageCodes.filter(function (e) {
				return e !== OLSKRoutingLanguage;
			}).forEach(function (e) {

				const signature = 'OLSKLanguageSwitcherLauncherItemSwitch-' + e;

				before(function () {
					return browser.fill('.LCHLauncherFilterInput', signature);
				});

				it(`shows ${ signature }`, function () {
					browser.assert.elements('.LCHLauncherPipeItem', 1);
				});

			});

			after(function () {
				browser.pressButton('#TestLCHDebugCloseButton');
			});

		});

		describe('SNPCodeShareModal', function test_SNPCodeShareModal() {

			before(function() {
				return browser.OLSKVisit(kDefaultRoute, {
					OLSKRoutingLanguage,
				});
			});

			before(function () {
				return browser.pressButton(SNPCodeToggleFormButton);
			});

			before(function () {
				browser.fill(SNPCodeFormField, Math.random().toString());
			});

			before(function () {
				return browser.pressButton(SNPCodeFormSubmitButton);
			});

			before(function () {
				return browser.pressButton(SNPCodeStashButton);
			});

			before(function () {
				return browser.click('.OLSKCollectionItem');
			});

			before(function () {
				return browser.click('.OLSKCatalogStashDoneButton');
			});

			it('sets OLSKModalViewTitleText', function () {
				browser.assert.text('.OLSKModalViewTitle', uLocalized('SNPCodeShareModalTitleText'));
			});

		});

		context('inbox', function test_inbox () {

			before(function() {
				return browser.OLSKVisit(kDefaultRoute, {
					OLSKRoutingLanguage,
					OLSKRoutingHash: {
						[SNPCodeLogic.SNPCodeInboxAnchor()]: encodeURIComponent(JSON.stringify([OLSKObject.OLSKObjectRemap(StubDocumentObjectValid({
							SNPDocumentURL: Math.random().toString(),
						}), SNPCodeLogic.SNPCodeRemap())])),
					},
				});
			});

			it('localizes SNPCodeClearInboxButton', function () {
				browser.assert.text(SNPCodeClearInboxButton, uLocalized('SNPCodeClearInboxButtonText'));
			});
		
		});

	});

});
