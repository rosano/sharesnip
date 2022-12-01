exports.OLSKControllerRoutes = function() {
	return [{
		OLSKRoutePath: '/stub/SNPCodeFormLink',
		OLSKRouteMethod: 'get',
		OLSKRouteSignature: 'SNPCodeFormLinkStubRoute',
		OLSKRouteFunction (req, res, next) {
			return res.OLSKExpressLayoutRender(require('path').join(__dirname, 'stub-view'));
		},
		OLSKRouteLanguageCodes: ['en', 'fr', 'es', 'pt'],
	}];
};
