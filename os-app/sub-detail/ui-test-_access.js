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

	SNPCollectDetailEditButton: '.SNPCollectDetailEditButton',
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

	it('shows SNPCode', function () {
		browser.assert.elements('.SNPCode', 1);
	});

	it('shows SNPCollectDetailEditButton', function () {
		browser.assert.elements(SNPCollectDetailEditButton, 1);
	});

	it('hides SNPFormBase', function () {
		browser.assert.elements('.OLSKModalView .SNPFormBase', 0);
	});

	context('edit', function () {
		
		before(function () {
			return browser.pressButton(SNPCollectDetailEditButton);
		});

		it('shows SNPFormBase', function () {
			browser.assert.elements('.OLSKModalView .SNPFormBase', 1);
		});
	
	});

	context('save', function () {
		
		before(function () {
			return browser.fill('.SNPFormDataField', Math.random().toString());
		});

		before(function () {
			return browser.pressButton('.SNPFormBaseSaveButton');
		});

		it('hides SNPFormBase', function () {
			browser.assert.elements('.OLSKModalView .SNPFormBase', 0);
		});
	
	});

	context('SNPDocumentTypeSite', function () {
		
		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				SNPCollectDetailItem: JSON.stringify(StubDocumentObjectValid({
					SNPDocumentType: SNPDocument.SNPDocumentTypeSite(),
				})),
			});
		});

		it('shows SNPCollectDetailDataOpenButton', function () {
			browser.assert.elements(SNPCollectDetailDataOpenButton, 1);
		});
	
	});

});
