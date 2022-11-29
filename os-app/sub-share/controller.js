exports.OLSKControllerRoutes = function() {
	return [{
		OLSKRoutePath: '/stub/SNPPlayShare',
		OLSKRouteMethod: 'get',
		OLSKRouteSignature: 'SNPPlayShareStubRoute',
		OLSKRouteFunction (req, res, next) {
			return res.OLSKExpressLayoutRender(require('path').join(__dirname, 'stub-view'));
		},
		OLSKRouteLanguageCodes: ['en', 'fr', 'es', 'pt'],
	}];
};
