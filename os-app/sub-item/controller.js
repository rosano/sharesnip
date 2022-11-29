exports.OLSKControllerRoutes = function() {
	return [{
		OLSKRoutePath: '/stub/SNPCodeListItem',
		OLSKRouteMethod: 'get',
		OLSKRouteSignature: 'SNPCodeListItemStubRoute',
		OLSKRouteFunction (req, res, next) {
			return res.OLSKExpressLayoutRender(require('path').join(__dirname, 'stub-view'));
		},
	}];
};
