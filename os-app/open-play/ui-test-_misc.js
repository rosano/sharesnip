const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

const SNPPlayLogic = require('./ui-logic.js').default;
const OLSKObject = require('OLSKObject');

describe('SNPPlay_Misc', function () {

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

	describe('SNPPlay', function test_SNPPlay () {
		
		it('classes OLSKDecorFormBlend', function () {
			browser.assert.hasClass(SNPPlay, 'OLSKDecorFormBlend');
		});

	});

	describe('SNPPlayStashButton', function test_SNPPlayStashButton () {
		
		it('classes OLSKDecorButtonNoStyle', function () {
			browser.assert.hasClass(SNPPlayStashButton, 'OLSKDecorButtonNoStyle');
		});

		it('classes OLSKDecorTappable', function () {
			browser.assert.hasClass(SNPPlayStashButton, 'OLSKDecorTappable');
		});

		it('classes OLSKToolbarButton', function () {
			browser.assert.hasClass(SNPPlayStashButton, 'OLSKToolbarButton');
		});
		
	});

	describe('SNPPlayStashButtonImage', function test_SNPPlayStashButtonImage () {

		it('sets src', function () {
			browser.assert.elements(`${ SNPPlayStashButtonImage } #_OLSKSharedStash`, 1);
		});
	
	});

	describe('SNPPlayToggleFormButton', function test_SNPPlayToggleFormButton () {
		
		it('classes OLSKDecorButtonNoStyle', function () {
			browser.assert.hasClass(SNPPlayToggleFormButton, 'OLSKDecorButtonNoStyle');
		});

		it('classes OLSKDecorTappable', function () {
			browser.assert.hasClass(SNPPlayToggleFormButton, 'OLSKDecorTappable');
		});

		it('classes OLSKToolbarButton', function () {
			browser.assert.hasClass(SNPPlayToggleFormButton, 'OLSKToolbarButton');
		});
		
		it('sets accesskey', function () {
			browser.assert.attribute(SNPPlayToggleFormButton, 'accesskey', 'n');
		});
	
	});

	describe('SNPPlayToggleFormButtonImage', function test_SNPPlayToggleFormButtonImage () {

		it('sets src', function () {
			browser.assert.elements(`${ SNPPlayToggleFormButtonImage } #_OLSKSharedCreate`, 1);
		});
	
	});

	describe('SNPPlayForm', function test_SNPPlayForm () {

		before(function () {
			return browser.pressButton(SNPPlayToggleFormButton);
		});

		it('classes OLSKDecor', function () {
			browser.assert.hasClass(SNPPlayForm, 'OLSKDecor');
		});

		it('classes OLSKDecorBigForm', function () {
			browser.assert.hasClass(SNPPlayForm, 'OLSKDecorBigForm');
		});

		it('classes OLSKCommonEdgeBottom', function () {
			browser.assert.hasClass(SNPPlayForm, 'OLSKCommonEdgeBottom');
		});
	
	});

	describe('SNPPlayFormField', function test_SNPPlayFormField () {

		it('sets autofocus', function () {
			browser.assert.attribute(SNPPlayFormField, 'autofocus', '');
		});
	
	});

	describe('OLSKCollectionItem', function test_OLSKCollectionItem () {

		before(function () {
			browser.fill(SNPPlayFormField, Math.random().toString());
		});

		before(function () {
			return browser.pressButton(SNPPlayFormSubmitButton);
		});

		it('classes OLSKCommonEdgeBottom', function () {
			browser.assert.hasClass('.OLSKCollectionItem', 'OLSKCommonEdgeBottom');
		});
	
	});

	context('select', function test_select () {
		
		before(function () {
			return browser.click(SNPPlayListItem);
		});

		it('sets SNPPlayListItemSelected', function () {
			browser.assert.elements('.OLSKCollectionItemLocus', 1);
		});

		it('sets SNPPlayDetailItem', function () {
			browser.assert.elements('.SNPPlayDetail', 1);
		});

	});

	describe('SNPPlayViewportFooter', function test_SNPPlayViewportFooter () {

		it('classes OLSKMobileViewFooter', function () {
			browser.assert.hasClass(SNPPlayViewportFooter, 'OLSKMobileViewFooter');
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

	describe('SNPPlayCloudToolbar', function test_SNPPlayCloudToolbar () {

		before(function () {
			return browser.pressButton('.OLSKAppToolbarCloudButton');
		});

		it('classes OLSKToolbar', function () {
			browser.assert.hasClass(SNPPlayCloudToolbar, 'OLSKToolbar');
		});

		it('classes OLSKToolbarJustify', function () {
			browser.assert.hasClass(SNPPlayCloudToolbar, 'OLSKToolbarJustify');
		});
		
		it('classes OLSKCommonEdgeTop', function () {
			browser.assert.hasClass(SNPPlayCloudToolbar, 'OLSKCommonEdgeTop');
		});
	
	});

	context('SNPPlayClearInboxButton', function test_SNPPlayClearInboxButton () {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				OLSKRoutingHash: {
					[SNPPlayLogic.SNPPlayInboxAnchor()]: encodeURIComponent(JSON.stringify([OLSKObject.OLSKObjectRemap(StubDocumentObjectValid({
						SNPDocumentURL: Math.random().toString(),
					}), SNPPlayLogic.SNPPlayRemap())])),
				},
			});
		});

		it('classes OLSKDecorPress', function () {
			browser.assert.hasClass(SNPPlayClearInboxButton, 'OLSKDecorPress');
		});

	});

});
