const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('SNPFormNote_Misc', function () {

	const SNPDocumentData = Math.random().toString();

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			SNPCollectFormObject: JSON.stringify({
				SNPDocumentData,
			})
		});
	});

	describe('SNPFormNoteField', function test_SNPFormNoteField () {

		it('classes SNPCollectFormDataField', function () {
			browser.assert.hasClass(SNPFormNoteField, 'SNPCollectFormDataField');
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
				browser.assert.text('#TestSNPCollectFormDidFill', '0');
			});
			
			before(function () {
				browser.assert.text('#TestSNPCollectFormValid', '0');
			});
			
			before(function () {
				return browser.fill(SNPFormNoteField, SNPDocumentData);
			});

			it('sends SNPCollectFormDidFill', function () {
				browser.assert.text('#TestSNPCollectFormDidFill', '1');
				browser.assert.text('#TestSNPCollectFormDidFillData', JSON.stringify({
					SNPDocumentData,
				}));
			});

			it('sends SNPCollectFormValid', function () {
				browser.assert.text('#TestSNPCollectFormValid', '1');
				browser.assert.text('#TestSNPCollectFormValidData', JSON.stringify({
					SNPDocumentData,
				}));
			});

			context('empty', function () {
				
				before(function () {
					browser.assert.text('#TestSNPCollectFormNotValid', '0');
				});
				
				before(function () {
					return browser.fill(SNPFormNoteField, '');
				});

				it('sends SNPCollectFormDidFill', function () {
					browser.assert.text('#TestSNPCollectFormDidFill', '2');
					browser.assert.text('#TestSNPCollectFormDidFillData', JSON.stringify({
						SNPDocumentData: '',
					}));
				});

				it('sends SNPCollectFormNotValid', function () {
					browser.assert.text('#TestSNPCollectFormNotValid', '1');
				});
			
			});
		
		});
		
	});

});
