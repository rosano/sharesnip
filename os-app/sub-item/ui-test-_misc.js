const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('SNPCodeListItem_Misc', function () {

	const SNPDocumentName = Math.random().toString();

	const item = StubDocumentObjectValid({
		SNPDocumentName,
	});

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			SNPCodeListItemObject: JSON.stringify(item),
		});
	});

	describe('SNPCodeListItemTitle', function test_SNPCodeListItemTitle () {
		
		it('binds SNPDocumentName', function () {
			browser.assert.text(SNPCodeListItemTitle, require('OLSKString').OLSKStringSnippet(item.SNPDocumentName));
		});
	
	});

});
