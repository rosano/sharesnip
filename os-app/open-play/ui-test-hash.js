const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

const SNPPlayLogic = require('./ui-logic.js').default;
const OLSKObject = require('OLSKObject');

describe('SNPPlay_Hash', function () {

	describe('SNPPlayCaptureAnchor', function test_SNPPlayCaptureAnchor () {
		
		const OLSKRoutingHash = {
			[SNPPlayLogic.SNPPlayCaptureAnchor()]: uLink(Math.random().toString()),
			[SNPPlayLogic.SNPPlayNameAnchor()]: Math.random().toString(),
		};

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				OLSKRoutingHash,
			});
		});

		it('adds item', function () {
			browser.assert.elements(SNPPlayListItem, 1);
		});

		context('select', function () {

			before(function () {
				return browser.click(SNPPlayListItem);
			});

			it('binds SNPDocumentURL', function () {
				browser.assert.input(SNPPlayDetailMediaURLField, OLSKRoutingHash[SNPPlayLogic.SNPPlayCaptureAnchor()]);
			});

			it('binds SNPDocumentName', function () {
				browser.assert.input(SNPPlayDetailFormNameField, OLSKRoutingHash[SNPPlayLogic.SNPPlayNameAnchor()]);
			});
		
		});
	
	});

	describe('SNPPlayInboxAnchor', function test_SNPPlayInboxAnchor () {
		
		const items = Array.from(Array(Math.max(2, uRandomInt(10)))).map(function () {
			return StubDocumentObjectValid({
				SNPDocumentURL: uLink(),
				SNPDocumentName: Math.random().toString(),
			});
		});
		const OLSKRoutingHash = {
			[SNPPlayLogic.SNPPlayInboxAnchor()]: encodeURIComponent(JSON.stringify(items.map(function (e) {
				return OLSKObject.OLSKObjectRemap(e, SNPPlayLogic.SNPPlayRemap());
			}))),
		};
		const OLSKRoutingLanguage = uRandomElement(kDefaultRoute.OLSKRouteLanguageCodes);

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				OLSKRoutingHash,
				OLSKRoutingLanguage,
			});
		});

		it('adds items', function () {
			browser.assert.elements(SNPPlayListItem, items.length);
		});

		it('chunks', function () {
			browser.assert.text('.OLSKCollectionChunkHeading', OLSKTestingLocalized('SNPPlayChunkInboxText', OLSKRoutingLanguage));
		});

		context('select', function () {

			before(function () {
				return browser.click(SNPPlayListItem);
			});

			it('binds SNPDocumentURL', function () {
				browser.assert.input('.SNPPlayDetailMediaURLField', items[0].SNPDocumentURL);
			});

			it('binds SNPDocumentName', function () {
				browser.assert.input('.SNPPlayDetailFormNameField', items[0].SNPDocumentName);
			});
		
		});

		context('SNPPlayDetailDispatchQueue', function () {
			
			before(function () {
				return browser.pressButton('.SNPPlayDetailToolbarQueueButton');
			});

			it('adds item', function () {
				browser.assert.elements(SNPPlayListItem, items.length + 1);
			});

			context('select', function () {

				before(function () {
					return browser.click('.OLSKCollectionChunk:nth-child(2) .OLSKCollectionItem');
				});

				it('binds SNPDocumentURL', function () {
					browser.assert.input('.SNPPlayDetailMediaURLField', items[0].SNPDocumentURL);
				});

				it('binds SNPDocumentName', function () {
					browser.assert.input('.SNPPlayDetailFormNameField', items[0].SNPDocumentName);
				});
			
			});
		
		});

		context('SNPPlayClearInboxButton', function () {
			
			before(function () {
				return browser.pressButton(SNPPlayClearInboxButton);
			});

			it('clears hash', function () {
				browser.assert.deepEqual(browser.location.hash, '');
			});
		
		});
	
	});

});
