const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	SNPMake: '.SNPMake',
	
	SNPMakeTypes: '.SNPMakeTypes',
	SNPMakeTypesLinkButton: '.SNPMakeTypesLinkButton',
	SNPMakeTypesNoteButton: '.SNPMakeTypesNoteButton',
	SNPMakeTypesPhoneButton: '.SNPMakeTypesPhoneButton',
	
	SNPMakeDataNotValid: '.SNPMakeDataNotValid',
	SNPMakeDataValid: '.SNPMakeDataValid',
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

	it('shows SNPMakeTypesPhoneButton', function () {
		browser.assert.elements(SNPMakeTypesPhoneButton, 1);
	});

	it('shows SNPFormBase', function () {
		browser.assert.elements('.SNPFormBase', 1);
	});

	it('shows SNPFormLink', function () {
		browser.assert.elements('.SNPFormLink', 1);
	});

	it('shows SNPMakeDataNotValid', function () {
		browser.assert.elements(SNPMakeDataNotValid, 1);
	});

	it('hides SNPMakeDataValid', function () {
		browser.assert.elements(SNPMakeDataValid, 0);
	});

	context('SNPMakeTypesNoteButton', function () {
		
		before(function () {
			return browser.pressButton(SNPMakeTypesNoteButton);
		});

		it('hides SNPFormLink', function () {
			browser.assert.elements('.SNPFormLink', 0);
		});

		it('shows SNPFormNote', function () {
			browser.assert.elements('.SNPFormNote', 1);
		});
	
	});

	context('SNPMakeTypesPhoneButton', function () {
		
		before(function () {
			return browser.pressButton(SNPMakeTypesPhoneButton);
		});

		it('hides SNPFormNote', function () {
			browser.assert.elements('.SNPFormNote', 0);
		});

		it('shows SNPFormPhone', function () {
			browser.assert.elements('.SNPFormPhone', 1);
		});
	
	});

	context('valid', function () {

		before(function () {
			return browser.pressButton(SNPMakeTypesNoteButton);
		});

		before(function () {
			return browser.fill('.SNPFormNoteField', Math.random().toString());
		});

		it('hides SNPMakeDataNotValid', function () {
			browser.assert.elements(SNPMakeDataNotValid, 0);
		});
		
		it('shows SNPMakeDataValid', function () {
			browser.assert.elements(SNPMakeDataValid, 1);
		});
	
	});

	context('not valid', function () {

		before(function () {
			return browser.fill('.SNPFormNoteField', '');
		});

		it('shows SNPMakeDataNotValid', function () {
			browser.assert.elements(SNPMakeDataNotValid, 1);
		});

		it('hides SNPMakeDataValid', function () {
			browser.assert.elements(SNPMakeDataValid, 0);
		});
	
	});

});
