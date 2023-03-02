exports.OLSKControllerRoutes = function() {
	return [{
		OLSKRoutePath: '/stub/SNPFormContact',
		OLSKRouteMethod: 'get',
		OLSKRouteSignature: 'SNPFormContactStubRoute',
		OLSKRouteFunction (req, res, next) {
			return res.OLSKExpressLayoutRender(require('path').join(__dirname, 'stub-view'));
		},
		OLSKRouteLanguageCodes: ['en', 'fr', 'es', 'pt'],
	}];
};
