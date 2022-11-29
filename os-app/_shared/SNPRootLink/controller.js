exports.OLSKControllerRoutes = function() {
	return [{
		OLSKRoutePath: '/stub/SNPRootLink',
		OLSKRouteMethod: 'get',
		OLSKRouteFunction (req, res, next) {
			return res.OLSKExpressLayoutRender(require('path').join(__dirname, 'main'));
		},
		OLSKRouteSignature: 'SNPRootLinkStubRoute',
		OLSKRouteLanguageCodes: ['en', 'fr', 'es', 'pt'],
		OLSKRouteIsHidden: process.env.NODE_ENV === 'production',
	}];
};
