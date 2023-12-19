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

	describe('SNPDownloadPNGButton', function test_SNPDownloadPNGButton () {

		it('classes OLSKDecorTappable', function () {
			browser.assert.hasClass(SNPDownloadPNGButton, 'OLSKDecorTappable');
		});

		it('sets text', function () {
			browser.assert.text(SNPDownloadPNGButton, 'PNG');
		});
	
	});

	describe('SNPDownloadSVGButton', function test_SNPDownloadSVGButton () {

		it('classes OLSKDecorTappable', function () {
			browser.assert.hasClass(SNPDownloadSVGButton, 'OLSKDecorTappable');
		});

		it('sets text', function () {
			browser.assert.text(SNPDownloadSVGButton, 'SVG');
		});
	
	});

	describe('SNPDownloadButton', function test_SNPDownloadButton () {

		const button = uRandomElement('.SNPDownloadPNGButton', '.SNPDownloadSVGButton');

		before(function () {
			return browser.click(button);
		});
		
		it('binds SNPDocumentName', async function () {
			deepEqual(await browser.OLSKAlertText(function () {
				return browser.pressButton(SNPDownloadButton);
			}), JSON.stringify({
				SNPDownloadData,
				SNPDownloadFilename: `${ SNPDownloadBasename }.${ button.match(/(PNG|SVG)/).pop().toLowerCase() }`,
			}));
		});
	
	});

});
