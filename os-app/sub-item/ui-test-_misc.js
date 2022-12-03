const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('SNPCollectListItem_Misc', function () {

	const SNPDocumentName = Math.random().toString();

	const item = StubDocumentObjectValid({
		SNPDocumentName,
	});

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			SNPCollectListItemObject: JSON.stringify(item),
		});
	});

	describe('SNPCollectListItemTitle', function test_SNPCollectListItemTitle () {
		
		it('binds SNPDocumentName', function () {
			browser.assert.text(SNPCollectListItemTitle, require('OLSKString').OLSKStringSnippet(item.SNPDocumentName));
		});
	
	});

});
