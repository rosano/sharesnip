const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

kDefaultRoute.OLSKRouteLanguageCodes.forEach(function (OLSKRoutingLanguage) {

	const uLocalized = function (inputData) {
		return OLSKTestingLocalized(inputData, OLSKRoutingLanguage);
	};

	describe('SNPVitrine_Localize-' + OLSKRoutingLanguage, function () {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				OLSKRoutingLanguage,
			});
		});

		it('localizes title', function() {
			browser.assert.text('title', uLocalized('SNPVitrineTitle'));
		});

		it('localizes meta[description]', function() {
			browser.assert.attribute('meta[name=description]', 'content', uLocalized('SNPVitrineDescription'));
		});

		it('localizes SNPVitrineFeaturesHeading', function () {
			browser.assert.text(SNPVitrineFeaturesHeading, uLocalized('OLSKWordingFeatures'));
		});

		it('localizes SNPVitrineGuideButton', function () {
			browser.assert.text(SNPVitrineGuideButton, uLocalized('OLSKWordingOpenGuide'));
		});

		it('localizes SNPVitrineDeeperHeading', function () {
			browser.assert.text(SNPVitrineDeeperHeading, uLocalized('OLSKWordingDeeperHeading'));
		});

		it('localizes SNPVitrineSupportHeading', function () {
			browser.assert.text(SNPVitrineSupportHeading, uLocalized('OLSKWordingFeedbackHeading'));
		});

		it('localizes SNPVitrineSupportBlurb', function () {
			browser.assert.text(SNPVitrineSupportBlurb, uLocalized('OLSKWordingFeedbackBlurb'));
		});

		context('OLSKCrown', function test_OLSKCrown () {

			it('localizes OLSKCrownCardName', function () {
				browser.assert.text('.OLSKCrownCardName', uLocalized('SNPVitrineTitle'));
			});
		
		});

		context('OLSKLanding', function test_OLSKLanding () {

			it('localizes OLSKLandingHeadingText', function () {
				browser.assert.text('.OLSKLandingHeading', uLocalized('SNPVitrineDescription'));
			});

			it('localizes OLSKLandingBlurbText', function () {
				browser.assert.text('.OLSKLandingBlurb', uLocalized('OLSKLandingBlurbText'));
			});

			it('localizes OLSKLandingActionText', function () {
				browser.assert.text('.OLSKLandingAction', uLocalized('OLSKWordingOpenApp'));
			});

			it('localizes OLSKLandingActionHref', function () {
				browser.assert.attribute('.OLSKLandingAction', 'href', OLSKTestingCanonical(require('../open-collect/controller.js').OLSKControllerRoutes().shift(), {
					OLSKRoutingLanguage,
				}));
			});
		
		});


	});

});
