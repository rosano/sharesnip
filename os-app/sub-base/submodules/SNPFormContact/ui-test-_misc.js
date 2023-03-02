const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

const SNPFormContactLogic = require('./ui-logic.js').default;

describe('SNPFormContact_Misc', function () {

	const SNPDocumentContactFirstName = Math.random().toString();
	const SNPDocumentContactLastName = Math.random().toString();
	const SNPDocumentContactPhone = Math.random().toString();
	const SNPDocumentContactEmail = Math.random().toString();
	const SNPDocumentContactSite = Math.random().toString();
	const SNPDocumentContactOrganization = Math.random().toString();
	
	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			SNPFormObject: JSON.stringify(SNPFormContactLogic.SNPFormContactDocument({
				SNPDocumentContactFirstName,
				SNPDocumentContactLastName,
				SNPDocumentContactPhone,
				SNPDocumentContactEmail,
				SNPDocumentContactSite,
				SNPDocumentContactOrganization,
			})),
		});
	});

	describe('SNPFormContactFirstNameField', function test_SNPFormContactFirstNameField () {

		it('classes SNPFormDataField', function () {
			browser.assert.hasClass(SNPFormContactFirstNameField, 'SNPFormDataField');
		});

		it('sets type', function () {
			browser.assert.attribute(SNPFormContactFirstNameField, 'type', 'text');
		});

		it('sets autofocus', function () {
			browser.assert.attribute(SNPFormContactFirstNameField, 'autofocus', '');
		});

		it('binds SNPDocumentContactFirstName', function () {
			browser.assert.input(SNPFormContactFirstNameField, SNPDocumentContactFirstName);
		});
		
	});

	describe('SNPFormContactLastNameField', function test_SNPFormContactLastNameField () {

		it('sets type', function () {
			browser.assert.attribute(SNPFormContactLastNameField, 'type', 'text');
		});

		it('binds SNPDocumentContactLastName', function () {
			browser.assert.input(SNPFormContactLastNameField, SNPDocumentContactLastName);
		});
		
	});

	describe('SNPFormContactPhoneField', function test_SNPFormContactPhoneField () {

		it('sets type', function () {
			browser.assert.attribute(SNPFormContactPhoneField, 'type', 'tel');
		});

		it('binds SNPDocumentContactPhone', function () {
			browser.assert.input(SNPFormContactPhoneField, SNPDocumentContactPhone);
		});
		
	});

	describe('SNPFormContactEmailField', function test_SNPFormContactEmailField () {

		it('sets type', function () {
			browser.assert.attribute(SNPFormContactEmailField, 'type', 'email');
		});

		it('binds SNPDocumentContactEmail', function () {
			browser.assert.input(SNPFormContactEmailField, SNPDocumentContactEmail);
		});
		
	});

	describe('SNPFormContactSiteField', function test_SNPFormContactSiteField () {

		it('sets type', function () {
			browser.assert.attribute(SNPFormContactSiteField, 'type', 'url');
		});

		it('binds SNPDocumentContactSite', function () {
			browser.assert.input(SNPFormContactSiteField, SNPDocumentContactSite);
		});
		
	});

	describe('SNPFormContactLastNameField', function test_SNPFormContactLastNameField () {

		it('sets type', function () {
			browser.assert.attribute(SNPFormContactLastNameField, 'type', 'text');
		});

		it('binds SNPDocumentContactLastName', function () {
			browser.assert.input(SNPFormContactLastNameField, SNPDocumentContactLastName);
		});
		
	});

	describe('SNPFormContactOrganizationField', function test_SNPFormContactOrganizationField () {

		it('sets type', function () {
			browser.assert.attribute(SNPFormContactOrganizationField, 'type', 'text');
		});

		it('binds SNPDocumentContactOrganization', function () {
			browser.assert.input(SNPFormContactOrganizationField, SNPDocumentContactOrganization);
		});
		
	});

	context('valid', function () {

		const SNPDocumentContactFirstName = Math.random().toString();

		before(function () {
			browser.assert.text('#TestSNPFormDidFill', '0');
		});
		
		before(function () {
			browser.assert.text('#TestSNPFormValid', '0');
		});
		
		before(function () {
			return browser.fill(SNPFormContactFirstNameField, SNPDocumentContactFirstName);
		});

		it('sends SNPFormDidFill', function () {
			browser.assert.text('#TestSNPFormDidFill', '1');
			browser.assert.text('#TestSNPFormDidFillData', JSON.stringify(SNPFormContactLogic.SNPFormContactDocument({
				SNPDocumentContactFirstName,
				SNPDocumentContactLastName,
				SNPDocumentContactOrganization,
			})));
		});

		it('sends SNPFormValid', function () {
			browser.assert.text('#TestSNPFormValid', '1');
			browser.assert.text('#TestSNPFormValidData', JSON.stringify(SNPFormContactLogic.SNPFormContactDocument({
				SNPDocumentContactFirstName,
				SNPDocumentContactLastName,
				SNPDocumentContactOrganization,
			})));
		});

		context.skip('not valid', function () {

			const SNPDocumentContactFirstName = '';
			
			before(function () {
				browser.assert.text('#TestSNPFormNotValid', '0');
			});
			
			before(function () {
				return browser.fill(SNPFormContactFirstNameField, SNPDocumentContactFirstName);
			});

			it('sends SNPFormDidFill', function () {
				browser.assert.text('#TestSNPFormDidFill', '2');
				browser.assert.text('#TestSNPFormDidFillData', JSON.stringify(SNPFormContactLogic.SNPFormContactDocument({
					SNPDocumentContactFirstName,
					SNPDocumentContactLastName,
				})));
			});

			it('sends SNPFormNotValid', function () {
				browser.assert.text('#TestSNPFormNotValid', '1');
			});
		
		});
	
	});

});
