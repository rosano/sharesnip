const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

const SNPCodeLogic = require('./ui-logic.js').default;
const OLSKObject = require('OLSKObject');

describe('SNPCode_Misc', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});
	
	it('sets meta:viewport', function () {
		browser.assert.attribute('meta[name=viewport]', 'content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0');
	});
	
	it('sets meta:mobile-web-app-capable', function () {
		browser.assert.attribute('meta[name=mobile-web-app-capable]', 'content', 'yes');
	});
	
	it('sets meta:apple-mobile-web-app-capable', function () {
		browser.assert.attribute('meta[name=apple-mobile-web-app-capable]', 'content', 'yes');
	});

	it('sets manifest', function () {
		browser.assert.attribute('link[rel="manifest"]', 'href', require('../tech-manifest/controller.js').OLSKControllerRoutes().shift().OLSKRoutePath);
	});

	describe('SNPCode', function test_SNPCode () {
		
		it('classes OLSKDecorFormBlend', function () {
			browser.assert.hasClass(SNPCode, 'OLSKDecorFormBlend');
		});

	});

	describe('SNPCodeStashButton', function test_SNPCodeStashButton () {
		
		it('classes OLSKDecorButtonNoStyle', function () {
			browser.assert.hasClass(SNPCodeStashButton, 'OLSKDecorButtonNoStyle');
		});

		it('classes OLSKDecorTappable', function () {
			browser.assert.hasClass(SNPCodeStashButton, 'OLSKDecorTappable');
		});

		it('classes OLSKToolbarButton', function () {
			browser.assert.hasClass(SNPCodeStashButton, 'OLSKToolbarButton');
		});
		
	});

	describe('SNPCodeStashButtonImage', function test_SNPCodeStashButtonImage () {

		it('sets src', function () {
			browser.assert.elements(`${ SNPCodeStashButtonImage } #_OLSKSharedStash`, 1);
		});
	
	});

	describe('SNPCodeToggleFormButton', function test_SNPCodeToggleFormButton () {
		
		it('classes OLSKDecorButtonNoStyle', function () {
			browser.assert.hasClass(SNPCodeToggleFormButton, 'OLSKDecorButtonNoStyle');
		});

		it('classes OLSKDecorTappable', function () {
			browser.assert.hasClass(SNPCodeToggleFormButton, 'OLSKDecorTappable');
		});

		it('classes OLSKToolbarButton', function () {
			browser.assert.hasClass(SNPCodeToggleFormButton, 'OLSKToolbarButton');
		});
		
		it('sets accesskey', function () {
			browser.assert.attribute(SNPCodeToggleFormButton, 'accesskey', 'n');
		});
	
	});

	describe('SNPCodeToggleFormButtonImage', function test_SNPCodeToggleFormButtonImage () {

		it('sets src', function () {
			browser.assert.elements(`${ SNPCodeToggleFormButtonImage } #_OLSKSharedCreate`, 1);
		});
	
	});

	describe('SNPCodeForm', function test_SNPCodeForm () {

		before(function () {
			return browser.pressButton(SNPCodeToggleFormButton);
		});

		it('classes OLSKDecor', function () {
			browser.assert.hasClass(SNPCodeForm, 'OLSKDecor');
		});

		it('classes OLSKDecorBigForm', function () {
			browser.assert.hasClass(SNPCodeForm, 'OLSKDecorBigForm');
		});

		it('classes OLSKCommonEdgeBottom', function () {
			browser.assert.hasClass(SNPCodeForm, 'OLSKCommonEdgeBottom');
		});
	
	});

	describe('SNPCodeFormField', function test_SNPCodeFormField () {

		it('sets autofocus', function () {
			browser.assert.attribute(SNPCodeFormField, 'autofocus', '');
		});
	
	});

	describe('OLSKCollectionItem', function test_OLSKCollectionItem () {

		before(function () {
			browser.fill(SNPCodeFormField, Math.random().toString());
		});

		before(function () {
			return browser.pressButton(SNPCodeFormSubmitButton);
		});

		it('classes OLSKCommonEdgeBottom', function () {
			browser.assert.hasClass('.OLSKCollectionItem', 'OLSKCommonEdgeBottom');
		});
	
	});

	context('select', function test_select () {
		
		before(function () {
			return browser.click(SNPCodeListItem);
		});

		it('sets SNPCodeListItemSelected', function () {
			browser.assert.elements('.OLSKCollectionItemLocus', 1);
		});

		it('sets SNPCodeDetailItem', function () {
			browser.assert.elements('.SNPCodeDetail', 1);
		});

	});

	describe('SNPCodeViewportFooter', function test_SNPCodeViewportFooter () {

		it('classes OLSKMobileViewFooter', function () {
			browser.assert.hasClass(SNPCodeViewportFooter, 'OLSKMobileViewFooter');
		});

	});

	describe('OLSKApropos', function test_OLSKApropos() {

		before(function () {
			return browser.pressButton('.OLSKAppToolbarAproposButton');
		});

		it('sets OLSKAproposFeedbackValue', function () {
			browser.assert.attribute('.OLSKAproposFeedbackButton', 'href', `javascript:window.location.href = window.atob('${ browser.window.btoa('mailto:' + OLSKTestingFormatted(process.env.OLSK_APROPOS_FEEDBACK_EMAIL, process.env.ROCO_SHARED_PROJECT_ID)) }')`);
		});

		after(function () {
			browser.pressButton('.OLSKModalViewCloseButton');
		});

	});

	describe('OLSKAppToolbarGuideLink', function test_OLSKAppToolbarGuideLink() {

		it('binds OLSKAppToolbarGuideURL', function () {
			browser.assert.attribute('.OLSKAppToolbarGuideLink', 'href', OLSKTestingCanonical(require('../open-guide/controller.js').OLSKControllerRoutes().shift()));
		});

	});

	describe('SNPCodeCloudToolbar', function test_SNPCodeCloudToolbar () {

		before(function () {
			return browser.pressButton('.OLSKAppToolbarCloudButton');
		});

		it('classes OLSKToolbar', function () {
			browser.assert.hasClass(SNPCodeCloudToolbar, 'OLSKToolbar');
		});

		it('classes OLSKToolbarJustify', function () {
			browser.assert.hasClass(SNPCodeCloudToolbar, 'OLSKToolbarJustify');
		});
		
		it('classes OLSKCommonEdgeTop', function () {
			browser.assert.hasClass(SNPCodeCloudToolbar, 'OLSKCommonEdgeTop');
		});
	
	});

	context('SNPCodeClearInboxButton', function test_SNPCodeClearInboxButton () {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				OLSKRoutingHash: {
					[SNPCodeLogic.SNPCodeInboxAnchor()]: encodeURIComponent(JSON.stringify([OLSKObject.OLSKObjectRemap(StubDocumentObjectValid({
						SNPDocumentURL: Math.random().toString(),
					}), SNPCodeLogic.SNPCodeRemap())])),
				},
			});
		});

		it('classes OLSKDecorPress', function () {
			browser.assert.hasClass(SNPCodeClearInboxButton, 'OLSKDecorPress');
		});

	});

});
