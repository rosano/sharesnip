const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('SNPFormNote_Misc', function () {

	const SNPDocumentData = Math.random().toString();

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			SNPCodeFormObject: JSON.stringify({
				SNPDocumentData,
			})
		});
	});

	describe('SNPFormNoteField', function test_SNPFormNoteField () {

		it('classes SNPCodeFormDataField', function () {
			browser.assert.hasClass(SNPFormNoteField, 'SNPCodeFormDataField');
		});

		it('sets type', function () {
			browser.assert.attribute(SNPFormNoteField, 'type', 'text');
		});

		it('sets required', function () {
			browser.assert.attribute(SNPFormNoteField, 'required', '');
		});

		it('sets autofocus', function () {
			browser.assert.attribute(SNPFormNoteField, 'autofocus', '');
		});

		it('binds SNPDocumentData', function () {
			browser.assert.input(SNPFormNoteField, SNPDocumentData);
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
				return browser.fill(SNPFormNoteField, SNPDocumentData);
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
					return browser.fill(SNPFormNoteField, '');
				});

				it('sends SNPCodeFormDidFill', function () {
					browser.assert.text('#TestSNPCodeFormDidFill', '2');
					browser.assert.text('#TestSNPCodeFormDidFillData', JSON.stringify({
						SNPDocumentData: '',
					}));
				});

				it('sends SNPCodeFormNotValid', function () {
					browser.assert.text('#TestSNPCodeFormNotValid', '1');
				});
			
			});
		
		});
		
	});

});
