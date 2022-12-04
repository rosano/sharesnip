const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('SNPFormPhone_Misc', function () {

	const SNPDocumentData = Math.random().toString();

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			SNPFormObject: JSON.stringify({
				SNPDocumentData,
			})
		});
	});

	describe('SNPFormPhoneField', function test_SNPFormPhoneField () {

		it('classes SNPFormDataField', function () {
			browser.assert.hasClass(SNPFormPhoneField, 'SNPFormDataField');
		});

		it('sets type', function () {
			browser.assert.attribute(SNPFormPhoneField, 'type', 'tel');
		});

		it('sets required', function () {
			browser.assert.attribute(SNPFormPhoneField, 'required', '');
		});

		it('sets autofocus', function () {
			browser.assert.attribute(SNPFormPhoneField, 'autofocus', '');
		});

		it('sets placeholder', function () {
			browser.assert.attribute(SNPFormPhoneField, 'placeholder', '+1-234-567-890');
		});

		it('binds SNPDocumentData', function () {
			browser.assert.input(SNPFormPhoneField, SNPDocumentData);
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
				return browser.fill(SNPFormPhoneField, SNPDocumentData);
			});

			it('sends SNPFormDidFill', function () {
				browser.assert.text('#TestSNPFormDidFill', '1');
				browser.assert.text('#TestSNPFormDidFillData', JSON.stringify({
					SNPDocumentData,
				}));
			});

			it('sends SNPFormValid', function () {
				browser.assert.text('#TestSNPFormNotValid', '1');
			});

			context('valid', function () {

				const SNPDocumentData = 'https://example.com';
				
				before(function () {
					browser.assert.text('#TestSNPFormValid', '0');
				});
				
				before(function () {
					return browser.fill(SNPFormPhoneField, SNPDocumentData);
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
