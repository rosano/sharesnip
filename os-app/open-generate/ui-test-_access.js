const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	SNPGenerate: '.SNPGenerate',

	SNPGenerateViewportFooter: '.SNPGenerateViewportFooter',
}).map(function (e) {
	return global[e.shift()] = e.pop();
});

describe('SNPGenerate_Access', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});

	it('shows SNPGenerate', function () {
		browser.assert.elements(SNPGenerate, 1);
	});

	it('hides SNPDownload', function () {
		browser.assert.elements('.SNPDownload', 0);
	});

	it('shows SNPGenerateViewportFooter', function () {
		browser.assert.elements(SNPGenerateViewportFooter, 1);
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

	it('shows OLSKAppToolbarLauncherButton', function () {
		browser.assert.elements('.OLSKAppToolbarLauncherButton', 1);
	});

	it('shows OLSKInstall', function () {
		browser.assert.elements('.OLSKInstall', 1);
	});

	it('shows OLSKServiceWorkerLauncherFakeItemProxy', function () {
		return browser.assert.OLSKLauncherItems('OLSKServiceWorkerLauncherFakeItemProxy', 1);
	});

	context('valid', function () {

		before(function () {
			return browser.pressButton('.SNPMakeTypesNoteButton');
		});

		before(function () {
			return browser.fill('.SNPFormNoteField', Math.random().toString());
		});

		it('shows SNPDownload', function () {
			browser.assert.elements('.SNPDownload', 1);
		});
	
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

});
