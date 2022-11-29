exports.OLSKControllerRoutes = function() {
	return [{
		OLSKRoutePath: '/stub/SNPCodeDetail',
		OLSKRouteMethod: 'get',
		OLSKRouteSignature: 'SNPCodeDetailStubRoute',
		OLSKRouteFunction (req, res, next) {
			return res.OLSKExpressLayoutRender(require('path').join(__dirname, 'stub-view'));
		},
		OLSKRouteLanguageCodes: ['en', 'fr', 'es', 'pt'],
	}];
};
