const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

const SNPCollectLogic = require('./ui-logic.js').default;
const OLSKObject = require('OLSKObject');

Object.entries({
	SNPCollect: '.SNPCollect',
	
	SNPCollectToggleFormButton: '.SNPCollectToggleFormButton',
	SNPCollectToggleFormButtonImage: '.SNPCollectToggleFormButtonImage',

	SNPCollectListItem: '.SNPCollectListItem',

	SNPCollectViewportFooter: '.SNPCollectViewportFooter',
	
	SNPCollectCloudToolbar: '.SNPCollectCloudToolbar',
	
	SNPMakeModal: '.OLSKModalView .SNPMake',
	
	SNPCollectShareModal: '.OLSKModalView .SNPCollectShare',
}).map(function (e) {
	return global[e.shift()] = e.pop();
});

describe('SNPCollect_Access', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});

	it('shows SNPCollect', function () {
		browser.assert.elements(SNPCollect, 1);
	});

	it('shows OLSKCatalog', function () {
		browser.assert.elements('.OLSKCatalog', 1);
	});

	it('shows SNPCollectToggleFormButton', function () {
		browser.assert.elements(SNPCollectToggleFormButton, 1);
	});

	it('shows SNPCollectToggleFormButtonImage', function () {
		browser.assert.elements(SNPCollectToggleFormButtonImage, 1);
	});

	it('shows SNPCollectViewportFooter', function () {
		browser.assert.elements(SNPCollectViewportFooter, 1);
	});

	it('hides SNPCollectCloudToolbar', function () {
		browser.assert.elements(SNPCollectCloudToolbar, 0);
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

	it('hides SNPMakeModal', function () {
		browser.assert.elements(SNPMakeModal, 0);
	});

	it('hides SNPCollectShareModal', function () {
		browser.assert.elements(SNPCollectShareModal, 0);
	});

	it('hides SNPCollectDetailLauncherFakeItemProxy', function () {
		return browser.assert.OLSKLauncherItems('SNPCollectDetailLauncherFakeItemProxy', 0);
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

		it('shows SNPCollectCloudToolbar', function () {
			browser.assert.elements(SNPCollectCloudToolbar, 1);
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

	context('create', function test_create() {

		before(function () {
			return browser.pressButton('.SNPCollectToggleFormButton');
		});

		it('shows SNPMakeModal', function () {
			browser.assert.elements(SNPMakeModal, 1);
		});

		context('submit', function () {

			before(function () {
				return browser.pressButton(SNPMakeTypesNoteButton);
			});
			
			before(function () {
				return browser.fill('.SNPCollectFormDataField', Math.random().toString());
			});

			before(function () {
				return browser.pressButton(SNPFormBaseSaveButton);
			});

			it('hides SNPMakeModal', function () {
				browser.assert.elements(SNPMakeModal, 0);
			});
		
		});
	
	});

	context('select', function test_select() {

		before(function () {
			return browser.click(SNPCollectListItem);
		});

		it('shows SNPCollectDetailLauncherFakeItemProxy', function () {
			return browser.assert.OLSKLauncherItems('SNPCollectDetailLauncherFakeItemProxy', 1);
		});
	
	});

});
