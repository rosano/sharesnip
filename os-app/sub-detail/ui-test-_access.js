const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	SNPCodeDetail: '.SNPCodeDetail',

	SNPCodeDetailToolbar: '.SNPCodeDetailToolbar',
	
	SNPCodeDetailToolbarBackButton: '.SNPCodeDetailToolbarBackButton',
	SNPCodeDetailToolbarBackButtonImage: '.SNPCodeDetailToolbarBackButtonImage',

	SNPCodeDetailToolbarCloneButton: '.SNPCodeDetailToolbarCloneButton',	
	SNPCodeDetailToolbarCloneButtonImage: '.SNPCodeDetailToolbarCloneButtonImage',
	
	SNPCodeDetailToolbarDiscardButton: '.SNPCodeDetailToolbarDiscardButton',	
	SNPCodeDetailToolbarDiscardButtonImage: '.SNPCodeDetailToolbarDiscardButtonImage',

	SNPCodeDetailForm: '.SNPCodeDetailForm',
	SNPCodeDetailFormNameField: '.SNPCodeDetailFormNameField',
}).map(function (e) {
	return global[e.shift()] = e.pop();
});

describe('SNPCodeDetail_Access', function () {
	
	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			SNPCodeDetailItem: JSON.stringify(StubDocumentObjectValid()),
		});
	});

	it('shows SNPCodeDetail', function () {
		browser.assert.elements(SNPCodeDetail, 1);
	});

	it('shows SNPCodeDetailToolbar', function () {
		browser.assert.elements(SNPCodeDetailToolbar, 1);
	});

	it('shows SNPCodeDetailToolbarBackButton', function () {
		browser.assert.elements(SNPCodeDetailToolbarBackButton, 1);
	});

	it('shows SNPCodeDetailToolbarBackButtonImage', function () {
		browser.assert.elements(SNPCodeDetailToolbarBackButtonImage, 1);
	});

	it('shows SNPCodeDetailToolbarCloneButton', function () {
		browser.assert.elements(SNPCodeDetailToolbarCloneButton, 1);
	});

	it('shows SNPCodeDetailToolbarCloneButtonImage', function () {
		browser.assert.elements(SNPCodeDetailToolbarCloneButtonImage, 1);
	});

	it('shows SNPCodeDetailToolbarDiscardButton', function () {
		browser.assert.elements(SNPCodeDetailToolbarDiscardButton, 1);
	});

	it('shows SNPCodeDetailToolbarDiscardButtonImage', function () {
		browser.assert.elements(SNPCodeDetailToolbarDiscardButtonImage, 1);
	});

	it('shows SNPCodeDetailForm', function () {
		browser.assert.elements(SNPCodeDetailForm, 1);
	});

	it('shows SNPCodeDetailFormNameField', function () {
		browser.assert.elements(SNPCodeDetailFormNameField, 1);
	});

});
