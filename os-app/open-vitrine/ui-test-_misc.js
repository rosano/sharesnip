const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('SNPVitrine_Misc', function () {

	before(function () {
		return browser.visit(kDefaultRoute.OLSKRoutePath);
	});

	it('sets manifest', function () {
		browser.assert.attribute('link[rel="manifest"]', 'href', require('../tech-manifest/controller.js').OLSKControllerRoutes().shift().OLSKRoutePath);
	});

	describe('SNPVitrine', function () {
		
		it('classes OLSKDecor', function () {
			browser.assert.hasClass(SNPVitrine, 'OLSKDecor');
		});

		it('classes OLSKDecorCapped', function () {
			browser.assert.hasClass(SNPVitrine, 'OLSKDecorCapped');
		});

		it('classes OLSKDecorNoTopPad', function () {
			browser.assert.hasClass(SNPVitrine, 'OLSKDecorNoTopPad');
		});
	
	});

	describe('OLSKCrown', function test_OLSKCrown () {

		it('sets OLSKCrownCardImageURL', function () {
			browser.assert.attribute('.OLSKCrownCardImage', 'src', '/_shared/SNPRootLink/ui-assets/identity.svg');
		});
	
	});

	describe('OLSKLanding', function test_OLSKLanding () {

		it('localizes OLSKLandingActionHref', function () {
			browser.assert.attribute('.OLSKLandingAction', 'href', OLSKTestingCanonical(require('../open-generate/controller.js').OLSKControllerRoutes().shift()));
		});
	
	});

	describe('SNPVitrineVideo', function () {

		it('sets src', function () {
			browser.assert.attribute(SNPVitrineVideo, 'src', process.env.SNP_VITRINE_VIDEO_URL);
		});

		it('sets allowfullscreen', function () {
			browser.assert.attribute(SNPVitrineVideo, 'allowfullscreen', '');
		});

	});

	describe('OLSKAppFeaturesList', function test_OLSKAppFeaturesList () {

		it('shows OLSKAppFeatureOpenSource', function () {
			browser.assert.attribute('.OLSKAppFeatureListItemOpenSource a', 'href', process.env.OLSK_REPO_URL);
		});
	
	});

	describe('SNPVitrineGuideButton', function test_SNPVitrineGuideButton () {

		it('classes OLSKDecorPress', function () {
			browser.assert.hasClass(SNPVitrineGuideButton, 'OLSKDecorPress');
		});
		
		it('classes OLSKDecorPressCall', function () {
			browser.assert.hasClass(SNPVitrineGuideButton, 'OLSKDecorPressCall');
		});
		
		it('sets href', function () {
			browser.assert.attribute(SNPVitrineGuideButton, 'href', OLSKTestingCanonical(require('../open-guide/controller.js').OLSKControllerRoutes().shift()));
		});
	
	});

	describe('ROCOGazette', function test_ROCOGazette () {

		it('sets ROCOBulletinProject', function () {
			browser.assert.attribute('.ROCOBulletinProjectField', 'value', process.env.ROCO_SHARED_PROJECT_ID);
		});

	});

	describe('OLSKEdit', function test_OLSKEdit () {

		it('sets OLSKEditURL', function () {
			browser.assert.attribute('.OLSKEdit', 'href', process.env.OLSK_REPO_URL);
		});

	});

});
