const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	SNPCodeMake: '.SNPCodeMake',
	
	SNPCodeMakeHeading: '.SNPCodeMakeHeading',

	SNPCodeMakeNoteButton: '.SNPCodeMakeNoteButton',
	SNPCodeMakeLinkButton: '.SNPCodeMakeLinkButton',
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

	it('shows SNPCodeMakeNoteButton', function () {
		browser.assert.elements(SNPCodeMakeNoteButton, 1);
	});

	it('shows SNPCodeMakeLinkButton', function () {
		browser.assert.elements(SNPCodeMakeLinkButton, 1);
	});

});
