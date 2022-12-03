exports.OLSKControllerRoutes = function() {
	return [{
		OLSKRoutePath: '/stub/SNPDownload',
		OLSKRouteMethod: 'get',
		OLSKRouteSignature: 'SNPDownloadStubRoute',
		OLSKRouteFunction (req, res, next) {
			return res.OLSKExpressLayoutRender(require('path').join(__dirname, 'stub-view'));
		},
		OLSKRouteLanguageCodes: ['en', 'fr', 'es', 'pt'],
	}];
};
