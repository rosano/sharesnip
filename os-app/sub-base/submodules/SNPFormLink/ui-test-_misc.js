const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('SNPFormLink_Misc', function () {

	const SNPDocumentData = Math.random().toString();

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			SNPFormObject: JSON.stringify({
				SNPDocumentData,
			})
		});
	});

	describe('SNPFormLinkField', function test_SNPFormLinkField () {

		it('classes SNPFormDataField', function () {
			browser.assert.hasClass(SNPFormLinkField, 'SNPFormDataField');
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
				browser.assert.text('#TestSNPFormDidFill', '0');
			});
			
			before(function () {
				browser.assert.text('#TestSNPFormNotValid', '0');
			});
			
			before(function () {
				return browser.fill(SNPFormLinkField, SNPDocumentData);
			});

			it('sends SNPFormDidFill', function () {
				browser.assert.text('#TestSNPFormDidFill', '1');
				browser.assert.text('#TestSNPFormDidFillData', JSON.stringify({
					SNPDocumentData,
				}));
			});

			it('sends SNPFormNotValid', function () {
				browser.assert.text('#TestSNPFormNotValid', '1');
			});

			context('valid', function () {

				const SNPDocumentData = 'https://example.com';
				
				before(function () {
					browser.assert.text('#TestSNPFormValid', '0');
				});
				
				before(function () {
					return browser.fill(SNPFormLinkField, SNPDocumentData);
				});

				it('sends SNPFormDidFill', function () {
					browser.assert.text('#TestSNPFormDidFill', '2');
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
			
			});
		
		});
		
	});

});
