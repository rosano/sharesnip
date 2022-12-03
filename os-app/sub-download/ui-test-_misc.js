const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('SNPDownload_Misc', function () {

	const SNPDownloadData = Math.random().toString();
	const SNPDownloadBasename = Math.random().toString();

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			SNPDownloadData,
			SNPDownloadBasename,
		});
	});

	describe('SNPDownloadButton', function test_SNPDownloadButton () {

		before(function () {
			return browser.pressButton(SNPDownloadButton);
		});
		
		it('binds SNPDocumentName', function () {
			browser.assert.OLSKAlertText(function () {
				return browser.pressButton(SNPDownloadButton);
			}, JSON.stringify({
				SNPDownloadData,
				SNPDownloadFilename: `${ SNPDownloadBasename }.png`,
			}));
		});
	
	});

});
