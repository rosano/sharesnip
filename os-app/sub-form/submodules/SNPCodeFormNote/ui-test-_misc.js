const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('SNPCodeFormNote_Misc', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});

	describe('SNPCodeFormNoteField', function test_SNPCodeFormNoteField () {

		it('sets type', function () {
			browser.assert.attribute(SNPCodeFormNoteField, 'type', 'text');
		});

		it('sets required', function () {
			browser.assert.attribute(SNPCodeFormNoteField, 'required', '');
		});

		context('fill', function () {
			
			before(function () {
				browser.assert.text('#TestSNPCodeFormValid', '0');
			});
			
			before(function () {
				return browser.fill(SNPCodeFormNoteField, Math.random().toString());
			});

			it('sends SNPCodeFormValid', function () {
				browser.assert.text('#TestSNPCodeFormValid', '1');
			});

			context('empty', function () {
				
				before(function () {
					browser.assert.text('#TestSNPCodeFormNotValid', '0');
				});
				
				before(function () {
					return browser.fill(SNPCodeFormNoteField, '');
				});

				it('sends SNPCodeFormValid', function () {
					browser.assert.text('#TestSNPCodeFormNotValid', '1');
				});
			
			});
		
		});
		
	});

});
