const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('SNPCode_Tag', function () {

	const item = Math.random().toString();

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});

	before(function () {
		return browser.pressButton('.OLSKAppToolbarLauncherButton');
	});

	before(function () {
		return browser.fill('.LCHLauncherFilterInput', 'SNPCodeLauncherFakeCreateTaggedItem');
	});

	before(function () {
		return browser.OLSKPrompt(function () {
			return browser.click('.LCHLauncherPipeItem');
		}, function (dialog) {
			return Object.assign(dialog, {
				response: item,
			});
		});
	});

	context('create', function () {

		before(function () {
			return browser.pressButton(SNPCodeToggleFormButton);
		});

		it('binds OLSKTaxonomySuggestionItems', function () {
			browser.assert.text('.OLSKTaxonomySuggestion', item);
		});
	
	});

	context('select', function () {

		before(function () {
			browser.fill(SNPCodeFormField, Math.random().toString());
		});

		before(function () {
			return browser.pressButton(SNPCodeFormSubmitButton);
		});

		before(function () {
			return browser.click(SNPCodeListItem);
		});

		it('binds OLSKTaxonomySuggestionItems', function () {
			browser.assert.text('.OLSKTaxonomySuggestion', item);
		});
	
	});
	
});
