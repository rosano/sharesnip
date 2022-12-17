const kSNPGenerateServiceWorkerVersionID = Date.now().toString();

const OLSKServiceWorker = require('../../node_modules/OLSKServiceWorker/main.js');

const kSNPGenerateRoute = '/generate';

const mod = {

	OLSKControllerRoutes () {
		return [{
			OLSKRoutePath: kSNPGenerateRoute,
			OLSKRouteMethod: 'get',
			OLSKRouteSignature: 'SNPGenerateRoute',
			OLSKRouteFunction (req, res, next) {
				return res.OLSKExpressLayoutRender(require('path').join(__dirname, 'ui-view.ejs'));
			},
			OLSKRouteLanguageCodes: ['en', 'fr', 'es', 'pt'],
		}, {
			OLSKRouteSignature: 'SNPGenerateServiceWorkerRoute',
			OLSKRoutePath: kSNPGenerateRoute + '/sw.js',
			OLSKRouteMethod: 'get',
			OLSKRouteFunction (req, res, next) {
				return res.type('js').send(OLSKServiceWorker.OLSKServiceWorkerView({
					VERSION_ID_TOKEN: kSNPGenerateServiceWorkerVersionID,
					ORIGIN_PAGE_PATH_TOKEN: res.locals.OLSKCanonical('SNPGenerateRoute'),
				}));
			},
		}, {
			OLSKRoutePath: '/generate',
			OLSKRouteMethod: 'get',
			OLSKRouteSignature: 'SNPGenerateShortcutRoute1',
			OLSKRouteRedirect: kSNPGenerateRoute,
		}, {
			OLSKRoutePath: '/gen',
			OLSKRouteMethod: 'get',
			OLSKRouteSignature: 'SNPGenerateShortcutRoute2',
			OLSKRouteRedirect: kSNPGenerateRoute,
		}, {
			OLSKRoutePath: kSNPGenerateRoute + '/manifest.json',
			OLSKRouteMethod: 'get',
			OLSKRouteSignature: 'SNPGenerateManifestRoute',
			OLSKRouteFunction (req, res, next) {
				return res.json({
					name: 'QR Generator',
					short_name: 'QR Generator',
					start_url: res.locals.OLSKCanonical('SNPGenerateRoute'),
					display: 'browser',
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
