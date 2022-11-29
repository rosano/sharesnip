const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	SNPGuide: '.SNPGuide',

	SNPGuideCrown: '.SNPGuideCrown',
	SNPGuideCrownName: '.SNPGuideCrownName',

	SNPGuideContent: '.SNPGuideContent',
}).map(function (e) {
	return global[e.shift()] = e.pop();
});

describe('SNPGuide_Access', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});

	it('shows SNPGuide', function () {
		browser.assert.elements(SNPGuide, 1);
	});

	it('shows SNPGuideCrown', function () {
		browser.assert.elements(SNPGuideCrown, 1);
	});

	it('shows SNPGuideCrownName', function () {
		browser.assert.elements(SNPGuideCrownName, 1);
	});

	it('shows SNPGuideContent', function () {
		browser.assert.elements(SNPGuideContent, 1);
	});

	it('shows SNPRootLink', function () {
		browser.assert.elements('.SNPRootLink', 1);
	});

});
