exports.OLSKControllerRoutes = function() {
	return [{
		OLSKRoutePath: '/stub/SNPCodeShare',
		OLSKRouteMethod: 'get',
		OLSKRouteSignature: 'SNPCodeShareStubRoute',
		OLSKRouteFunction (req, res, next) {
			return res.OLSKExpressLayoutRender(require('path').join(__dirname, 'stub-view'));
		},
		OLSKRouteLanguageCodes: ['en', 'fr', 'es', 'pt'],
	}];
};
