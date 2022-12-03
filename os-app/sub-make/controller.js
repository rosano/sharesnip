exports.OLSKControllerRoutes = function() {
	return [{
		OLSKRoutePath: '/stub/SNPMake',
		OLSKRouteMethod: 'get',
		OLSKRouteSignature: 'SNPMakeStubRoute',
		OLSKRouteFunction (req, res, next) {
			return res.OLSKExpressLayoutRender(require('path').join(__dirname, 'stub-view'));
		},
		OLSKRouteLanguageCodes: ['en', 'fr', 'es', 'pt'],
	}];
};
