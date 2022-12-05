const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

const OLSKFormEmailLogic = require('./ui-logic.js').default;

describe('SNPFormEmail_Misc', function () {

	const SNPDocumentEmail = uEmail();

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			SNPFormObject: JSON.stringify(OLSKFormEmailLogic.SNPFormEmailDocument({
				SNPDocumentEmail,
			})),
		});
	});

	describe('SNPFormEmailField', function test_SNPFormEmailField () {

		it('classes SNPFormDataField', function () {
			browser.assert.hasClass(SNPFormEmailField, 'SNPFormDataField');
		});

		it('sets type', function () {
			browser.assert.attribute(SNPFormEmailField, 'type', 'email');
		});

		it('sets required', function () {
			browser.assert.attribute(SNPFormEmailField, 'required', '');
		});

		it('sets autofocus', function () {
			browser.assert.attribute(SNPFormEmailField, 'autofocus', '');
		});

		it('sets placeholder', function () {
			browser.assert.attribute(SNPFormEmailField, 'placeholder', 'hello@example.com');
		});

		it('binds SNPDocumentEmail', function () {
			browser.assert.input(SNPFormEmailField, SNPDocumentEmail);
		});

		context('valid', function () {

			const SNPDocumentEmail = uEmail();

			before(function () {
				browser.assert.text('#TestSNPFormDidFill', '0');
			});
			
			before(function () {
				browser.assert.text('#TestSNPFormValid', '0');
			});
			
			before(function () {
				return browser.fill(SNPFormEmailField, SNPDocumentEmail);
			});

			it('sends SNPFormDidFill', function () {
				browser.assert.text('#TestSNPFormDidFill', '1');
				browser.assert.text('#TestSNPFormDidFillData', JSON.stringify(OLSKFormEmailLogic.SNPFormEmailDocument({
					SNPDocumentEmail,
				})));
			});

			it('sends SNPFormValid', function () {
				browser.assert.text('#TestSNPFormValid', '1');
				browser.assert.text('#TestSNPFormValidData', JSON.stringify(OLSKFormEmailLogic.SNPFormEmailDocument({
					SNPDocumentEmail,
				})));
			});

			context('not valid', function () {

				const SNPDocumentEmail = Math.random().toString();
				
				before(function () {
					browser.assert.text('#TestSNPFormNotValid', '0');
				});
				
				before(function () {
					return browser.fill(SNPFormEmailField, SNPDocumentEmail);
				});

				it('sends SNPFormDidFill', function () {
					browser.assert.text('#TestSNPFormDidFill', '2');
					browser.assert.text('#TestSNPFormDidFillData', JSON.stringify(OLSKFormEmailLogic.SNPFormEmailDocument({
					SNPDocumentEmail,
				})));
				});

				it('sends SNPFormNotValid', function () {
					browser.assert.text('#TestSNPFormNotValid', '1');
				});
			
			});
		
		});
		
	});

});
