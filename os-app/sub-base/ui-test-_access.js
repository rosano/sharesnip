const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

const SNPDocument = require('../_shared/SNPDocument/main.js').default;
const SNPFormBaseLogic = require('./ui-logic.js').default;

Object.entries({
	SNPFormBase: '.SNPFormBase',
	
	SNPFormBaseSaveButton: '.SNPFormBaseSaveButton',
}).map(function (e) {
	return global[e.shift()] = e.pop();
});

describe('SNPFormBase_Access', function () {

	const SNPDocumentType = uRandomElement(SNPDocument.SNPDocumentTypes());

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			SNPFormBaseObject: JSON.stringify({
				SNPDocumentType,
			}),
		});
	});

	it('shows SNPFormBase', function () {
		browser.assert.elements(SNPFormBase, 1);
	});

	it('shows child class', function () {
		browser.assert.elements('.' + SNPFormBaseLogic.SNPFormBaseChildClass(SNPDocumentType), 1);
	});

	it('shows SNPFormBaseSaveButton', function () {
		browser.assert.elements(SNPFormBaseSaveButton, 1);
	});	

});
