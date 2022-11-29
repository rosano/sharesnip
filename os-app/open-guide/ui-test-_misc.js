const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('SNPGuide_Misc', function () {

	before(function () {
		return browser.OLSKVisit(kDefaultRoute);
	});

	context('SNPGuide', function () {
		
		it('classes OLSKDecor', function () {
			browser.assert.hasClass(SNPGuide, 'OLSKDecor');
		});

		it('classes OLSKDecorCapped', function () {
			browser.assert.hasClass(SNPGuide, 'OLSKDecorCapped');
		});
	
	});

	describe('SNPGuideCrown', function test_SNPGuideCrown() {

		it('classes OLSKCommonCard', function () {
			browser.assert.hasClass(SNPGuideCrown, 'OLSKCommonCard');
		});

		it('classes OLSKCommonCrownCard', function () {
			browser.assert.hasClass(SNPGuideCrown, 'OLSKCommonCrownCard');
		});
		
	});

});
