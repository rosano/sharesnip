const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

const SNPFormPhoneLogic = require('./ui-logic.js').default;

describe('SNPFormPhone_Misc', function () {

	const SNPDocumentPhone = Math.random().toString();

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			SNPFormObject: JSON.stringify(SNPFormPhoneLogic.SNPFormPhoneDocument({
				SNPDocumentPhone,
			})),
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

		it('binds SNPDocumentPhone', function () {
			browser.assert.input(SNPFormPhoneField, SNPDocumentPhone);
		});

		context('valid', function () {

			const SNPDocumentPhone = '+123-abc';

			before(function () {
				browser.assert.text('#TestSNPFormDidFill', '0');
			});
			
			before(function () {
				browser.assert.text('#TestSNPFormValid', '0');
			});
			
			before(function () {
				return browser.fill(SNPFormPhoneField, SNPDocumentPhone);
			});

			it('sends SNPFormDidFill', function () {
				browser.assert.text('#TestSNPFormDidFill', '1');
				browser.assert.text('#TestSNPFormDidFillData', JSON.stringify(SNPFormPhoneLogic.SNPFormPhoneDocument({
					SNPDocumentPhone,
				})));
			});

			it('sends SNPFormValid', function () {
				browser.assert.text('#TestSNPFormValid', '1');
				browser.assert.text('#TestSNPFormValidData', JSON.stringify(SNPFormPhoneLogic.SNPFormPhoneDocument({
					SNPDocumentPhone,
				})));
			});

			context('not valid', function () {

				const SNPDocumentPhone = '';
				
				before(function () {
					browser.assert.text('#TestSNPFormNotValid', '0');
				});
				
				before(function () {
					return browser.fill(SNPFormPhoneField, SNPDocumentPhone);
				});

				it('sends SNPFormDidFill', function () {
					browser.assert.text('#TestSNPFormDidFill', '2');
					browser.assert.text('#TestSNPFormDidFillData', JSON.stringify(SNPFormPhoneLogic.SNPFormPhoneDocument({
						SNPDocumentPhone,
					})));
				});

				it('sends SNPFormNotValid', function () {
					browser.assert.text('#TestSNPFormNotValid', '1');
				});
			
			});
		
		});
		
	});

});
