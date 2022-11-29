const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	SNPRootLink: '.SNPRootLink',
}).map(function (e) {
	return global[e.shift()] = e.pop();
});

describe('SNPRootLink_Access', function () {
	
	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});
	
	it('shows SNPRootLink', function() {
		browser.assert.elements(SNPRootLink, 1);
	});
	
	it('shows OLSKRootLink', function() {
		browser.assert.elements('.OLSKRootLink', 1);
	})
	
});
