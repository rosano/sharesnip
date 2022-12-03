const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('SNPFormLink_Misc', function () {

	const SNPDocumentData = Math.random().toString();

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			SNPCollectFormObject: JSON.stringify({
				SNPDocumentData,
			})
		});
	});

	describe('SNPFormLinkField', function test_SNPFormLinkField () {

		it('classes SNPCollectFormDataField', function () {
			browser.assert.hasClass(SNPFormLinkField, 'SNPCollectFormDataField');
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
				browser.assert.text('#TestSNPCollectFormDidFill', '0');
			});
			
			before(function () {
				browser.assert.text('#TestSNPCollectFormNotValid', '0');
			});
			
			before(function () {
				return browser.fill(SNPFormLinkField, SNPDocumentData);
			});

			it('sends SNPCollectFormDidFill', function () {
				browser.assert.text('#TestSNPCollectFormDidFill', '1');
				browser.assert.text('#TestSNPCollectFormDidFillData', JSON.stringify({
					SNPDocumentData,
				}));
			});

			it('sends SNPCollectFormValid', function () {
				browser.assert.text('#TestSNPCollectFormNotValid', '1');
			});

			context('valid', function () {

				const SNPDocumentData = 'https://example.com';
				
				before(function () {
					browser.assert.text('#TestSNPCollectFormValid', '0');
				});
				
				before(function () {
					return browser.fill(SNPFormLinkField, SNPDocumentData);
				});

				it('sends SNPCollectFormDidFill', function () {
					browser.assert.text('#TestSNPCollectFormDidFill', '2');
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
			
			});
		
		});
		
	});

});
