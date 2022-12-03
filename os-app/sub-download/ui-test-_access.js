const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	SNPDownload: '.SNPDownload',
	
	SNPDownloadHeading: '.SNPDownloadHeading',
	
	SNPDownloadButton: '.SNPDownloadButton',
}).map(function (e) {
	return global[e.shift()] = e.pop();
});

describe('SNPDownload_Access', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});

	it('shows SNPDownload', function () {
		browser.assert.elements(SNPDownload, 1);
	});

	it('shows SNPDownloadHeading', function () {
		browser.assert.elements(SNPDownloadHeading, 1);
	});

	it('shows SNPDownloadButton', function () {
		browser.assert.elements(SNPDownloadButton, 1);
	});

});
