exports.OLSKControllerRoutes = function () {
	return [{
		OLSKRoutePath: '/guide',
		OLSKRouteMethod: 'get',
		OLSKRouteSignature: 'SNPGuideRoute',
		OLSKRouteFunction(req, res, next) {
			return res.OLSKExpressLayoutRender(require('path').join(__dirname, 'ui-view'), {
				SNPGuideContent: res.OLSKMarkdownContent(require('path').join(__dirname, `text-${ res.locals.OLSKSharedPageCurrentLanguage }.md`), {
					SNPCollectRoute: res.locals.OLSKCanonical('SNPCollectRoute'),
				}),
				OLSKStringReplaceTokens: require('OLSKString').OLSKStringReplaceTokens,
			});
		},
		_OLSKRouteLanguageCodes: ['en'],
	}];
};
