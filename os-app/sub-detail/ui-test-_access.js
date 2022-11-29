const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	SNPPlayDetail: '.SNPPlayDetail',

	SNPPlayDetailToolbar: '.SNPPlayDetailToolbar',
	
	SNPPlayDetailToolbarBackButton: '.SNPPlayDetailToolbarBackButton',
	SNPPlayDetailToolbarBackButtonImage: '.SNPPlayDetailToolbarBackButtonImage',

	SNPPlayDetailToolbarQueueButton: '.SNPPlayDetailToolbarQueueButton',	
	SNPPlayDetailToolbarQueueButtonImage: '.SNPPlayDetailToolbarQueueButtonImage',
	
	SNPPlayDetailToolbarDiscardButton: '.SNPPlayDetailToolbarDiscardButton',	
	SNPPlayDetailToolbarDiscardButtonImage: '.SNPPlayDetailToolbarDiscardButtonImage',

	SNPPlayDetailForm: '.SNPPlayDetailForm',
	SNPPlayDetailFormNameField: '.SNPPlayDetailFormNameField',
}).map(function (e) {
	return global[e.shift()] = e.pop();
});

describe('SNPPlayDetail_Access', function () {
	
	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			SNPPlayDetailItem: JSON.stringify(StubDocumentObjectValid()),
		});
	});

	it('shows SNPPlayDetail', function () {
		browser.assert.elements(SNPPlayDetail, 1);
	});

	it('shows SNPPlayDetailToolbar', function () {
		browser.assert.elements(SNPPlayDetailToolbar, 1);
	});

	it('shows SNPPlayDetailToolbarBackButton', function () {
		browser.assert.elements(SNPPlayDetailToolbarBackButton, 1);
	});

	it('shows SNPPlayDetailToolbarBackButtonImage', function () {
		browser.assert.elements(SNPPlayDetailToolbarBackButtonImage, 1);
	});

	it('shows SNPPlayDetailToolbarQueueButton', function () {
		browser.assert.elements(SNPPlayDetailToolbarQueueButton, 1);
	});

	it('shows SNPPlayDetailToolbarQueueButtonImage', function () {
		browser.assert.elements(SNPPlayDetailToolbarQueueButtonImage, 1);
	});

	it('shows SNPPlayDetailToolbarDiscardButton', function () {
		browser.assert.elements(SNPPlayDetailToolbarDiscardButton, 1);
	});

	it('shows SNPPlayDetailToolbarDiscardButtonImage', function () {
		browser.assert.elements(SNPPlayDetailToolbarDiscardButtonImage, 1);
	});

	it('shows SNPPlayDetailForm', function () {
		browser.assert.elements(SNPPlayDetailForm, 1);
	});

	it('shows SNPPlayDetailFormNameField', function () {
		browser.assert.elements(SNPPlayDetailFormNameField, 1);
	});

});
