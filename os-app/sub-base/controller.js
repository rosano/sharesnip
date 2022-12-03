exports.OLSKControllerRoutes = function() {
	return [{
		OLSKRoutePath: '/stub/SNPFormBase',
		OLSKRouteMethod: 'get',
		OLSKRouteSignature: 'SNPFormBaseStubRoute',
		OLSKRouteFunction (req, res, next) {
			return res.OLSKExpressLayoutRender(require('path').join(__dirname, 'stub-view'));
		},
		OLSKRouteLanguageCodes: ['en', 'fr', 'es', 'pt'],
	}];
};
