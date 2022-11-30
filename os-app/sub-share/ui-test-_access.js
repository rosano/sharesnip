const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	SNPCodeShare: '.SNPCodeShare',
	
	SNPCodeShareLinkField: '.SNPCodeShareLinkField',
	SNPCodeShareCopyButton: '.SNPCodeShareCopyButton',
}).map(function (e) {
	return global[e.shift()] = e.pop();
});

describe('SNPCodeShare_Access', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			SNPCodeShareItems: JSON.stringify(Array.from(Array(0)).map(function () {
				return StubDocumentObjectValid();
			})),
		});
	});

	it('shows SNPCodeShare', function () {  
		browser.assert.elements(SNPCodeShare, 1);
	});

	it('shows SNPCodeListItem', function () {
		browser.assert.elements('.SNPCodeListItem', 0);
	});

	it('shows SNPCodeShareLinkField', function () {
		browser.assert.elements(SNPCodeShareLinkField, 1);
	});

	it('shows SNPCodeShareCopyButton', function () {
		browser.assert.elements(SNPCodeShareCopyButton, 1);
	});

});
