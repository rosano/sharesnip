const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	SNPCodeMake: '.SNPCodeMake',
	
	SNPCodeMakeHeading: '.SNPCodeMakeHeading',

	SNPCodeMakeTypes: '.SNPCodeMakeTypes',
	SNPCodeMakeTypesNoteButton: '.SNPCodeMakeTypesNoteButton',
	SNPCodeMakeTypesLinkButton: '.SNPCodeMakeTypesLinkButton',

	SNPCodeMakeChangeButton: '.SNPCodeMakeChangeButton',
}).map(function (e) {
	return global[e.shift()] = e.pop();
});

describe('SNPCodeMake_Access', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});

	it('shows SNPCodeMake', function () {
		browser.assert.elements(SNPCodeMake, 1);
	});

	it('shows SNPCodeMakeHeading', function () {
		browser.assert.elements(SNPCodeMakeHeading, 1);
	});

	it('shows SNPCodeMakeTypes', function () {
		browser.assert.elements(SNPCodeMakeTypes, 1);
	});

	it('shows SNPCodeMakeTypesNoteButton', function () {
		browser.assert.elements(SNPCodeMakeTypesNoteButton, 1);
	});

	it('shows SNPCodeMakeTypesLinkButton', function () {
		browser.assert.elements(SNPCodeMakeTypesLinkButton, 1);
	});

	it('hides SNPCodeMakeChangeButton', function () {
		browser.assert.elements(SNPCodeMakeChangeButton, 0);
	});

	it('hides SNPCodeFormBase', function () {
		browser.assert.elements('.SNPCodeFormBase', 0);
	});

	context('option', function () {
		
		before(function () {
			return browser.pressButton(SNPCodeMakeTypesNoteButton);
		});

		it('hides SNPCodeMakeTypes', function () {
			browser.assert.elements(SNPCodeMakeTypes, 0);
		});

		it('shows SNPCodeMakeChangeButton', function () {
			browser.assert.elements(SNPCodeMakeChangeButton, 1);
		});

		it('shows SNPCodeFormBase', function () {
			browser.assert.elements('.SNPCodeFormBase', 1);
		});

		context('change', function () {
			
			before(function () {
				return browser.pressButton(SNPCodeMakeChangeButton);
			});

			it('shows SNPCodeMakeTypes', function () {
				browser.assert.elements(SNPCodeMakeTypes, 1);
			});

			it('hides SNPCodeMakeChangeButton', function () {
				browser.assert.elements(SNPCodeMakeChangeButton, 0);
			});

			it('hides SNPCodeFormBase', function () {
				browser.assert.elements('.SNPCodeFormBase', 0);
			});
		
		});
	
	});

});
