const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

kDefaultRoute.OLSKRouteLanguageCodes.forEach(function (OLSKRoutingLanguage) {

	const uLocalized = function (inputData) {
		return OLSKTestingLocalized(inputData, OLSKRoutingLanguage);
	};

	describe('SNPScan_Localize-' + OLSKRoutingLanguage, function () {

		const DebugFakeReadErrorMessage = Math.random().toString();
		const DebugFakeParseErrorMessage = Math.random().toString();

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				OLSKRoutingLanguage,
				DebugFakeReadErrorMessage,
				DebugFakeParseErrorMessage,
			});
		});

		it('localizes SNPScanStartButton', function () {
			browser.assert.text(SNPScanStartButton, uLocalized('SNPScanStartButtonText'));
		});

		context('ScanStart', function () {

			before(function () {
				return browser.pressButton(SNPScanStartButton);
			});
			
			it('localizes SNPScanStopButton', function () {
				browser.assert.text(SNPScanStopButton, uLocalized('SNPScanStopButtonText'));
			});
		
		});

		context('ReadError', function () {
			
			before(function () {
				return browser.pressButton('#TestMessageReadErrorButton');
			});

			it('localizes SNPScanReadError', function () {
				browser.assert.text(SNPScanReadError, OLSKTestingFormatted(uLocalized('SNPScanReadErrorTextFormat'), DebugFakeReadErrorMessage));
			});
		
		});

		context('ParseError', function () {
			
			before(function () {
				return browser.pressButton('#TestMessageParseErrorButton');
			});

			it('localizes SNPScanParseError', function () {
				browser.assert.text(SNPScanParseError, OLSKTestingFormatted(uLocalized('SNPScanParseErrorTextFormat'), DebugFakeParseErrorMessage));
			});
		
		});

	});

});
