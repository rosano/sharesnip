const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('SNPCodeMake_Misc', function () {

	const SNPDocumentData = Math.random().toString();

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});

	describe('SNPCodeMakeCodeNotValid', function test_SNPCodeMakeCodeNotValid () {

		it('sets src', function () {
			browser.assert.elements(`${ SNPCodeMakeCodeNotValid } #_OLSKSharedIconPlaceholder`, 1);
		});
	
	});

	describe('SNPCodeMakeCodeValid', function test_SNPCodeMakeCodeValid () {

		before(function () {
			return browser.pressButton('.SNPCodeMakeTypesNoteButton');
		});
		
		before(function () {
			return browser.fill('.SNPCodeFormDataField', SNPDocumentData);
		});

		it.skip('creates canvas', function () {
			browser.assert.elements(`${ SNPCodeMakeCodeValid } canvas`, 1);
		});
	
	});

	context('submit', function () {
		
		before(function () {
			return browser.assert.text('#TestSNPCodeFormDidSubmit', '0');
		});

		before(function () {
			return browser.pressButton('.SNPCodeFormBaseSaveButton');
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
			return browser.pressButton(SNPCodeMakeTypesLinkButton);
		});
		
		before(function () {
			return browser.fill('.SNPCodeFormDataField', SNPDocumentData2);
		});

		before(function () {
			return browser.pressButton(SNPCodeMakeTypesNoteButton);
		});

		it('saves first input', function () {
			return browser.assert.input('.SNPCodeFormDataField', SNPDocumentData);
		});

		describe('change type 2', function () {

			before(function () {
				return browser.pressButton(SNPCodeMakeTypesLinkButton);
			});
			
			it('saves second input', function () {
				return browser.assert.input('.SNPCodeFormDataField', SNPDocumentData2);
			});
			
		});
		
	});

});
