const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

const SNPCodeLogic = require('./ui-logic.js').default;
const OLSKObject = require('OLSKObject');

describe('SNPCode_Hash', function () {

	describe('SNPCodeCaptureAnchor', function test_SNPCodeCaptureAnchor () {
		
		const OLSKRoutingHash = {
			[SNPCodeLogic.SNPCodeCaptureAnchor()]: uLink(Math.random().toString()),
			[SNPCodeLogic.SNPCodeNameAnchor()]: Math.random().toString(),
		};

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				OLSKRoutingHash,
			});
		});

		it('adds item', function () {
			browser.assert.elements(SNPCodeListItem, 1);
		});

		context('select', function () {

			before(function () {
				return browser.click(SNPCodeListItem);
			});

			it('binds SNPDocumentURL', function () {
				browser.assert.input(SNPCodeDetailMediaURLField, OLSKRoutingHash[SNPCodeLogic.SNPCodeCaptureAnchor()]);
			});

			it('binds SNPDocumentName', function () {
				browser.assert.input(SNPCodeDetailFormNameField, OLSKRoutingHash[SNPCodeLogic.SNPCodeNameAnchor()]);
			});
		
		});
	
	});

	describe('SNPCodeInboxAnchor', function test_SNPCodeInboxAnchor () {
		
		const items = Array.from(Array(Math.max(2, uRandomInt(10)))).map(function () {
			return StubDocumentObjectValid({
				SNPDocumentURL: uLink(),
				SNPDocumentName: Math.random().toString(),
			});
		});
		const OLSKRoutingHash = {
			[SNPCodeLogic.SNPCodeInboxAnchor()]: encodeURIComponent(JSON.stringify(items.map(function (e) {
				return OLSKObject.OLSKObjectRemap(e, SNPCodeLogic.SNPCodeRemap());
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
			browser.assert.elements(SNPCodeListItem, items.length);
		});

		it('chunks', function () {
			browser.assert.text('.OLSKCollectionChunkHeading', OLSKTestingLocalized('SNPCodeChunkInboxText', OLSKRoutingLanguage));
		});

		context('select', function () {

			before(function () {
				return browser.click(SNPCodeListItem);
			});

			it('binds SNPDocumentURL', function () {
				browser.assert.input('.SNPCodeDetailMediaURLField', items[0].SNPDocumentURL);
			});

			it('binds SNPDocumentName', function () {
				browser.assert.input('.SNPCodeDetailFormNameField', items[0].SNPDocumentName);
			});
		
		});

		context('SNPCodeDetailDispatchQueue', function () {
			
			before(function () {
				return browser.pressButton('.SNPCodeDetailToolbarQueueButton');
			});

			it('adds item', function () {
				browser.assert.elements(SNPCodeListItem, items.length + 1);
			});

			context('select', function () {

				before(function () {
					return browser.click('.OLSKCollectionChunk:nth-child(2) .OLSKCollectionItem');
				});

				it('binds SNPDocumentURL', function () {
					browser.assert.input('.SNPCodeDetailMediaURLField', items[0].SNPDocumentURL);
				});

				it('binds SNPDocumentName', function () {
					browser.assert.input('.SNPCodeDetailFormNameField', items[0].SNPDocumentName);
				});
			
			});
		
		});

		context('SNPCodeClearInboxButton', function () {
			
			before(function () {
				return browser.pressButton(SNPCodeClearInboxButton);
			});

			it('clears hash', function () {
				browser.assert.deepEqual(browser.location.hash, '');
			});
		
		});
	
	});

});
