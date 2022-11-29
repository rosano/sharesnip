const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('SNPCode_Fund', function () {

	require('OLSKFund/ui-test_template').default({
		kDefaultRoute,

		ParamProject: process.env.ROCO_SHARED_PROJECT_ID,
		
		ParamTriggerGate () {
			return browser.pressButton('.SNPCodeToggleFormButton');
		},

		async ParamCreateDocument () {
			await browser.pressButton('.SNPCodeToggleFormButton');
			
			browser.fill('.SNPCodeFormField', Math.random().toString());
			
			await browser.pressButton('.SNPCodeFormSubmitButton');
		},

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
