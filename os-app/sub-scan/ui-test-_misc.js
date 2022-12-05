const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

const SNPDocument = require('../_shared/SNPDocument/main.js').default;

describe('SNPScan_Misc', function () {

	const DebugFakeParseContent = Math.random().toString();

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			DebugFakeParseContent,
		});
	});

	describe('SNPScanReader', function test_SNPScanReader () {

		before(function () {
			return browser.pressButton(SNPScanStartButton);
		});

		it('sets id', function () {
			browser.assert.attribute(SNPScanReader, 'id', 'SNPScanReader');
		});

		it('sets style', function () {
			browser.assert.attribute(SNPScanReader, 'style', 'width: 300px;');
		});

		context('Parse', function () {

			before(function () {
				return browser.assert.text('#TestSNPScanDidSucceed', '0');
			});

			before(function () {
				return browser.pressButton('#TestMessageReadDidParseButton');
			});
			
			it('sends SNPScanDidSucceed', function () {
				browser.assert.text('#TestSNPScanDidSucceed', '1');
				browser.assert.text('#TestSNPScanDidSucceedData', JSON.stringify({
					SNPDocumentData: DebugFakeParseContent,
					SNPDocumentType: SNPDocument.SNPDocumentTypeNote(),
				}));
			});

		});
		
	});

	describe('SNPScanFileInput', function test_SNPScanFileInput () {

		before(function () {
			return browser.pressButton(SNPScanStopButton);
		});

		it('sets type', function () {
			browser.assert.attribute(SNPScanFileInput, 'type', 'file');
		});

		it('sets accept', function () {
			browser.assert.attribute(SNPScanFileInput, 'accept', 'image/*');
		});
		
	});

});
