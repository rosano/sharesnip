const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

const SNPPlayLogic = require('./ui-logic.js').default;
const OLSKObject = require('OLSKObject');

kDefaultRoute.OLSKRouteLanguageCodes.forEach(function (OLSKRoutingLanguage) {

	const uLocalized = function (inputData) {
		return OLSKTestingLocalized(inputData, OLSKRoutingLanguage);
	};

	describe('SNPPlay_Localize-' + OLSKRoutingLanguage, function () {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				OLSKRoutingLanguage,
			});
		});

		it('localizes title', function() {
			browser.assert.text('title', uLocalized('SNPPlayTitle'));
		});

		it('localizes SNPPlayStashButton', function () {
			browser.assert.attribute(SNPPlayStashButton, 'title', uLocalized('SNPPlayStashButtonText'));
		});

		it('localizes SNPPlayToggleFormButton', function () {
			browser.assert.attribute(SNPPlayToggleFormButton, 'title', uLocalized('SNPPlayToggleFormButtonText'));
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

		describe('SNPPlayFormField', function test_SNPPlayFormField () {

			before(function () {
				return browser.pressButton(SNPPlayToggleFormButton);
			});

			it('localizes SNPPlayFormField', function () {
				browser.assert.attribute(SNPPlayFormField, 'placeholder', uLocalized('SNPPlayFormFieldText'));
			});
			
		});

		describe('SNPPlayFormSubmitButton', function test_SNPPlayFormSubmitButton () {

			it('localizes SNPPlayFormSubmitButton', function () {
				browser.assert.text(SNPPlayFormSubmitButton, uLocalized('SNPPlayFormSubmitButtonText'));
			});
			
		});

		context('archive', function test_archive () {

			before(function () {
				browser.fill(SNPPlayFormField, Math.random().toString());
			});

			before(function () {
				return browser.pressButton(SNPPlayFormSubmitButton);
			});

			before(function () {
				return browser.click(SNPPlayListItem);
			});

			before(function () {
				return browser.pressButton('.SNPPlayDetailToolbarArchiveButton');
			});

			before(function () {
				return browser.OLSKFireKeyboardEvent(browser.window, 'Escape');
			});

			it('localizes SNPPlayRevealArchiveButton', function () {
				browser.assert.text(SNPPlayRevealArchiveButton, uLocalized('SNPPlayRevealArchiveButtonText'));
			});

			it('localizes SNPPlayLauncherItemRevealArchive', function () {
				return browser.assert.OLSKLauncherItemText('SNPPlayLauncherItemRevealArchive', uLocalized('SNPPlayRevealArchiveButtonText'));
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

		describe('SNPPlayShareModal', function test_SNPPlayShareModal() {

			before(function() {
				return browser.OLSKVisit(kDefaultRoute, {
					OLSKRoutingLanguage,
				});
			});

			before(function () {
				return browser.pressButton(SNPPlayToggleFormButton);
			});

			before(function () {
				browser.fill(SNPPlayFormField, Math.random().toString());
			});

			before(function () {
				return browser.pressButton(SNPPlayFormSubmitButton);
			});

			before(function () {
				return browser.pressButton(SNPPlayStashButton);
			});

			before(function () {
				return browser.click('.OLSKCollectionItem');
			});

			before(function () {
				return browser.click('.OLSKCatalogStashDoneButton');
			});

			it('sets OLSKModalViewTitleText', function () {
				browser.assert.text('.OLSKModalViewTitle', uLocalized('SNPPlayShareModalTitleText'));
			});

		});

		context('inbox', function test_inbox () {

			before(function() {
				return browser.OLSKVisit(kDefaultRoute, {
					OLSKRoutingLanguage,
					OLSKRoutingHash: {
						[SNPPlayLogic.SNPPlayInboxAnchor()]: encodeURIComponent(JSON.stringify([OLSKObject.OLSKObjectRemap(StubDocumentObjectValid({
							SNPDocumentURL: Math.random().toString(),
						}), SNPPlayLogic.SNPPlayRemap())])),
					},
				});
			});

			it('localizes SNPPlayClearInboxButton', function () {
				browser.assert.text(SNPPlayClearInboxButton, uLocalized('SNPPlayClearInboxButtonText'));
			});
		
		});

	});

});
