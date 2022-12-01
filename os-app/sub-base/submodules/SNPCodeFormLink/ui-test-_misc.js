const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('SNPCodeFormLink_Misc', function () {

	const SNPDocumentData = Math.random().toString();

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			SNPCodeFormObject: JSON.stringify({
				SNPDocumentData,
			})
		});
	});

	describe('SNPCodeFormLinkField', function test_SNPCodeFormLinkField () {

		it('classes SNPCodeFormDataField', function () {
			browser.assert.hasClass(SNPCodeFormLinkField, 'SNPCodeFormDataField');
		});

		it('sets type', function () {
			browser.assert.attribute(SNPCodeFormLinkField, 'type', 'url');
		});

		it('sets required', function () {
			browser.assert.attribute(SNPCodeFormLinkField, 'required', '');
		});

		it('sets autofocus', function () {
			browser.assert.attribute(SNPCodeFormLinkField, 'autofocus', '');
		});

		it('sets placeholder', function () {
			browser.assert.attribute(SNPCodeFormLinkField, 'placeholder', 'https://example.com');
		});

		it('binds SNPDocumentData', function () {
			browser.assert.input(SNPCodeFormLinkField, SNPDocumentData);
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
				return browser.fill(SNPCodeFormLinkField, SNPDocumentData);
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
					return browser.fill(SNPCodeFormLinkField, SNPDocumentData);
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
