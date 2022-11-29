const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	SNPPlayShare: '.SNPPlayShare',
	
	SNPPlayShareLinkField: '.SNPPlayShareLinkField',
	SNPPlayShareCopyButton: '.SNPPlayShareCopyButton',
}).map(function (e) {
	return global[e.shift()] = e.pop();
});

describe('SNPPlayShare_Access', function () {

	const count = Math.max(1, uRandomInt(10));

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			SNPPlayShareItems: JSON.stringify(Array.from(Array(count)).map(function () {
				return StubDocumentObjectValid();
			})),
		});
	});

	it('shows SNPPlayShare', function () {
		browser.assert.elements(SNPPlayShare, 1);
	});

	it('shows SNPPlayListItem', function () {
		browser.assert.elements('.SNPPlayListItem', count);
	});

	it('shows SNPPlayShareLinkField', function () {
		browser.assert.elements(SNPPlayShareLinkField, 1);
	});

	it('shows SNPPlayShareCopyButton', function () {
		browser.assert.elements(SNPPlayShareCopyButton, 1);
	});

});
