const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('SNPManifest_Misc', function () {

	it('sends json', async function () {
		browser.assert.deepEqual(await (await browser.fetch('http://localhost:' + process.env.PORT + kDefaultRoute.OLSKRoutePath)).json(), {
			name: 'Sharesnip',
			short_name: 'Sharesnip',
			start_url: require('../open-collect/controller.js').OLSKControllerRoutes().shift().OLSKRoutePath,
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
	});

});
