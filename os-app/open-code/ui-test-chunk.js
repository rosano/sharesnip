const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('SNPCode_Chunk', function () {

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

	it('binds OLSKCollectionChunkFunction', function () {
		browser.assert.element('.OLSKCollectionChunkHeading');
	});
	
});
