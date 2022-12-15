const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

const SNPFormWifiLogic = require('./ui-logic.js').default;

describe('SNPFormWifi_Misc', function () {

	const SNPDocumentWifiNetwork = Math.random().toString();
	const SNPDocumentWifiPassword = Math.random().toString();
	const SNPDocumentWifiSecurity = Math.random().toString();
	const SNPDocumentWifiHidden = uRandomElement(true, false);

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			SNPFormObject: JSON.stringify(SNPFormWifiLogic.SNPFormWifiDocument({
				SNPDocumentWifiNetwork,
				SNPDocumentWifiPassword,
				SNPDocumentWifiSecurity,
				SNPDocumentWifiHidden,
			})),
		});
	});

	describe('SNPFormWifiNetworkField', function test_SNPFormWifiNetworkField () {

		it('classes SNPFormDataField', function () {
			browser.assert.hasClass(SNPFormWifiNetworkField, 'SNPFormDataField');
		});

		it('sets type', function () {
			browser.assert.attribute(SNPFormWifiNetworkField, 'type', 'text');
		});

		it('sets required', function () {
			browser.assert.attribute(SNPFormWifiNetworkField, 'required', '');
		});

		it('sets autofocus', function () {
			browser.assert.attribute(SNPFormWifiNetworkField, 'autofocus', '');
		});

		it('binds SNPDocumentWifiNetwork', function () {
			browser.assert.input(SNPFormWifiNetworkField, SNPDocumentWifiNetwork);
		});
		
	});

	describe('SNPFormWifiPasswordField', function test_SNPFormWifiPasswordField () {

		it('sets type', function () {
			browser.assert.attribute(SNPFormWifiPasswordField, 'type', 'text');
		});

		it('binds SNPDocumentWifiPassword', function () {
			browser.assert.input(SNPFormWifiPasswordField, SNPDocumentWifiPassword);
		});
		
	});

	context('valid', function () {

		const SNPDocumentWifiNetwork = Math.random().toString();

		before(function () {
			browser.assert.text('#TestSNPFormDidFill', '0');
		});
		
		before(function () {
			browser.assert.text('#TestSNPFormValid', '0');
		});
		
		before(function () {
			return browser.fill(SNPFormWifiNetworkField, SNPDocumentWifiNetwork);
		});

		it('sends SNPFormDidFill', function () {
			browser.assert.text('#TestSNPFormDidFill', '1');
			browser.assert.text('#TestSNPFormDidFillData', JSON.stringify(SNPFormWifiLogic.SNPFormWifiDocument({
				SNPDocumentWifiNetwork,
				SNPDocumentWifiPassword,
				SNPDocumentWifiSecurity,
				SNPDocumentWifiHidden,
			})));
		});

		it('sends SNPFormValid', function () {
			browser.assert.text('#TestSNPFormValid', '1');
			browser.assert.text('#TestSNPFormValidData', JSON.stringify(SNPFormWifiLogic.SNPFormWifiDocument({
				SNPDocumentWifiNetwork,
				SNPDocumentWifiPassword,
				SNPDocumentWifiSecurity,
				SNPDocumentWifiHidden,
			})));
		});

		context.skip('not valid', function () {

			const SNPDocumentWifiNetwork = '';
			
			before(function () {
				browser.assert.text('#TestSNPFormNotValid', '0');
			});
			
			before(function () {
				return browser.fill(SNPFormWifiNetworkField, SNPDocumentWifiNetwork);
			});

			it('sends SNPFormDidFill', function () {
				browser.assert.text('#TestSNPFormDidFill', '2');
				browser.assert.text('#TestSNPFormDidFillData', JSON.stringify(SNPFormWifiLogic.SNPFormWifiDocument({
					SNPDocumentWifiNetwork,
					SNPDocumentWifiPassword,
					SNPDocumentWifiSecurity,
					SNPDocumentWifiHidden,
				})));
			});

			it('sends SNPFormNotValid', function () {
				browser.assert.text('#TestSNPFormNotValid', '1');
			});
		
		});
	
	});

});
