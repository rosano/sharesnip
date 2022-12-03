const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('SNPMake_Misc', function () {

	const SNPDocumentData = Math.random().toString();

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});

	describe('SNPMakeCodeNotValid', function test_SNPMakeCodeNotValid () {

		it('sets src', function () {
			browser.assert.elements(`${ SNPMakeCodeNotValid } #_OLSKSharedIconPlaceholder`, 1);
		});
	
	});

	describe('SNPMakeCodeValid', function test_SNPMakeCodeValid () {

		before(function () {
			return browser.pressButton('.SNPMakeTypesNoteButton');
		});
		
		before(function () {
			return browser.fill('.SNPFormDataField', SNPDocumentData);
		});

		it.skip('creates canvas', function () {
			browser.assert.elements(`${ SNPMakeCodeValid } canvas`, 1);
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

});
