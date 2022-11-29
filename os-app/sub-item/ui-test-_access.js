const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	SNPPlayListItem: '.SNPPlayListItem',

	SNPPlayListItemTitle: '.SNPPlayListItemTitle',
}).map(function (e) {
	return global[e.shift()] = e.pop();
});

describe('SNPPlayListItem_Access', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			SNPPlayListItemObject: JSON.stringify(StubDocumentObjectValid()),
		});
	});

	it('shows SNPPlayListItem', function () {
		browser.assert.elements(SNPPlayListItem, 1);
	});

	it('shows SNPPlayListItemTitle', function () {
		browser.assert.elements(SNPPlayListItemTitle, 1);
	});

});
