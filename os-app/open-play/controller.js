const mod = {

	OLSKControllerRoutes () {
		return [{
			OLSKRoutePath: '/play',
			OLSKRouteMethod: 'get',
			OLSKRouteSignature: 'SNPCodeRoute',
			OLSKRouteFunction (req, res, next) {
				return res.OLSKExpressLayoutRender(require('path').join(__dirname, 'ui-view.ejs'));
			},
			OLSKRouteLanguageCodes: ['en', 'fr', 'es', 'pt'],
		}, {
			OLSKRoutePath: '/proxy',
			OLSKRouteMethod: 'get',
			OLSKRouteSignature: 'SNPProxyRoute',
			async OLSKRouteFunction (req, res, next) {
				return res.send(await (await require('node-fetch')(req.query.uri)).text());
			},
		}];
	},
};

Object.assign(exports, mod);
