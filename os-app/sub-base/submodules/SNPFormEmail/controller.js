exports.OLSKControllerRoutes = function() {
	return [{
		OLSKRoutePath: '/stub/SNPFormEmail',
		OLSKRouteMethod: 'get',
		OLSKRouteSignature: 'SNPFormEmailStubRoute',
		OLSKRouteFunction (req, res, next) {
			return res.OLSKExpressLayoutRender(require('path').join(__dirname, 'stub-view'));
		},
		OLSKRouteLanguageCodes: ['en', 'fr', 'es', 'pt'],
	}];
};
