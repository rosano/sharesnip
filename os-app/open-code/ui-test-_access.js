const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

const SNPCodeLogic = require('./ui-logic.js').default;
const OLSKObject = require('OLSKObject');

Object.entries({
	SNPCode: '.SNPCode',
	
	SNPCodeStashButton: '.SNPCodeStashButton',
	SNPCodeStashButtonImage: '.SNPCodeStashButtonImage',
	
	SNPCodeToggleFormButton: '.SNPCodeToggleFormButton',
	SNPCodeToggleFormButtonImage: '.SNPCodeToggleFormButtonImage',

	SNPCodeForm: '.SNPCodeForm',
	SNPCodeFormField: '.SNPCodeFormField',
	SNPCodeFormTaxonomy: '.SNPCodeForm .OLSKTaxonomy',
	SNPCodeFormSubmitButton: '.SNPCodeFormSubmitButton',

	SNPCodeClearInboxButton: '.SNPCodeClearInboxButton',

	SNPCodeListItem: '.SNPCodeListItem',

	SNPCodeRevealArchiveButton: '.SNPCodeRevealArchiveButton',

	SNPCodeViewportFooter: '.SNPCodeViewportFooter',
	
	SNPCodeCloudToolbar: '.SNPCodeCloudToolbar',
	
	SNPCodeShareModal: '.OLSKModalView .SNPCodeShare',
}).map(function (e) {
	return global[e.shift()] = e.pop();
});

