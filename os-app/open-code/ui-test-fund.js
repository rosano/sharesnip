const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe.skip('SNPCode_Fund', function () {

	require('OLSKFund/ui-test_template').default({
		kDefaultRoute,

		ParamProject: process.env.ROCO_SHARED_PROJECT_ID,
		
		ParamTriggerGate: uCreateDocument,

		ParamCreateDocument: uCreateDocument,

		async ParamDeleteDocument () {
			await browser.click('.OLSKCollectionItem');

			return browser.OLSKConfirm(function () {
				return browser.pressButton('.SNPCodeDetailToolbarDiscardButton');
			});
		},

		ParamCreateDocumentSync () {
			return browser.OLSKLauncherRun('FakeZDRSchemaDispatchSyncCreateDocument');
		},

	});
	
});
