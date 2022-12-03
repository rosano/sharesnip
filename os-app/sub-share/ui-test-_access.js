const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	SNPCollectShare: '.SNPCollectShare',
	
	SNPCollectShareLinkField: '.SNPCollectShareLinkField',
	SNPCollectShareCopyButton: '.SNPCollectShareCopyButton',
}).map(function (e) {
	return global[e.shift()] = e.pop();
});

describe('SNPCollectShare_Access', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			SNPCollectShareItems: JSON.stringify(Array.from(Array(0)).map(function () {
				return StubDocumentObjectValid();
			})),
		});
	});

	it('shows SNPCollectShare', function () {  
		browser.assert.elements(SNPCollectShare, 1);
	});

	it('shows SNPCollectListItem', function () {
		browser.assert.elements('.SNPCollectListItem', 0);
	});

	it('shows SNPCollectShareLinkField', function () {
		browser.assert.elements(SNPCollectShareLinkField, 1);
	});

	it('shows SNPCollectShareCopyButton', function () {
		browser.assert.elements(SNPCollectShareCopyButton, 1);
	});

});
