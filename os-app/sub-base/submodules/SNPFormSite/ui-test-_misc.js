const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('SNPFormSite_Misc', function () {

	const SNPDocumentData = Math.random().toString();

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			SNPFormObject: JSON.stringify({
				SNPDocumentData,
			})
		});
	});

	describe('SNPFormSiteField', function test_SNPFormSiteField () {

		it('classes SNPFormDataField', function () {
			browser.assert.hasClass(SNPFormSiteField, 'SNPFormDataField');
		});

		it('sets type', function () {
			browser.assert.attribute(SNPFormSiteField, 'type', 'url');
		});

		it('sets required', function () {
			browser.assert.attribute(SNPFormSiteField, 'required', '');
		});

		it('sets autofocus', function () {
			browser.assert.attribute(SNPFormSiteField, 'autofocus', '');
		});

		it('sets placeholder', function () {
			browser.assert.attribute(SNPFormSiteField, 'placeholder', 'https://example.com');
		});

		it('binds SNPDocumentData', function () {
			browser.assert.input(SNPFormSiteField, SNPDocumentData);
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
				return browser.fill(SNPFormSiteField, SNPDocumentData);
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
					return browser.fill(SNPFormSiteField, SNPDocumentData);
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
