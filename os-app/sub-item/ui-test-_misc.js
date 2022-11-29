const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('SNPPlayListItem_Misc', function () {

	const SNPDocumentName = Math.random().toString();

	const item = StubDocumentObjectValid({
		SNPDocumentName,
	});

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			SNPPlayListItemObject: JSON.stringify(item),
		});
	});

	describe('SNPPlayListItemTitle', function test_SNPPlayListItemTitle () {
		
		it('binds SNPDocumentName', function () {
			browser.assert.text(SNPPlayListItemTitle, require('OLSKString').OLSKStringSnippet(item.SNPDocumentName));
		});
	
	});

});
