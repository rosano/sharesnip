const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	SNPCollectListItem: '.SNPCollectListItem',

	SNPCollectListItemTitle: '.SNPCollectListItemTitle',
}).map(function (e) {
	return global[e.shift()] = e.pop();
});

describe('SNPCollectListItem_Access', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			SNPCollectListItemObject: JSON.stringify(StubDocumentObjectValid()),
		});
	});

	it('shows SNPCollectListItem', function () {
		browser.assert.elements(SNPCollectListItem, 1);
	});

	it('shows SNPCollectListItemTitle', function () {
		browser.assert.elements(SNPCollectListItemTitle, 1);
	});

});
