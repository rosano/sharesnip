const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	SNPCodeMake: '.SNPCodeMake',
	
	SNPCodeMakeTypes: '.SNPCodeMakeTypes',
	SNPCodeMakeTypesLinkButton: '.SNPCodeMakeTypesLinkButton',
	SNPCodeMakeTypesNoteButton: '.SNPCodeMakeTypesNoteButton',
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

	it('shows SNPCodeMakeTypes', function () {
		browser.assert.elements(SNPCodeMakeTypes, 1);
	});

	it('shows SNPCodeMakeTypesLinkButton', function () {
		browser.assert.elements(SNPCodeMakeTypesLinkButton, 1);
	});

	it('shows SNPCodeMakeTypesNoteButton', function () {
		browser.assert.elements(SNPCodeMakeTypesNoteButton, 1);
	});

	it('shows SNPCodeFormBase', function () {
		browser.assert.elements('.SNPCodeFormBase', 1);
	});

	it('shows SNPCodeFormLink', function () {
		browser.assert.elements('.SNPCodeFormLink', 1);
	});

	context('SNPCodeMakeTypesNoteButton', function () {
		
		before(function () {
			return browser.pressButton(SNPCodeMakeTypesNoteButton);
		});

		it('hides SNPCodeFormLink', function () {
			browser.assert.elements('.SNPCodeFormLink', 0);
		});

		it('shows SNPCodeFormNote', function () {
			browser.assert.elements('.SNPCodeFormNote', 1);
		});
	
	});

});
