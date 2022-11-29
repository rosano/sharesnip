const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('SNPCodeMake_Misc', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});

	describe('SNPCodeMake', function test_SNPCodeMake () {

		const SNPDocumentData = Math.random().toString();

		before(function () {
			return browser.pressButton('.SNPCodeMakeTypesNoteButton');
		});
		
		before(function () {
			return browser.fill('.SNPCodeFormDataField', SNPDocumentData);
		});

		before(function () {
			return browser.assert.text('#TestSNPCodeFormDidSubmit', '0');
		});

		before(function () {
			return browser.pressButton('.SNPCodeFormBaseSaveButton');
		});

		it('sends SNPCodeFormDidSubmit', function () {
			browser.assert.text('#TestSNPCodeFormDidSubmit', '1');
			browser.assert.text('#TestSNPCodeFormDidSubmitData', JSON.stringify({
				SNPDocumentName: '',
				SNPDocumentType: 'TYPE_NOTE',
				SNPDocumentData,
			}));
		});
		
	});

});
