const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('SNPFormLink_Misc', function () {

	const SNPDocumentData = Math.random().toString();

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			SNPCodeFormObject: JSON.stringify({
				SNPDocumentData,
			})
		});
	});

	describe('SNPFormLinkField', function test_SNPFormLinkField () {

		it('classes SNPCodeFormDataField', function () {
			browser.assert.hasClass(SNPFormLinkField, 'SNPCodeFormDataField');
		});

		it('sets type', function () {
			browser.assert.attribute(SNPFormLinkField, 'type', 'url');
		});

		it('sets required', function () {
			browser.assert.attribute(SNPFormLinkField, 'required', '');
		});

		it('sets autofocus', function () {
			browser.assert.attribute(SNPFormLinkField, 'autofocus', '');
		});

		it('sets placeholder', function () {
			browser.assert.attribute(SNPFormLinkField, 'placeholder', 'https://example.com');
		});

		it('binds SNPDocumentData', function () {
			browser.assert.input(SNPFormLinkField, SNPDocumentData);
		});

		context('fill', function () {

			const SNPDocumentData = Math.random().toString();
			
			before(function () {
				browser.assert.text('#TestSNPCodeFormDidFill', '0');
			});
			
			before(function () {
				browser.assert.text('#TestSNPCodeFormNotValid', '0');
			});
			
			before(function () {
				return browser.fill(SNPFormLinkField, SNPDocumentData);
			});

			it('sends SNPCodeFormDidFill', function () {
				browser.assert.text('#TestSNPCodeFormDidFill', '1');
				browser.assert.text('#TestSNPCodeFormDidFillData', JSON.stringify({
					SNPDocumentData,
				}));
			});

			it('sends SNPCodeFormValid', function () {
				browser.assert.text('#TestSNPCodeFormNotValid', '1');
			});

			context('valid', function () {

				const SNPDocumentData = 'https://example.com';
				
				before(function () {
					browser.assert.text('#TestSNPCodeFormValid', '0');
				});
				
				before(function () {
					return browser.fill(SNPFormLinkField, SNPDocumentData);
				});

				it('sends SNPCodeFormDidFill', function () {
					browser.assert.text('#TestSNPCodeFormDidFill', '2');
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
			
			});
		
		});
		
	});

});
