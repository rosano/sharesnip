const kSNPServiceWorkerVersionID = Date.now().toString();

const OLSKServiceWorker = require('../../node_modules/OLSKServiceWorker/main.js');

exports.OLSKControllerRoutes = function() {
	return {
		SNPServiceWorkerRoute: {
			OLSKRoutePath: '/sw.js',
			OLSKRouteMethod: 'get',
			OLSKRouteFunction (req, res, next) {
				return res.type('js').send(OLSKServiceWorker.OLSKServiceWorkerView({
					VERSION_ID_TOKEN: kSNPServiceWorkerVersionID,
					ORIGIN_PAGE_PATH_TOKEN: res.locals.OLSKCanonical('SNPCollectRoute'),
				}));
			},
		},
	};
};
