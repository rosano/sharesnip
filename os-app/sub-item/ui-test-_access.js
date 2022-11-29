const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	SNPPlayListItem: '.SNPPlayListItem',

	SNPPlayListItemImage: '.SNPPlayListItemImage',

	SNPPlayListItemTitle: '.SNPPlayListItemTitle',

	SNPPlayListItemSnippet: '.SNPPlayListItemSnippet',

	SNPPlayListItemTags: '.SNPPlayListItemTags',
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

	it('hides SNPPlayListItemImage', function () {
		browser.assert.elements(SNPPlayListItemImage, 0);
	});

	it('shows SNPPlayListItemTitle', function () {
		browser.assert.elements(SNPPlayListItemTitle, 1);
	});

	it('shows SNPPlayListItemSnippet', function () {
		browser.assert.elements(SNPPlayListItemSnippet, 1);
	});

	it('shows SNPPlayListItemTags', function () {
		browser.assert.elements(SNPPlayListItemTags, 1);
	});

	context('SNPDocumentImageURL', function () {
		
		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				SNPPlayListItemObject: JSON.stringify(StubDocumentObjectValid({
					SNPDocumentImageURL: Math.random().toString(),
				})),
			});
		});

		it('shows SNPPlayListItemImage', function () {
			browser.assert.elements(SNPPlayListItemImage, 1);
		});
	
	});

});
