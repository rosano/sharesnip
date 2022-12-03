const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('SNPFormBase_Misc', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});

	describe('SNPFormBaseSaveButton', function test_SNPFormBaseSaveButton () {

		it('sets disabled', function () {
			browser.assert.attribute(SNPFormBaseSaveButton, 'disabled', '');
		});

		context('valid', function () {

			const SNPDocumentData = Math.random().toString();
			
			before(function () {
				return browser.assert.text('#TestSNPFormValid', '0');
			});

			before(function () {
				return browser.fill('.SNPFormDataField', SNPDocumentData);
			});

			it('sets disabled', function () {
				browser.assert.attribute(SNPFormBaseSaveButton, 'disabled', null);
			});

			it('sends SNPFormValid', function () {
				browser.assert.text('#TestSNPFormValid', '1');
				browser.assert.text('#TestSNPFormValidData', JSON.stringify({
					SNPDocumentData,
				}));
			});
		
		});

		context('not valid', function () {
			
			before(function () {
				return browser.assert.text('#TestSNPFormNotValid', '0');
			});

			before(function () {
				return browser.fill('.SNPFormDataField', '');
			});

			it('sets disabled', function () {
				browser.assert.attribute(SNPFormBaseSaveButton, 'disabled', '');
			});

			it('sends SNPFormNotValid', function () {
				browser.assert.text('#TestSNPFormNotValid', '1');
			});
		
		});

		context('click', function () {

			const SNPDocumentData = Math.random().toString();
			
			before(function () {
				return browser.assert.text('#TestSNPFormDidSubmit', '0');
			});

			before(function () {
				return browser.fill('.SNPFormDataField', SNPDocumentData);
			});

			before(function () {
				return browser.pressButton(SNPFormBaseSaveButton);
			});

			it('sends SNPFormDidFill', function () {
				browser.assert.text('#TestSNPFormDidFill', '3');
				browser.assert.text('#TestSNPFormDidFillData', JSON.stringify({
					SNPDocumentData,
				}));
			});

			it('sends SNPFormDidSubmit', function () {
				browser.assert.text('#TestSNPFormDidSubmit', '1');
				browser.assert.text('#TestSNPFormDidSubmitData', JSON.stringify({
					SNPDocumentName: '',
					SNPDocumentType: 'TYPE_NOTE',
					SNPDocumentData,
				}));
			});
		
		});
		
	});

});
