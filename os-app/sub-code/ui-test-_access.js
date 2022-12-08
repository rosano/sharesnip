const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	SNPCode: '.SNPCode',
}).map(function (e) {
	return global[e.shift()] = e.pop();
});

describe('SNPCode_Access', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			SNPCodeObject: JSON.stringify(StubDocumentObjectValid()),
		});
	});

	it('shows SNPCode', function () {
		browser.assert.elements(SNPCode, 1);
	});

});
