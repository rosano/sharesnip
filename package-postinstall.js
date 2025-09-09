(function OLSKPostinstallHotfix() {

	Object.entries(require('OLSKHotfix').OLSKHotfixPatches(process.env.NODE_ENV, {
		OLSKHotfixPatchesNotReversible: Object.assign(Object.fromEntries(require('glob').globSync('./node_modules/OLSKUIAssets/_OLSKSharedFeature*', {
			cwd: __dirname,
			realpath: true,
		}).map(function (e) {
			return [e, {
				'rgb(0, 0, 0)': 'rgb(255, 128, 0)',
			}]
		})), {
			'./node_modules/vcards-js/index.js': {
				"require('fs')": "_require_('fs')",
				"require('path')": "_require_('path')",
			},
		})
	})).forEach(function ([path, patches]) {
		if (!require('fs').existsSync(path)) {
			return;
		}
		
		Object.entries(patches).forEach(function ([search, replace]) {
			require('fs').writeFileSync(path, require('OLSKString').OLSKStringPatch(
				require('fs').readFileSync(path, 'utf8'), search, replace));
		});
	});
})();

(function OLSKPostinstallExternalAssets() {
	require('./node_modules/OLSKExpress/modules/OLSKAssets/main.js').OLSKAssetsCopyAssetsFromTo([
		'normalize.css',
		'OLSKDecor',
		'OLSKRouting',
		'OLSKUIAssets',
		'launchlet',
		'ROCORootLink',
		'html5-qrcode',
	], require('path').join(__dirname, 'node_modules'), require('path').join(__dirname, 'os-app/_shared/__external'));
})();
