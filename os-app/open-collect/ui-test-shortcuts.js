const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('SNPCollect_Shortcuts', function () {

	before(function () {
		browser.assert.elements('.OLSKCatalogDetail .OLSKPlaceholder', 1);
	});

	before(function () {
		return browser.pressButton('.SNPCollectToggleFormButton');
	});

	before(function () {
		return browser.fill('.SNPFormDataField', Math.random().toString());
	});

	before(function () {
		return browser.pressButton('.SNPFormBaseSaveButton');
	});

	before(function () {
		return browser.pressButton('.SNPCollectDetailEditButton');
	});

	before(function () {
		browser.assert.elements('.OLSKCatalogDetail .OLSKPlaceholder', 0);
	});

	before(function () {
		return browser.OLSKFireKeyboardEvent(browser.window, 'Escape');
	});

	it('does nothing', function () {
		browser.assert.elements('.OLSKCatalogDetail .OLSKPlaceholder', 0);
	});

});
