exports.OLSKControllerRoutes = function() {
	return [{
		OLSKRoutePath: '/stub/SNPFormPhone',
		OLSKRouteMethod: 'get',
		OLSKRouteSignature: 'SNPFormPhoneStubRoute',
		OLSKRouteFunction (req, res, next) {
			return res.OLSKExpressLayoutRender(require('path').join(__dirname, 'stub-view'));
		},
		OLSKRouteLanguageCodes: ['en', 'fr', 'es', 'pt'],
	}];
};
