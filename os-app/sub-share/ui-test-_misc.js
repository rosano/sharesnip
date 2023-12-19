const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

const SNPCollectLogic = require('../open-collect/ui-logic.js').default;
const OLSKObject = require('OLSKObject');

describe('SNPCollectShare_Misc', function () {

	const items = [StubDocumentObjectValid(), StubDocumentObjectValid()];

	const uValue = async function (inputData) {
		return await browser.evaluate('window.location.origin') + require('../open-collect/controller.js').OLSKControllerRoutes().shift().OLSKRoutePath + '/#';
	};

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			SNPCollectShareItems: JSON.stringify(items),
		});
	});

	describe('SNPCollectShareLinkField', function test_SNPCollectShareLinkField () {

		it('sets type', function () {
			browser.assert.attribute(SNPCollectShareLinkField, 'type', 'text');
		});
		
		it('sets onClick', function () {
			browser.assert.attribute(SNPCollectShareLinkField, 'onClick', 'this.select()');
		});

		it('sets value', async function () {
			browser.assert.input(SNPCollectShareLinkField, await uValue(items));
		});
		
	});

	describe('SNPCollectShareCopyButton', function test_SNPCollectShareCopyButton () {

		it('sets data-clipboard-target', function () {
			browser.assert.attribute(SNPCollectShareCopyButton, 'data-clipboard-target', '.SNPCollectShareLinkField');
		});
		
	});

});
