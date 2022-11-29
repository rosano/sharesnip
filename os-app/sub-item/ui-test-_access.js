const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	SNPCodeListItem: '.SNPCodeListItem',

	SNPCodeListItemTitle: '.SNPCodeListItemTitle',
}).map(function (e) {
	return global[e.shift()] = e.pop();
});

describe('SNPCodeListItem_Access', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			SNPCodeListItemObject: JSON.stringify(StubDocumentObjectValid()),
		});
	});

	it('shows SNPCodeListItem', function () {
		browser.assert.elements(SNPCodeListItem, 1);
	});

	it('shows SNPCodeListItemTitle', function () {
		browser.assert.elements(SNPCodeListItemTitle, 1);
	});

});
