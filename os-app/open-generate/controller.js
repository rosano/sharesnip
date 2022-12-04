const kSNPGenerateServiceWorkerVersionID = Date.now().toString();

const OLSKServiceWorker = require('../../node_modules/OLSKServiceWorker/main.js');

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
			OLSKRouteSignature: 'SNPGenerateServiceWorkerRoute',
			OLSKRoutePath: '/qr-code-generator/sw.js',
			OLSKRouteMethod: 'get',
			OLSKRouteFunction (req, res, next) {
				return res.type('js').send(OLSKServiceWorker.OLSKServiceWorkerView({
					VERSION_ID_TOKEN: kSNPGenerateServiceWorkerVersionID,
					ORIGIN_PAGE_PATH_TOKEN: res.locals.OLSKCanonical('SNPGenerateRoute'),
				}));
			},
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
