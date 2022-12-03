const mod = {

	OLSKControllerRoutes () {
		return [{
			OLSKRoutePath: '/qr-code-generator',
			OLSKRouteMethod: 'get',
			OLSKRouteSignature: 'SNPGenerateRoute',
			OLSKRouteFunction (req, res, next) {
				return res.OLSKExpressLayoutRender(require('path').join(__dirname, 'ui-view.ejs'));
			},
			OLSKRouteLanguageCodes: ['en', 'fr', 'es', 'pt'],
		}, {
			OLSKRoutePath: '/generate/manifest.json',
			OLSKRouteMethod: 'get',
			OLSKRouteSignature: 'SNPGenerateManifestRoute',
			OLSKRouteFunction (req, res, next) {
				return res.json({
					name: 'Sharesnip',
					short_name: 'Sharesnip',
					start_url: res.locals.OLSKCanonical('SNPGenerateRoute'),
					display: 'standalone',
					background_color: 'black',
					theme_color: 'black',
					icons: [{
						src: process.env.OLSK_LAYOUT_TOUCH_ICON_URL,
						sizes: '600x600',
						type: 'image/png',
						purpose: 'any maskable',
					}],
				});
			},
		}];
	},
};

Object.assign(exports, mod);
