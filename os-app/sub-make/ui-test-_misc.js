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
			return browser.fill('.SNPCodeFormDataField', SNPDocumentData);
		});

		it.skip('creates canvas', function () {
			browser.assert.elements(`${ SNPMakeCodeValid } canvas`, 1);
		});
	
	});

	context('submit', function () {
		
		before(function () {
			return browser.assert.text('#TestSNPCodeFormDidSubmit', '0');
		});

		before(function () {
			return browser.pressButton('.SNPFormBaseSaveButton');
		});

		it('sends SNPCodeFormDidSubmit', function () {
			browser.assert.text('#TestSNPCodeFormDidSubmit', '1');
			browser.assert.text('#TestSNPCodeFormDidSubmitData', JSON.stringify({
				SNPDocumentType: 'TYPE_NOTE',
				SNPDocumentData,
			}));
		});
	
	});

	describe('change type 1', function () {

		const SNPDocumentData2 = Math.random().toString();

		before(function () {
			return browser.pressButton(SNPMakeTypesLinkButton);
		});
		
		before(function () {
			return browser.fill('.SNPCodeFormDataField', SNPDocumentData2);
		});

		before(function () {
			return browser.pressButton(SNPMakeTypesNoteButton);
		});

		it('saves first input', function () {
			return browser.assert.input('.SNPCodeFormDataField', SNPDocumentData);
		});

		describe('change type 2', function () {

			before(function () {
				return browser.pressButton(SNPMakeTypesLinkButton);
			});
			
			it('saves second input', function () {
				return browser.assert.input('.SNPCodeFormDataField', SNPDocumentData2);
			});
			
		});
		
	});

});
