const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

const SNPDocument = require('../_shared/SNPDocument/main.js').default;
const SNPCodeFormBaseLogic = require('./ui-logic.js').default;

Object.entries({
	SNPCodeFormBase: '.SNPCodeFormBase',
	
	SNPCodeFormBaseSaveButton: '.SNPCodeFormBaseSaveButton',
}).map(function (e) {
	return global[e.shift()] = e.pop();
});

describe('SNPCodeFormBase_Access', function () {

	const SNPDocumentType = uRandomElement(SNPDocument.SNPDocumentTypes());

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			SNPCodeFormBaseObject: JSON.stringify({
				SNPDocumentType,
			}),
		});
	});

	it('shows SNPCodeFormBase', function () {
		browser.assert.elements(SNPCodeFormBase, 1);
	});

	it('shows child class', function () {
		browser.assert.elements('.' + SNPCodeFormBaseLogic.SNPCodeFormBaseChildClass(SNPDocumentType), 1);
	});

	it('shows SNPCodeFormBaseSaveButton', function () {
		browser.assert.elements(SNPCodeFormBaseSaveButton, 1);
	});	

});
