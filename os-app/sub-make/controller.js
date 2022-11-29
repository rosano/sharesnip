exports.OLSKControllerRoutes = function() {
	return [{
		OLSKRoutePath: '/stub/SNPCodeMake',
		OLSKRouteMethod: 'get',
		OLSKRouteSignature: 'SNPCodeMakeStubRoute',
		OLSKRouteFunction (req, res, next) {
			return res.OLSKExpressLayoutRender(require('path').join(__dirname, 'stub-view'));
		},
		OLSKRouteLanguageCodes: ['en', 'fr', 'es', 'pt'],
	}];
};
