const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('SNPFormNote_Misc', function () {

	const SNPDocumentData = Math.random().toString();

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			SNPFormObject: JSON.stringify({
				SNPDocumentData,
			})
		});
	});

	describe('SNPFormNoteField', function test_SNPFormNoteField () {

		it('classes SNPFormDataField', function () {
			browser.assert.hasClass(SNPFormNoteField, 'SNPFormDataField');
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
				browser.assert.text('#TestSNPFormDidFill', '0');
			});
			
			before(function () {
				browser.assert.text('#TestSNPFormValid', '0');
			});
			
			before(function () {
				return browser.fill(SNPFormNoteField, SNPDocumentData);
			});

			it('sends SNPFormDidFill', function () {
				browser.assert.text('#TestSNPFormDidFill', '1');
				browser.assert.text('#TestSNPFormDidFillData', JSON.stringify({
					SNPDocumentData,
				}));
			});

			it('sends SNPFormValid', function () {
				browser.assert.text('#TestSNPFormValid', '1');
				browser.assert.text('#TestSNPFormValidData', JSON.stringify({
					SNPDocumentData,
				}));
			});

			context('empty', function () {
				
				before(function () {
					browser.assert.text('#TestSNPFormNotValid', '0');
				});
				
				before(function () {
					return browser.fill(SNPFormNoteField, '');
				});

				it('sends SNPFormDidFill', function () {
					browser.assert.text('#TestSNPFormDidFill', '2');
					browser.assert.text('#TestSNPFormDidFillData', JSON.stringify({
						SNPDocumentData: '',
					}));
				});

				it('sends SNPFormNotValid', function () {
					browser.assert.text('#TestSNPFormNotValid', '1');
				});
			
			});
		
		});
		
	});

});
