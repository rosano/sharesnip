const mod = {

	OLSKControllerRoutes () {
		return [{
			OLSKRoutePath: '/code',
			OLSKRouteMethod: 'get',
			OLSKRouteSignature: 'SNPCollectRoute',
			OLSKRouteFunction (req, res, next) {
				return res.OLSKExpressLayoutRender(require('path').join(__dirname, 'ui-view.ejs'));
			},
			OLSKRouteLanguageCodes: ['en', 'fr', 'es', 'pt'],
		}];
	},
};

Object.assign(exports, mod);
