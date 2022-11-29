const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('SNPPlay_Chunk', function () {

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

	it('binds OLSKCollectionChunkFunction', function () {
		browser.assert.element('.OLSKCollectionChunkHeading');
	});
	
});
