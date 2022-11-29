exports.OLSKControllerRoutes = function() {
	return [{
		OLSKRoutePath: '/stub/SNPPlayListItem',
		OLSKRouteMethod: 'get',
		OLSKRouteSignature: 'SNPPlayListItemStubRoute',
		OLSKRouteFunction (req, res, next) {
			return res.OLSKExpressLayoutRender(require('path').join(__dirname, 'stub-view'));
		},
	}];
};
