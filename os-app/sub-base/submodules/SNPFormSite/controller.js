exports.OLSKControllerRoutes = function() {
	return [{
		OLSKRoutePath: '/stub/SNPFormSite',
		OLSKRouteMethod: 'get',
		OLSKRouteSignature: 'SNPFormSiteStubRoute',
		OLSKRouteFunction (req, res, next) {
			return res.OLSKExpressLayoutRender(require('path').join(__dirname, 'stub-view'));
		},
		OLSKRouteLanguageCodes: ['en', 'fr', 'es', 'pt'],
	}];
};
