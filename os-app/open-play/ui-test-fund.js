const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('SNPPlay_Fund', function () {

	require('OLSKFund/ui-test_template').default({
		kDefaultRoute,

		ParamProject: process.env.ROCO_SHARED_PROJECT_ID,
		
		ParamTriggerGate () {
			return browser.pressButton('.SNPPlayToggleFormButton');
		},

		async ParamCreateDocument () {
			await browser.pressButton('.SNPPlayToggleFormButton');
			
			browser.fill('.SNPPlayFormField', Math.random().toString());
			
			await browser.pressButton('.SNPPlayFormSubmitButton');
		},

		async ParamDeleteDocument () {
			await browser.click('.OLSKCollectionItem');

			return browser.OLSKConfirm(function () {
				return browser.pressButton('.SNPPlayDetailToolbarDiscardButton');
			});
		},

		ParamCreateDocumentSync () {
			return browser.OLSKLauncherRun('FakeZDRSchemaDispatchSyncCreateDocument');
		},

	});
	
});
