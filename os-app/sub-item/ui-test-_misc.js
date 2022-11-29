const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

const SNPPlayListItemLogic = require('./ui-logic.js').default;

describe('SNPPlayListItem_Misc', function () {

	const SNPDocumentName = uRandomElement(undefined, Array.from(Array(Math.max(2, uRandomInt(100)))).map(Math.random).toString());

	const item = StubDocumentObjectValid({
		SNPDocumentName,
		SNPDocumentURL: 'https://www.example.com/' + Math.random().toString(),
		SNPDocumentImageURL: 'https://www.example.com/' + Math.random().toString(),
		SNPDocumentNotes: Array.from(Array(Math.max(2, uRandomInt(100)))).map(Math.random).toString(),
		SNPDocumentTags: Array.from(Array(Math.max(2, uRandomInt(10)))).map(function () {
			return Math.random().toString();
		}),
	});

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			SNPPlayListItemObject: JSON.stringify(item),
		});
	});

	describe('SNPPlayListItem', function test_SNPPlayListItem () {

		it('classes OLSKCommonCard', function () {
			browser.assert.hasClass(SNPPlayListItem, 'OLSKCommonCard');
		});
		
	});

	describe('SNPPlayListItemImage', function test_SNPPlayListItemImage () {
		
		it('sets role', function () {
			browser.assert.attribute(SNPPlayListItemImage, 'role', 'presentation');
		});
		
		it('binds SNPDocumentImageURL', function () {
			browser.assert.attribute(SNPPlayListItemImage, 'src', item.SNPDocumentImageURL);
		});
	
	});

	describe('SNPPlayListItemTitle', function test_SNPPlayListItemTitle () {
		
		it('binds SNPDocumentName', function () {
			browser.assert.text(SNPPlayListItemTitle, require('OLSKString').OLSKStringSnippet(item.SNPDocumentName || SNPPlayListItemLogic.SNPPlayListItemHumanURL(item.SNPDocumentURL)));
		});
	
	});

	describe('SNPPlayListItemSnippet', function test_SNPPlayListItemSnippet () {
		
		it('binds SNPDocumentNotes', function () {
			browser.assert.text(SNPPlayListItemSnippet, require('OLSKString').OLSKStringSnippet(item.SNPDocumentNotes));
		});
	
	});

	describe('SNPPlayListItemTags', function test_SNPPlayListItemTags () {
		
		it('binds SNPDocumentTags', function () {
			browser.assert.text(SNPPlayListItemTags, item.SNPDocumentTags.join(', '));
		});
	
	});

	context('SNPDocumentArchiveDate', function () {
		
		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				SNPPlayListItemObject: JSON.stringify(StubDocumentObjectValid({
					SNPDocumentArchiveDate: new Date(),
				})),
			});
		});

		it('classes SNPPlayListItemArchived', function () {
			browser.assert.hasClass(SNPPlayListItem, 'SNPPlayListItemArchived');
		});
	
	});

});
