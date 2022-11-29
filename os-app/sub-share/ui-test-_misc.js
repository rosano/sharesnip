const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

const SNPPlayLogic = require('../open-play/ui-logic.js').default;
const OLSKHash = require('OLSKHash');
const OLSKObject = require('OLSKObject');

describe('SNPPlayShare_Misc', function () {

	const items = [StubDocumentObjectValid(), StubDocumentObjectValid()];

	const uValue = function (inputData) {
		return browser.window.location.origin + require('../open-play/controller.js').OLSKControllerRoutes().shift().OLSKRoutePath + '/#' + OLSKHash.OLSKHashString({
			[SNPPlayLogic.SNPPlayInboxAnchor()]: encodeURIComponent(JSON.stringify(inputData.map(function (e) {
				return OLSKObject.OLSKObjectRemap(e, SNPPlayLogic.SNPPlayRemap(e));
			}))),
		});
	};

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			SNPPlayShareItems: JSON.stringify(items),
		});
	});

	describe('SNPPlayShareLinkField', function test_SNPPlayShareLinkField () {

		it('sets type', function () {
			browser.assert.attribute(SNPPlayShareLinkField, 'type', 'text');
		});
		
		it('sets onClick', function () {
			browser.assert.attribute(SNPPlayShareLinkField, 'onClick', 'this.select()');
		});

		it('sets value', function () {
			browser.assert.input(SNPPlayShareLinkField, uValue(items));
		});

		context('reorder', function () {
			
			before(function () {
				return browser.pressButton('.down');
			});

			it('sets value', function () {
				browser.assert.input(SNPPlayShareLinkField, uValue(items.reverse()));
			});
		
		});
		
	});

	describe('SNPPlayShareCopyButton', function test_SNPPlayShareCopyButton () {

		it('sets data-clipboard-target', function () {
			browser.assert.attribute(SNPPlayShareCopyButton, 'data-clipboard-target', '.SNPPlayShareLinkField');
		});
		
	});

});
