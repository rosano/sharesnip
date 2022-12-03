const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	SNPFormNote: '.SNPFormNote',
	
	SNPFormNoteField: '.SNPFormNoteField',
}).map(function (e) {
	return global[e.shift()] = e.pop();
});

describe('SNPFormNote_Access', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});

	it('shows SNPFormNote', function () {
		browser.assert.elements(SNPFormNote, 1);
	});

	it('shows SNPFormNoteField', function () {
		browser.assert.elements(SNPFormNoteField, 1);
	});

});
