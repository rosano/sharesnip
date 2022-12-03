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
				return browser.assert.text('#TestSNPCollectFormValid', '0');
			});

			before(function () {
				return browser.fill('.SNPCollectFormDataField', SNPDocumentData);
			});

			it('sets disabled', function () {
				browser.assert.attribute(SNPFormBaseSaveButton, 'disabled', null);
			});

			it('sends SNPCollectFormValid', function () {
				browser.assert.text('#TestSNPCollectFormValid', '1');
				browser.assert.text('#TestSNPCollectFormValidData', JSON.stringify({
					SNPDocumentData,
				}));
			});
		
		});

		context('not valid', function () {
			
			before(function () {
				return browser.assert.text('#TestSNPCollectFormNotValid', '0');
			});

			before(function () {
				return browser.fill('.SNPCollectFormDataField', '');
			});

			it('sets disabled', function () {
				browser.assert.attribute(SNPFormBaseSaveButton, 'disabled', '');
			});

			it('sends SNPCollectFormNotValid', function () {
				browser.assert.text('#TestSNPCollectFormNotValid', '1');
			});
		
		});

		context('click', function () {

			const SNPDocumentData = Math.random().toString();
			
			before(function () {
				return browser.assert.text('#TestSNPCollectFormDidSubmit', '0');
			});

			before(function () {
				return browser.fill('.SNPCollectFormDataField', SNPDocumentData);
			});

			before(function () {
				return browser.pressButton(SNPFormBaseSaveButton);
			});

			it('sends SNPCollectFormDidFill', function () {
				browser.assert.text('#TestSNPCollectFormDidFill', '3');
				browser.assert.text('#TestSNPCollectFormDidFillData', JSON.stringify({
					SNPDocumentData,
				}));
			});

			it('sends SNPCollectFormDidSubmit', function () {
				browser.assert.text('#TestSNPCollectFormDidSubmit', '1');
				browser.assert.text('#TestSNPCollectFormDidSubmitData', JSON.stringify({
					SNPDocumentName: '',
					SNPDocumentType: 'TYPE_NOTE',
					SNPDocumentData,
				}));
			});
		
		});
		
	});

});
