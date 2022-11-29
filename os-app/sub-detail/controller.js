exports.OLSKControllerRoutes = function() {
	return [{
		OLSKRoutePath: '/stub/SNPPlayDetail',
		OLSKRouteMethod: 'get',
		OLSKRouteSignature: 'SNPPlayDetailStubRoute',
		OLSKRouteFunction (req, res, next) {
			return res.OLSKExpressLayoutRender(require('path').join(__dirname, 'stub-view'));
		},
		OLSKRouteLanguageCodes: ['en', 'fr', 'es', 'pt'],
	}];
};
