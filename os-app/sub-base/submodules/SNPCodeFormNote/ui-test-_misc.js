const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('SNPCodeFormNote_Misc', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});

	describe('SNPCodeFormNoteField', function test_SNPCodeFormNoteField () {

		it('classes SNPCodeFormDataField', function () {
			browser.assert.hasClass(SNPCodeFormNoteField, 'SNPCodeFormDataField');
		});

		it('sets type', function () {
			browser.assert.attribute(SNPCodeFormNoteField, 'type', 'text');
		});

		it('sets required', function () {
			browser.assert.attribute(SNPCodeFormNoteField, 'required', '');
		});

		it('sets autofocus', function () {
			browser.assert.attribute(SNPCodeFormNoteField, 'autofocus', '');
		});

		context('fill', function () {

			const SNPDocumentData = Math.random().toString();
			
			before(function () {
				browser.assert.text('#TestSNPCodeFormDidFill', '0');
			});
			
			before(function () {
				browser.assert.text('#TestSNPCodeFormValid', '0');
			});
			
			before(function () {
				return browser.fill(SNPCodeFormNoteField, SNPDocumentData);
			});

			it('sends SNPCodeFormDidFill', function () {
				browser.assert.text('#TestSNPCodeFormDidFill', '1');
				browser.assert.text('#TestSNPCodeFormDidFillData', JSON.stringify({
					SNPDocumentData,
				}));
			});

			it('sends SNPCodeFormValid', function () {
				browser.assert.text('#TestSNPCodeFormValid', '1');
				browser.assert.text('#TestSNPCodeFormValidData', JSON.stringify({
					SNPDocumentData,
				}));
			});

			context('empty', function () {
				
				before(function () {
					browser.assert.text('#TestSNPCodeFormNotValid', '0');
				});
				
				before(function () {
					return browser.fill(SNPCodeFormNoteField, '');
				});

				it('sends SNPCodeFormValid', function () {
					browser.assert.text('#TestSNPCodeFormNotValid', '1');
				});

				it('sends SNPCodeFormDidFill', function () {
					browser.assert.text('#TestSNPCodeFormDidFill', '2');
					browser.assert.text('#TestSNPCodeFormDidFillData', JSON.stringify({
						SNPDocumentData: '',
					}));
				});
			
			});
		
		});
		
	});

});
