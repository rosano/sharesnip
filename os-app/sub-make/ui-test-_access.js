const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	SNPMake: '.SNPMake',
	
	SNPMakeTypes: '.SNPMakeTypes',
	SNPMakeTypesLinkButton: '.SNPMakeTypesLinkButton',
	SNPMakeTypesNoteButton: '.SNPMakeTypesNoteButton',
	
	SNPMakeCodeNotValid: '.SNPMakeCodeNotValid',
	SNPMakeCodeValid: '.SNPMakeCodeValid',
}).map(function (e) {
	return global[e.shift()] = e.pop();
});

describe('SNPMake_Access', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});

	it('shows SNPMake', function () {
		browser.assert.elements(SNPMake, 1);
	});

	it('shows SNPMakeTypes', function () {
		browser.assert.elements(SNPMakeTypes, 1);
	});

	it('shows SNPMakeTypesLinkButton', function () {
		browser.assert.elements(SNPMakeTypesLinkButton, 1);
	});

	it('shows SNPMakeTypesNoteButton', function () {
		browser.assert.elements(SNPMakeTypesNoteButton, 1);
	});

	it('shows SNPFormBase', function () {
		browser.assert.elements('.SNPFormBase', 1);
	});

	it('shows SNPCodeFormLink', function () {
		browser.assert.elements('.SNPCodeFormLink', 1);
	});

	it('shows SNPMakeCodeNotValid', function () {
		browser.assert.elements(SNPMakeCodeNotValid, 1);
	});

	it('hides SNPMakeCodeValid', function () {
		browser.assert.elements(SNPMakeCodeValid, 0);
	});

	context('SNPMakeTypesNoteButton', function () {
		
		before(function () {
			return browser.pressButton(SNPMakeTypesNoteButton);
		});

		it('hides SNPCodeFormLink', function () {
			browser.assert.elements('.SNPCodeFormLink', 0);
		});

		it('shows SNPCodeFormNote', function () {
			browser.assert.elements('.SNPCodeFormNote', 1);
		});
	
	});

	context('valid', function () {

		before(function () {
			return browser.fill('.SNPCodeFormNoteField', Math.random().toString());
		});

		it('hides SNPMakeCodeNotValid', function () {
			browser.assert.elements(SNPMakeCodeNotValid, 0);
		});
		
		it('shows SNPMakeCodeValid', function () {
			browser.assert.elements(SNPMakeCodeValid, 1);
		});
	
	});

	context('not valid', function () {

		before(function () {
			return browser.fill('.SNPCodeFormNoteField', '');
		});

		it('shows SNPMakeCodeNotValid', function () {
			browser.assert.elements(SNPMakeCodeNotValid, 1);
		});

		it('hides SNPMakeCodeValid', function () {
			browser.assert.elements(SNPMakeCodeValid, 0);
		});
	
	});

});
