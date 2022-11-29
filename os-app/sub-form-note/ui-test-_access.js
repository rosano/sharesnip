const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	SNPCodeFormNote: '.SNPCodeFormNote',
	
	SNPCodeFormNoteField: '.SNPCodeFormNoteField',
}).map(function (e) {
	return global[e.shift()] = e.pop();
});

describe('SNPCodeFormNote_Access', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});

	it('shows SNPCodeFormNote', function () {
		browser.assert.elements(SNPCodeFormNote, 1);
	});

	it('shows SNPCodeFormNoteField', function () {
		browser.assert.elements(SNPCodeFormNoteField, 1);
	});

});
