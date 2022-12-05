exports.OLSKControllerRoutes = function() {
	return [{
		OLSKRoutePath: '/stub/SNPScan',
		OLSKRouteMethod: 'get',
		OLSKRouteSignature: 'SNPScanStubRoute',
		OLSKRouteFunction (req, res, next) {
			return res.OLSKExpressLayoutRender(require('path').join(__dirname, 'stub-view'));
		},
		OLSKRouteLanguageCodes: ['en', 'fr', 'es', 'pt'],
	}];
};
