const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

const SNPPlayLogic = require('./ui-logic.js').default;
const OLSKObject = require('OLSKObject');

Object.entries({
	SNPPlay: '.SNPPlay',
	
	SNPPlayStashButton: '.SNPPlayStashButton',
	SNPPlayStashButtonImage: '.SNPPlayStashButtonImage',
	
	SNPPlayToggleFormButton: '.SNPPlayToggleFormButton',
	SNPPlayToggleFormButtonImage: '.SNPPlayToggleFormButtonImage',

	SNPPlayForm: '.SNPPlayForm',
	SNPPlayFormField: '.SNPPlayFormField',
	SNPPlayFormTaxonomy: '.SNPPlayForm .OLSKTaxonomy',
	SNPPlayFormSubmitButton: '.SNPPlayFormSubmitButton',

	SNPPlayClearInboxButton: '.SNPPlayClearInboxButton',

	SNPPlayListItem: '.SNPPlayListItem',

	SNPPlayRevealArchiveButton: '.SNPPlayRevealArchiveButton',

	SNPPlayViewportFooter: '.SNPPlayViewportFooter',
	
	SNPPlayCloudToolbar: '.SNPPlayCloudToolbar',
	
	SNPPlayShareModal: '.OLSKModalView .SNPPlayShare',
}).map(function (e) {
	return global[e.shift()] = e.pop();
});

describe('SNPPlay_Access', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});

	it('shows SNPPlay', function () {
		browser.assert.elements(SNPPlay, 1);
	});

	it('shows OLSKCatalog', function () {
		browser.assert.elements('.OLSKCatalog', 1);
	});

	it('shows SNPPlayStashButton', function () {
		browser.assert.elements(SNPPlayStashButton, 1);
	});

	it('shows SNPPlayStashButtonImage', function () {
		browser.assert.elements(SNPPlayStashButtonImage, 1);
	});

	it('shows SNPPlayToggleFormButton', function () {
		browser.assert.elements(SNPPlayToggleFormButton, 1);
	});

	it('shows SNPPlayToggleFormButtonImage', function () {
		browser.assert.elements(SNPPlayToggleFormButtonImage, 1);
	});

	it('hides SNPPlayForm', function () {
		browser.assert.elements(SNPPlayForm, 0);
	});

	it('hides SNPPlayClearInboxButton', function () {
		browser.assert.elements(SNPPlayClearInboxButton, 0);
	});

	it('hides SNPPlayListItem', function () {
		browser.assert.elements(SNPPlayListItem, 0);
	});

	it('hides SNPPlayRevealArchiveButton', function () {
		browser.assert.elements(SNPPlayRevealArchiveButton, 0);
	});

	it('shows SNPPlayViewportFooter', function () {
		browser.assert.elements(SNPPlayViewportFooter, 1);
	});

	it('hides SNPPlayCloudToolbar', function () {
		browser.assert.elements(SNPPlayCloudToolbar, 0);
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

	it('hides SNPPlayShareModal', function () {
		browser.assert.elements(SNPPlayShareModal, 0);
	});

	it('hides SNPPlayDetailLauncherFakeItemProxy', function () {
		return browser.assert.OLSKLauncherItems('SNPPlayDetailLauncherFakeItemProxy', 0);
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

		it('shows SNPPlayCloudToolbar', function () {
			browser.assert.elements(SNPPlayCloudToolbar, 1);
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
			return browser.pressButton(SNPPlayToggleFormButton);
		});

		it('shows SNPPlayForm', function () {
			browser.assert.elements(SNPPlayForm, 1);
		});

		it('shows SNPPlayFormField', function () {
			browser.assert.elements(SNPPlayFormField, 1);
		});

		it('shows SNPPlayFormTaxonomy', function () {
			browser.assert.elements(SNPPlayFormTaxonomy, 1);
		});

		it('shows SNPPlayFormSubmitButton', function () {
			browser.assert.elements(SNPPlayFormSubmitButton, 1);
		});

		context('create', function test_create() {

			const count = Math.max(1, Date.now() % 10);
			
			before(function () {
				browser.pressButton(SNPPlayToggleFormButton);
			});

			before(function () {
				browser.fill(SNPPlayFormField, Array.from(Array(count)).map(Math.random).join('\n\n'));
			});

			before(function () {
				return browser.pressButton(SNPPlayFormSubmitButton);
			});

			it('hides SNPPlayForm', function () {
				browser.assert.elements(SNPPlayForm, 0);
			});

			it('shows SNPPlayListItem', function () {
				browser.assert.elements(SNPPlayListItem, count);
			});
		
		});

	});

	context('select', function test_select() {

		before(function () {
			return browser.click(SNPPlayListItem);
		});

		it('shows SNPPlayDetailLauncherFakeItemProxy', function () {
			return browser.assert.OLSKLauncherItems('SNPPlayDetailLauncherFakeItemProxy', 1);
		});
	
	});

	context('archive', function test_archive () {

		before(function () {
			return browser.pressButton('.SNPPlayDetailToolbarArchiveButton');
		});

		it('hides SNPPlayRevealArchiveButton', function () {
			browser.assert.elements('.SNPPlayRevealArchiveButton', 0);
		});

		it('hides SNPPlayLauncherItemRevealArchive', function () {
			return browser.assert.OLSKLauncherItems('SNPPlayLauncherItemRevealArchive', 0);
		});

		context('clear_selection', function () {
			
			before(function () {
				return browser.OLSKFireKeyboardEvent(browser.window, 'Escape');
			});

			it('shows SNPPlayRevealArchiveButton', function () {
				browser.assert.elements('.SNPPlayRevealArchiveButton', 1);
			});

			it('shows SNPPlayLauncherItemRevealArchive', function () {
				return browser.assert.OLSKLauncherItems('SNPPlayLauncherItemRevealArchive', 1);
			});
		
		});

	});

	context('stash', function test_stash () {
		
		before(function() {
			return browser.OLSKVisit(kDefaultRoute);
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

		it('shows SNPPlayShareModal', function () {
			browser.assert.elements(SNPPlayShareModal, 1);
		});
	
	});

	context('inbox', function test_inbox () {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				OLSKRoutingHash: {
					[SNPPlayLogic.SNPPlayInboxAnchor()]: encodeURIComponent(JSON.stringify([OLSKObject.OLSKObjectRemap(StubDocumentObjectValid({
						SNPDocumentURL: Math.random().toString(),
					}), SNPPlayLogic.SNPPlayRemap())])),
				},
			});
		});

		it('shows SNPPlayClearInboxButton', function () {
			browser.assert.elements(SNPPlayClearInboxButton, 1);
		});

		it('shows SNPPlayListItem', function () {
			browser.assert.elements(SNPPlayListItem, 1);
		});

		context('click', function () {
			
			before(function () {
				return browser.pressButton(SNPPlayClearInboxButton);
			});

			it('hides SNPPlayClearInboxButton', function () {
				browser.assert.elements(SNPPlayClearInboxButton, 0);
			});

			it('hides SNPPlayListItem', function () {
				browser.assert.elements(SNPPlayListItem, 0);
			});
		
		});
	
	});

});
