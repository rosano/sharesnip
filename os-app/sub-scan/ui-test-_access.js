const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	SNPScan: '.SNPScan',
	
	SNPScanStartButton: '.SNPScanStartButton',
	SNPScanStopButton: '.SNPScanStopButton',
	SNPScanReader: '.SNPScanReader',
	SNPScanReadError: '.SNPScanReadError',
	SNPScanParseError: '.SNPScanParseError',
	SNPScanFileInput: '.SNPScanFileInput',
}).map(function (e) {
	return global[e.shift()] = e.pop();
});

describe('SNPScan_Access', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});

	it('shows SNPScan', function () {
		browser.assert.elements(SNPScan, 1);
	});

	it('shows SNPScanStartButton', function () {
		browser.assert.elements(SNPScanStartButton, 1);
	});

	it('hides SNPScanStopButton', function () {
		browser.assert.elements(SNPScanStopButton, 0);
	});

	it('shows SNPScanReader', function () {
		browser.assert.elements(SNPScanReader, 1);
	});

	it('hides SNPScanReadError', function () {
		browser.assert.elements(SNPScanReadError, 0);
	});

	it('hides SNPScanParseError', function () {
		browser.assert.elements(SNPScanParseError, 0);
	});

	it('shows SNPScanFileInput', function () {
		browser.assert.elements(SNPScanFileInput, 1);
	});

	context('ScanStart', function () {

		before(function () {
			return browser.pressButton(SNPScanStartButton);
		});
		
		it('hides SNPScanStartButton', function () {
			browser.assert.elements(SNPScanStartButton, 0);
		});

		it('shows SNPScanStopButton', function () {
			browser.assert.elements(SNPScanStopButton, 1);
		});

		it('hides SNPScanFileInput', function () {
			browser.assert.elements(SNPScanFileInput, 0);
		});
	
	});

	context('ReadError', function () {
		
		before(function () {
			return browser.pressButton('#TestMessageReadErrorButton');
		});

		it('shows SNPScanReadError', function () {
			browser.assert.elements(SNPScanReadError, 1);
		});
	
	});

	context('ParseError', function () {
		
		before(function () {
			return browser.pressButton('#TestMessageParseErrorButton');
		});

		it('shows SNPScanParseError', function () {
			browser.assert.elements(SNPScanParseError, 1);
		});
	
	});

});
