const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('SNPMake_Misc', function () {

	const SNPDocumentData = Math.random().toString();

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});


	describe('SNPMakeTypesScanButton', function test_SNPMakeTypesScanButton () {

		it('classes OLSKDecorButtonNoStyle', function () {
			browser.assert.hasClass(SNPMakeTypesScanButton, 'OLSKDecorButtonNoStyle');
		});

		it('classes OLSKDecorTappable', function () {
			browser.assert.hasClass(SNPMakeTypesScanButton, 'OLSKDecorTappable');
		});
	
	});
	
	describe('SNPMakeTypesLinkButton', function test_SNPMakeTypesLinkButton () {

		it('classes OLSKDecorButtonNoStyle', function () {
			browser.assert.hasClass(SNPMakeTypesLinkButton, 'OLSKDecorButtonNoStyle');
		});

		it('classes OLSKDecorTappable', function () {
			browser.assert.hasClass(SNPMakeTypesLinkButton, 'OLSKDecorTappable');
		});
	
	});
	
	describe('SNPMakeTypesNoteButton', function test_SNPMakeTypesNoteButton () {

		it('classes OLSKDecorButtonNoStyle', function () {
			browser.assert.hasClass(SNPMakeTypesNoteButton, 'OLSKDecorButtonNoStyle');
		});

		it('classes OLSKDecorTappable', function () {
			browser.assert.hasClass(SNPMakeTypesNoteButton, 'OLSKDecorTappable');
		});
	
	});
	
	describe('SNPMakeTypesPhoneButton', function test_SNPMakeTypesPhoneButton () {

		it('classes OLSKDecorButtonNoStyle', function () {
			browser.assert.hasClass(SNPMakeTypesPhoneButton, 'OLSKDecorButtonNoStyle');
		});

		it('classes OLSKDecorTappable', function () {
			browser.assert.hasClass(SNPMakeTypesPhoneButton, 'OLSKDecorTappable');
		});
	
	});
	
	describe('SNPMakeTypesEmailButton', function test_SNPMakeTypesEmailButton () {

		it('classes OLSKDecorButtonNoStyle', function () {
			browser.assert.hasClass(SNPMakeTypesEmailButton, 'OLSKDecorButtonNoStyle');
		});

		it('classes OLSKDecorTappable', function () {
			browser.assert.hasClass(SNPMakeTypesEmailButton, 'OLSKDecorTappable');
		});
	
	});
	
	describe('SNPMakeTypesWifiButton', function test_SNPMakeTypesWifiButton () {

		it('classes OLSKDecorButtonNoStyle', function () {
			browser.assert.hasClass(SNPMakeTypesWifiButton, 'OLSKDecorButtonNoStyle');
		});

		it('classes OLSKDecorTappable', function () {
			browser.assert.hasClass(SNPMakeTypesWifiButton, 'OLSKDecorTappable');
		});
	
	});

	describe('SNPMakeDataNotValid', function test_SNPMakeDataNotValid () {

		it('sets src', function () {
			browser.assert.elements(`${ SNPMakeDataNotValid } #_OLSKSharedIconPlaceholder`, 1);
		});
	
	});

	describe('SNPMakeDataValid', function test_SNPMakeDataValid () {

		before(function () {
			return browser.pressButton('.SNPMakeTypesNoteButton');
		});
		
		before(function () {
			return browser.fill('.SNPFormDataField', SNPDocumentData);
		});

		it.skip('creates canvas', function () {
			browser.assert.elements(`${ SNPMakeDataValid } canvas`, 1);
		});

		it('sends SNPFormValid', function () {
			browser.assert.text('#TestSNPFormValid', '1');
			browser.assert.text('#TestSNPFormValidData', JSON.stringify({
				SNPDocumentData,
				SNPDocumentType: 'TYPE_NOTE',
			}));
		});
	
	});

	context('submit', function () {
		
		before(function () {
			return browser.assert.text('#TestSNPFormDidSubmit', '0');
		});

		before(function () {
			return browser.pressButton('.SNPFormBaseSaveButton');
		});

		it('sends SNPFormDidSubmit', function () {
			browser.assert.text('#TestSNPFormDidSubmit', '1');
			browser.assert.text('#TestSNPFormDidSubmitData', JSON.stringify({
				SNPDocumentData,
				SNPDocumentType: 'TYPE_NOTE',
			}));
		});
	
	});

	describe('change type 1', function () {

		const SNPDocumentData2 = Math.random().toString();

		before(function () {
			return browser.pressButton(SNPMakeTypesLinkButton);
		});
		
		before(function () {
			return browser.fill('.SNPFormDataField', SNPDocumentData2);
		});

		before(function () {
			return browser.pressButton(SNPMakeTypesNoteButton);
		});

		it('saves first input', function () {
			return browser.assert.input('.SNPFormDataField', SNPDocumentData);
		});

		describe('change type 2', function () {

			before(function () {
				return browser.pressButton(SNPMakeTypesLinkButton);
			});
			
			it('saves second input', function () {
				return browser.assert.input('.SNPFormDataField', SNPDocumentData2);
			});
			
		});
		
	});

	context('scan', function () {
		
		before(function () {
			return browser.pressButton(SNPMakeScanButton);
		});

		it('hides SNPFormBase', function () {
			browser.assert.elements('.SNPFormBase', 0);
		});

		it('shows SNPScan', function () {
			browser.assert.elements('.SNPScan', 1);
		});

		describe('change type', function () {

			before(function () {
				return browser.pressButton(SNPMakeTypesLinkButton);
			});
			
			it('shows SNPFormBase', function () {
				browser.assert.elements('.SNPFormBase', 1);
			});

			it('hides SNPScan', function () {
				browser.assert.elements('.SNPScan', 0);
			});
			
		});

		context('Parse', function () {
			
			before(function () {
				return browser.pressButton(SNPMakeScanButton);
			});

			before(function () {
				browser.assert.text('#TestSNPFormValid', '1');
			});

			before(function () {
				return browser.pressButton('#TestMessageReadDidParseButton');
			});

			it('sends SNPFormValid', function () {
				browser.assert.text('#TestSNPFormValid', '2');
			});

			context('SNPFormBaseSaveButton', function () {
				
				it('sets disabled', function () {
					browser.assert.attribute('.SNPFormBaseSaveButton', 'disabled', null);
				});
			
			});
		
		});
	
	});

});
