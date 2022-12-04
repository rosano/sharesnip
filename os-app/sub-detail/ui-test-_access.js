const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

const SNPDocument = require('../_shared/SNPDocument/main.js').default;

Object.entries({
	SNPCollectDetail: '.SNPCollectDetail',

	SNPCollectDetailToolbar: '.SNPCollectDetailToolbar',
	
	SNPCollectDetailToolbarBackButton: '.SNPCollectDetailToolbarBackButton',
	SNPCollectDetailToolbarBackButtonImage: '.SNPCollectDetailToolbarBackButtonImage',

	SNPCollectDetailToolbarCloneButton: '.SNPCollectDetailToolbarCloneButton',	
	SNPCollectDetailToolbarCloneButtonImage: '.SNPCollectDetailToolbarCloneButtonImage',
	
	SNPCollectDetailToolbarDiscardButton: '.SNPCollectDetailToolbarDiscardButton',	
	SNPCollectDetailToolbarDiscardButtonImage: '.SNPCollectDetailToolbarDiscardButtonImage',

	SNPCollectDetailForm: '.SNPCollectDetailForm',
	SNPCollectDetailFormNameField: '.SNPCollectDetailFormNameField',

	SNPCollectDetailDataField: '.SNPCollectDetailDataField',
	SNPCollectDetailDataOpenButton: '.SNPCollectDetailDataOpenButton',

	SNPCollectDetailQR: '.SNPCollectDetailQR',
}).map(function (e) {
	return global[e.shift()] = e.pop();
});

describe('SNPCollectDetail_Access', function () {
	
	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			SNPCollectDetailItem: JSON.stringify(StubDocumentObjectValid()),
		});
	});

	it('shows SNPCollectDetail', function () {
		browser.assert.elements(SNPCollectDetail, 1);
	});

	it('shows SNPCollectDetailToolbar', function () {
		browser.assert.elements(SNPCollectDetailToolbar, 1);
	});

	it('shows SNPCollectDetailToolbarBackButton', function () {
		browser.assert.elements(SNPCollectDetailToolbarBackButton, 1);
	});

	it('shows SNPCollectDetailToolbarBackButtonImage', function () {
		browser.assert.elements(SNPCollectDetailToolbarBackButtonImage, 1);
	});

	it('shows SNPCollectDetailToolbarCloneButton', function () {
		browser.assert.elements(SNPCollectDetailToolbarCloneButton, 1);
	});

	it('shows SNPCollectDetailToolbarCloneButtonImage', function () {
		browser.assert.elements(SNPCollectDetailToolbarCloneButtonImage, 1);
	});

	it('shows SNPCollectDetailToolbarDiscardButton', function () {
		browser.assert.elements(SNPCollectDetailToolbarDiscardButton, 1);
	});

	it('shows SNPCollectDetailToolbarDiscardButtonImage', function () {
		browser.assert.elements(SNPCollectDetailToolbarDiscardButtonImage, 1);
	});

	it('shows SNPCollectDetailForm', function () {
		browser.assert.elements(SNPCollectDetailForm, 1);
	});

	it('shows SNPCollectDetailFormNameField', function () {
		browser.assert.elements(SNPCollectDetailFormNameField, 1);
	});

	it('shows SNPCollectDetailDataField', function () {
		browser.assert.elements(SNPCollectDetailDataField, 1);
	});

	it('hides SNPCollectDetailDataOpenButton', function () {
		browser.assert.elements(SNPCollectDetailDataOpenButton, 0);
	});

	it('shows SNPCollectDetailQR', function () {
		browser.assert.elements(SNPCollectDetailQR, 1);
	});

	context('SNPDocumentTypeLink', function () {
		
		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				SNPCollectDetailItem: JSON.stringify(StubDocumentObjectValid({
					SNPDocumentType: SNPDocument.SNPDocumentTypeLink(),
				})),
			});
		});

		it('shows SNPCollectDetailDataOpenButton', function () {
			browser.assert.elements(SNPCollectDetailDataOpenButton, 1);
		});
	
	});

});