describe('SNPCode_Access', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});

	it('shows SNPCode', function () {
		browser.assert.elements(SNPCode, 1);
	});

	it('shows OLSKCatalog', function () {
		browser.assert.elements('.OLSKCatalog', 1);
	});

	it('shows SNPCodeStashButton', function () {
		browser.assert.elements(SNPCodeStashButton, 1);
	});

	it('shows SNPCodeStashButtonImage', function () {
		browser.assert.elements(SNPCodeStashButtonImage, 1);
	});

	it('shows SNPCodeToggleFormButton', function () {
		browser.assert.elements(SNPCodeToggleFormButton, 1);
	});

	it('shows SNPCodeToggleFormButtonImage', function () {
		browser.assert.elements(SNPCodeToggleFormButtonImage, 1);
	});

	it('hides SNPCodeForm', function () {
		browser.assert.elements(SNPCodeForm, 0);
	});

	it('hides SNPCodeClearInboxButton', function () {
		browser.assert.elements(SNPCodeClearInboxButton, 0);
	});

	it('hides SNPCodeListItem', function () {
		browser.assert.elements(SNPCodeListItem, 0);
	});

	it('hides SNPCodeRevealArchiveButton', function () {
		browser.assert.elements(SNPCodeRevealArchiveButton, 0);
	});

	it('shows SNPCodeViewportFooter', function () {
		browser.assert.elements(SNPCodeViewportFooter, 1);
	});

	it('hides SNPCodeCloudToolbar', function () {
		browser.assert.elements(SNPCodeCloudToolbar, 0);
	});

	it('shows OLSKAppToolbar', function () {
		browser.assert.elements('.OLSKAppToolbar', 1);
	});

	it('shows OLSKAppToolbarAproposButton', function () {
		browser.assert.elements('.OLSKAppToolbarAproposButton', 1);
	});

	it('shows OLSKAppToolbarLanguageButton', function () {
		browser.assert.elements('.OLSKAppToolbarLanguageButton', 1);
	});

	it('shows OLSKAppToolbarGuideLink', function () {
		browser.assert.elements('.OLSKAppToolbarGuideLink', 1);
	});

	it('shows OLSKAppToolbarLauncherButton', function () {
		browser.assert.elements('.OLSKAppToolbarLauncherButton', 1);
	});

	it('shows OLSKInstall', function () {
		browser.assert.elements('.OLSKInstall', 1);
	});

	it('hides SNPCodeShareModal', function () {
		browser.assert.elements(SNPCodeShareModal, 0);
	});

	it('hides SNPCodeDetailLauncherFakeItemProxy', function () {
		return browser.assert.OLSKLauncherItems('SNPCodeDetailLauncherFakeItemProxy', 0);
	});

	it('shows ZDRLauncherFakeItemProxy', function () {
		return browser.assert.OLSKLauncherItems('ZDRLauncherFakeItemProxy', 1);
	});

	it('shows OLSKTransportLauncherFakeItemProxy', function () {
		return browser.assert.OLSKLauncherItems('OLSKTransportLauncherFakeItemProxy', 1);
	});

	it('shows OLSKRemoteStorageLauncherFakeItemProxy', function () {
		return browser.assert.OLSKLauncherItems('OLSKRemoteStorageLauncherFakeItemProxy', 1);
	});

	it('shows OLSKServiceWorkerLauncherFakeItemProxy', function () {
		return browser.assert.OLSKLauncherItems('OLSKServiceWorkerLauncherFakeItemProxy', 1);
	});

	describe('tongue', function test_tongue() {

		before(function () {
			return browser.pressButton('.OLSKAppToolbarLanguageButton');
		});

		before(function () {
			return browser.fill('.LCHLauncherFilterInput', 'OLSKLanguageSwitcherLauncherFakeItemProxy');
		});

		it('shows OLSKLanguageSwitcherLauncherFakeItemProxy', function () {
			browser.assert.elements('.LCHLauncherPipeItem', 1);
		});

		after(function () {
			browser.pressButton('#TestLCHDebugCloseButton');
		});

	});

	describe('OLSKAppToolbarCloudButton', function test_OLSKAppToolbarCloudButton () {
		
		before(function () {
			return browser.pressButton('.OLSKAppToolbarCloudButton');
		});

		it('shows SNPCodeCloudToolbar', function () {
			browser.assert.elements(SNPCodeCloudToolbar, 1);
		});

		it('shows OLSKCloud', function () {
			browser.assert.elements('.OLSKCloud', 1);
		});
	
	});

	describe('OLSKAppToolbarLauncherButton', function test_OLSKAppToolbarLauncherButton () {

		before(function () {
			return browser.pressButton('.OLSKAppToolbarLauncherButton');
		});

		it('shows LCHLauncher', function() {
			browser.assert.elements('.LCHLauncher', 1);
		});

		context('AltSpace', function () {
			
			before(function () {
				return browser.OLSKFireKeyboardEvent(browser.window, 'Space', {
					altKey: true,
				});
			});
			
			it('hides LCHLauncher', function () {
				browser.assert.elements('.LCHLauncher', 0);
			});

		});

	}); 

	context('toggle_form', function test_toggle_form () {

		before(function () {
			return browser.pressButton(SNPCodeToggleFormButton);
		});

		it('shows SNPCodeForm', function () {
			browser.assert.elements(SNPCodeForm, 1);
		});

		it('shows SNPCodeFormField', function () {
			browser.assert.elements(SNPCodeFormField, 1);
		});

		it('shows SNPCodeFormTaxonomy', function () {
			browser.assert.elements(SNPCodeFormTaxonomy, 1);
		});

		it('shows SNPCodeFormSubmitButton', function () {
			browser.assert.elements(SNPCodeFormSubmitButton, 1);
		});

		context('create', function test_create() {

			const count = Math.max(1, Date.now() % 10);
			
			before(function () {
				browser.pressButton(SNPCodeToggleFormButton);
			});

			before(function () {
				browser.fill(SNPCodeFormField, Array.from(Array(count)).map(Math.random).join('\n\n'));
			});

			before(function () {
				return browser.pressButton(SNPCodeFormSubmitButton);
			});

			it('hides SNPCodeForm', function () {
				browser.assert.elements(SNPCodeForm, 0);
			});

			it('shows SNPCodeListItem', function () {
				browser.assert.elements(SNPCodeListItem, count);
			});
		
		});

	});

	context('select', function test_select() {

		before(function () {
			return browser.click(SNPCodeListItem);
		});

		it('shows SNPCodeDetailLauncherFakeItemProxy', function () {
			return browser.assert.OLSKLauncherItems('SNPCodeDetailLauncherFakeItemProxy', 1);
		});
	
	});

	context('archive', function test_archive () {

		before(function () {
			return browser.pressButton('.SNPCodeDetailToolbarArchiveButton');
		});

		it('hides SNPCodeRevealArchiveButton', function () {
			browser.assert.elements('.SNPCodeRevealArchiveButton', 0);
		});

		it('hides SNPCodeLauncherItemRevealArchive', function () {
			return browser.assert.OLSKLauncherItems('SNPCodeLauncherItemRevealArchive', 0);
		});

		context('clear_selection', function () {
			
			before(function () {
				return browser.OLSKFireKeyboardEvent(browser.window, 'Escape');
			});

			it('shows SNPCodeRevealArchiveButton', function () {
				browser.assert.elements('.SNPCodeRevealArchiveButton', 1);
			});

			it('shows SNPCodeLauncherItemRevealArchive', function () {
				return browser.assert.OLSKLauncherItems('SNPCodeLauncherItemRevealArchive', 1);
			});
		
		});

	});

	context('stash', function test_stash () {
		
		before(function() {
			return browser.OLSKVisit(kDefaultRoute);
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

		it('shows SNPCodeShareModal', function () {
			browser.assert.elements(SNPCodeShareModal, 1);
		});
	
	});

	context('inbox', function test_inbox () {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				OLSKRoutingHash: {
					[SNPCodeLogic.SNPCodeInboxAnchor()]: encodeURIComponent(JSON.stringify([OLSKObject.OLSKObjectRemap(StubDocumentObjectValid({
						SNPDocumentURL: Math.random().toString(),
					}), SNPCodeLogic.SNPCodeRemap())])),
				},
			});
		});

		it('shows SNPCodeClearInboxButton', function () {
			browser.assert.elements(SNPCodeClearInboxButton, 1);
		});

		it('shows SNPCodeListItem', function () {
			browser.assert.elements(SNPCodeListItem, 1);
		});

		context('click', function () {
			
			before(function () {
				return browser.pressButton(SNPCodeClearInboxButton);
			});

			it('hides SNPCodeClearInboxButton', function () {
				browser.assert.elements(SNPCodeClearInboxButton, 0);
			});

			it('hides SNPCodeListItem', function () {
				browser.assert.elements(SNPCodeListItem, 0);
			});
		
		});
	
	});

});
