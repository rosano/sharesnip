const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

const SNPCodeLogic = require('../open-code/ui-logic.js').default;
const OLSKHash = require('OLSKHash');
const OLSKObject = require('OLSKObject');

describe('SNPCodeShare_Misc', function () {

	const items = [StubDocumentObjectValid(), StubDocumentObjectValid()];

	const uValue = function (inputData) {
		return browser.window.location.origin + require('../open-code/controller.js').OLSKControllerRoutes().shift().OLSKRoutePath + '/#' + OLSKHash.OLSKHashString({
			[SNPCodeLogic.SNPCodeInboxAnchor()]: encodeURIComponent(JSON.stringify(inputData.map(function (e) {
				return OLSKObject.OLSKObjectRemap(e, SNPCodeLogic.SNPCodeRemap(e));
			}))),
		});
	};

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			SNPCodeShareItems: JSON.stringify(items),
		});
	});

	describe('SNPCodeShareLinkField', function test_SNPCodeShareLinkField () {

		it('sets type', function () {
			browser.assert.attribute(SNPCodeShareLinkField, 'type', 'text');
		});
		
		it('sets onClick', function () {
			browser.assert.attribute(SNPCodeShareLinkField, 'onClick', 'this.select()');
		});

		it('sets value', function () {
			browser.assert.input(SNPCodeShareLinkField, uValue(items));
		});

		context('reorder', function () {
			
			before(function () {
				return browser.pressButton('.down');
			});

			it('sets value', function () {
				browser.assert.input(SNPCodeShareLinkField, uValue(items.reverse()));
			});
		
		});
		
	});

	describe('SNPCodeShareCopyButton', function test_SNPCodeShareCopyButton () {

		it('sets data-clipboard-target', function () {
			browser.assert.attribute(SNPCodeShareCopyButton, 'data-clipboard-target', '.SNPCodeShareLinkField');
		});
		
	});

});
