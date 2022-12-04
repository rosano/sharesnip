const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

const kManifestRoute = require('./controller.js').OLSKControllerRoutes().pop();

describe('SNPGenerateManifest', function () {

	it('sends json', async function () {
		
		browser.assert.deepEqual(await (await browser.fetch('http://localhost' + kManifestRoute.OLSKRoutePath)).json(), {
			name: 'QR Generator',
			short_name: 'QR Generator',
			start_url: kDefaultRoute.OLSKRoutePath,
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

