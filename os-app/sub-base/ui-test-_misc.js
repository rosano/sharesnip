const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('SNPCodeFormBase_Misc', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});

	describe('SNPCodeFormBaseSaveButton', function test_SNPCodeFormBaseSaveButton () {

		it('sets disabled', function () {
			browser.assert.attribute(SNPCodeFormBaseSaveButton, 'disabled', '');
		});

		context('valid', function () {

			const SNPDocumentData = Math.random().toString();
			
			before(function () {
				return browser.assert.text('#TestSNPCodeFormValid', '0');
			});

			before(function () {
				return browser.fill('.SNPCodeFormDataField', SNPDocumentData);
			});

			it('sets disabled', function () {
				browser.assert.attribute(SNPCodeFormBaseSaveButton, 'disabled', null);
			});

			it('sends SNPCodeFormValid', function () {
				browser.assert.text('#TestSNPCodeFormValid', '1');
				browser.assert.text('#TestSNPCodeFormValidData', JSON.stringify({
					SNPDocumentData,
				}));
			});
		
		});

		context('not valid', function () {
			
			before(function () {
				return browser.assert.text('#TestSNPCodeFormNotValid', '0');
			});

			before(function () {
				return browser.fill('.SNPCodeFormDataField', '');
			});

			it('sets disabled', function () {
				browser.assert.attribute(SNPCodeFormBaseSaveButton, 'disabled', '');
			});

			it('sends SNPCodeFormNotValid', function () {
				browser.assert.text('#TestSNPCodeFormNotValid', '1');
			});
		
		});

		context('click', function () {

			const SNPDocumentData = Math.random().toString();
			
			before(function () {
				return browser.assert.text('#TestSNPCodeFormDidSubmit', '0');
			});

			before(function () {
				return browser.fill('.SNPCodeFormDataField', SNPDocumentData);
			});

			before(function () {
				return browser.pressButton(SNPCodeFormBaseSaveButton);
			});

			it('sends SNPCodeFormDidFill', function () {
				browser.assert.text('#TestSNPCodeFormDidFill', '3');
				browser.assert.text('#TestSNPCodeFormDidFillData', JSON.stringify({
					SNPDocumentData,
				}));
			});

			it('sends SNPCodeFormDidSubmit', function () {
				browser.assert.text('#TestSNPCodeFormDidSubmit', '1');
				browser.assert.text('#TestSNPCodeFormDidSubmitData', JSON.stringify({
					SNPDocumentName: '',
					SNPDocumentType: 'TYPE_NOTE',
					SNPDocumentData,
				}));
			});
		
		});
		
	});

});
