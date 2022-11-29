const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('SNPCodeMake_Misc', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});

	describe('SNPCodeMakeNoteButton', function test_SNPCodeMakeNoteButton () {

		context('click', function () {
			
			before(function () {
				browser.assert.text('#TestSNPCodeMakeDispatchNote', '0');
			});
			
			before(function () {
				return browser.pressButton(SNPCodeMakeNoteButton);
			});

			it('sends SNPCodeMakeDispatchNote', function () {
				browser.assert.text('#TestSNPCodeMakeDispatchNote', '1');
			});
		
		});
		
	});

	describe('SNPCodeMakeLinkButton', function test_SNPCodeMakeLinkButton () {

		context('click', function () {
			
			before(function () {
				browser.assert.text('#TestSNPCodeMakeDispatchLink', '0');
			});
			
			before(function () {
				return browser.pressButton(SNPCodeMakeLinkButton);
			});

			it('sends SNPCodeMakeDispatchLink', function () {
				browser.assert.text('#TestSNPCodeMakeDispatchLink', '1');
			});
		
		});
		
	});

});
