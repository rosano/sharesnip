const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

const SNPCollectLogic = require('./ui-logic.js').default;
const OLSKObject = require('OLSKObject');

describe('SNPCollect_Misc', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});
	
	it('sets meta:viewport', function () {
		browser.assert.attribute('meta[name=viewport]', 'content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0');
	});
	
	it('sets manifest', function () {
		browser.assert.attribute('link[rel="manifest"]', 'href', require('../tech-manifest/controller.js').OLSKControllerRoutes().shift().OLSKRoutePath);
	});

	describe('SNPCollect', function test_SNPCollect () {
		
		it('classes OLSKDecorFormBlend', function () {
			browser.assert.hasClass(SNPCollect, 'OLSKDecorFormBlend');
		});

	});

	describe('SNPCollectToggleFormButton', function test_SNPCollectToggleFormButton () {
		
		it('classes OLSKDecorButtonNoStyle', function () {
			browser.assert.hasClass(SNPCollectToggleFormButton, 'OLSKDecorButtonNoStyle');
		});

		it('classes OLSKDecorTappable', function () {
			browser.assert.hasClass(SNPCollectToggleFormButton, 'OLSKDecorTappable');
		});

		it('classes OLSKToolbarButton', function () {
			browser.assert.hasClass(SNPCollectToggleFormButton, 'OLSKToolbarButton');
		});
		
		it('sets accesskey', function () {
			browser.assert.attribute(SNPCollectToggleFormButton, 'accesskey', 'n');
		});
	
	});

	describe('SNPCollectToggleFormButtonImage', function test_SNPCollectToggleFormButtonImage () {

		it('sets src', function () {
			browser.assert.elements(`${ SNPCollectToggleFormButtonImage } #_OLSKSharedCreate`, 1);
		});
	
	});

	describe('OLSKCollectionItem', function test_OLSKCollectionItem () {

		before(function () {
			return uCreateDocument();
		});

		it('classes OLSKCommonEdgeBottom', function () {
			browser.assert.hasClass('.OLSKCollectionItem', 'OLSKCommonEdgeBottom');
		});
	
	});

	context('select', function test_select () {
		
		before(function () {
			return browser.click(SNPCollectListItem);
		});

		it('sets SNPCollectListItemSelected', function () {
			browser.assert.elements('.OLSKCollectionItemLocus', 1);
		});

		it('sets SNPCollectDetailItem', function () {
			browser.assert.elements('.SNPCollectDetail', 1);
		});

	});

	context('clone', function test_clone () {

		before(function () {
			return browser.fill('.SNPCollectDetailFormNameField', 'alfa');
		});

		before(function () {
			return browser.pressButton('.SNPCollectDetailToolbarCloneButton');
		});

		it('creates item', function () {
			browser.assert.elements('.SNPCollectListItem', 2);
		});

		it('copies properties from previous item', function () {
			browser.assert.text('.SNPCollectListItem', 'alfaalfa');
		});

	});

	describe('SNPCollectViewportFooter', function test_SNPCollectViewportFooter () {

		it('classes OLSKMobileViewFooter', function () {
			browser.assert.hasClass(SNPCollectViewportFooter, 'OLSKMobileViewFooter');
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

	describe('SNPCollectCloudToolbar', function test_SNPCollectCloudToolbar () {

		before(function () {
			return browser.pressButton('.OLSKAppToolbarCloudButton');
		});

		it('classes OLSKToolbar', function () {
			browser.assert.hasClass(SNPCollectCloudToolbar, 'OLSKToolbar');
		});

		it('classes OLSKToolbarJustify', function () {
			browser.assert.hasClass(SNPCollectCloudToolbar, 'OLSKToolbarJustify');
		});
		
		it('classes OLSKCommonEdgeTop', function () {
			browser.assert.hasClass(SNPCollectCloudToolbar, 'OLSKCommonEdgeTop');
		});
	
	});

});
