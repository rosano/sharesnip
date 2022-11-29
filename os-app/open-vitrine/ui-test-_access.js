const kDefaultRoutePath = require('./controller.js').OLSKControllerRoutes().shift().OLSKRoutePath;

Object.entries({
	SNPVitrine: '.SNPVitrine',
	
	SNPVitrineVideo: '.OLSKCommonVideoList .OLSKCommonVideoListItem.SNPVitrineVideo iframe',

	SNPVitrineFeaturesHeading: '.SNPVitrineFeaturesHeading',

	SNPVitrineGuideButton: '.SNPVitrineGuideButton',

	SNPVitrineDeeperHeading: '.SNPVitrineDeeperHeading',
	SNPVitrineGlossary: '.SNPVitrineGlossary',

	SNPVitrineSupportHeading: '.SNPVitrineSupportHeading',
	SNPVitrineSupportBlurb: '.SNPVitrineSupportBlurb',
}).map(function (e) {
	return global[e.shift()] = e.pop();
});

describe('SNPVitrine_Access', function () {

	before(function() {
		return browser.visit(kDefaultRoutePath);
	});
	
	it('shows SNPVitrine', function() {
		browser.assert.elements(SNPVitrine, 1);
	});
	
	it('shows OLSKCrown', function() {
		browser.assert.elements('.OLSKCrown', 1);
	});
	
	it('shows OLSKLanding', function() {
		browser.assert.elements('.OLSKLanding', 1);
	});

	it('shows SNPVitrineVideo', function () {
		browser.assert.elements(SNPVitrineVideo, 1);
	});

	it('shows SNPVitrineFeaturesHeading', function () {
		browser.assert.elements(SNPVitrineFeaturesHeading, 1);
	});

	it('shows OLSKAppFeatureList', function () {
		browser.assert.elements('.OLSKAppFeatureList', 1);
	});

	it('shows OLSKAppFeatureOpenSource', function () {
		browser.assert.elements('.OLSKAppFeatureListItemOpenSource', 1);
	});

	it('shows SNPVitrineGuideButton', function () {
		browser.assert.elements(SNPVitrineGuideButton, 1);
	});

	it('shows SNPVitrineDeeperHeading', function () {
		browser.assert.elements(SNPVitrineDeeperHeading, 1);
	});

	it('shows SNPVitrineGlossary', function () {
		browser.assert.elements(SNPVitrineGlossary, 1);
	});

	it('shows ROCOGlossary', function () {
		browser.assert.elements('.ROCOGlossary', 1);
	});

	it('shows ROCOGazette', function () {
		browser.assert.elements('.ROCOGazette', 1);
	});

	it('shows OLSKEdit', function () {
		browser.assert.elements('.OLSKEdit', 1);
	});

	it('shows SNPVitrineSupportHeading', function () {
		browser.assert.elements(SNPVitrineSupportHeading, 1);
	});

	it('shows SNPVitrineSupportBlurb', function () {
		browser.assert.elements(SNPVitrineSupportBlurb, 1);
	});

	it('shows SWARLink', function() {
		browser.assert.elements('.SWARLink', 1);
	});

	it('shows ROCORootLink', function() {
		browser.assert.elements('.ROCORootLink', 1);
	});

});
