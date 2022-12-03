const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

const kManifestRoute = require('./controller.js').OLSKControllerRoutes().pop();

describe('SNPGenerate_Misc', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});
	
	it('sets meta:viewport', function () {
		browser.assert.attribute('meta[name=viewport]', 'content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0');
	});
	
	it('sets meta:mobile-web-app-capable', function () {
		browser.assert.attribute('meta[name=mobile-web-app-capable]', 'content', 'yes');
	});
	
	it('sets meta:apple-mobile-web-app-capable', function () {
		browser.assert.attribute('meta[name=apple-mobile-web-app-capable]', 'content', 'yes');
	});

	it('sets manifest', function () {
		browser.assert.attribute('link[rel="manifest"]', 'href', kManifestRoute.OLSKRoutePath);
	});

});

describe('SNPGenerateManifest', function () {

	it('sends json', async function () {
		
		browser.assert.deepEqual(await (await browser.fetch('http://localhost' + kManifestRoute.OLSKRoutePath)).json(), {
			name: 'Sharesnip',
			short_name: 'Sharesnip',
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

