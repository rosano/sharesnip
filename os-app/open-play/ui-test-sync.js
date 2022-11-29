const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('SNPPlay_Sync', function () {	

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});

	describe('ZDRSchemaDispatchSyncCreateDocument', function test_ZDRSchemaDispatchSyncCreateDocument () {

		before(function () {
			browser.assert.elements('.SNPPlayListItem', 0);
		});

		before(function () {
			return browser.OLSKLauncherRun('FakeZDRSchemaDispatchSyncCreateDocument');
		});

		it('adds item', function () {
			browser.assert.elements('.SNPPlayListItem', 1);
		});

	});

	describe('ZDRSchemaDispatchSyncUpdateDocument', function test_ZDRSchemaDispatchSyncUpdateDocument () {

		before(function () {
			browser.assert.text('.SNPPlayListItem', 'FakeZDRSchemaDispatchSyncCreateDocument');
		});

		before(function () {
			return browser.OLSKLauncherRun('FakeZDRSchemaDispatchSyncUpdateDocument');
		});

		it('updates item', function () {
			browser.assert.text('.SNPPlayListItem', 'FakeZDRSchemaDispatchSyncUpdateDocument');
		});

		context('selected same', function () {
			
			before(function () {
				return browser.click('.SNPPlayListItem');
			});

			before(function () {
				return browser.fill('.SNPPlayDetailFormNotesField', 'FakeZDRSchemaDispatchSyncCreateDocument');
			});

			before(function () {
				return browser.OLSKLauncherRun('FakeZDRSchemaDispatchSyncUpdateDocument');
			});

			it('updates detail', function () {
				browser.assert.input('.SNPPlayDetailFormNotesField', 'FakeZDRSchemaDispatchSyncUpdateDocument');
			});

		});

	});

	describe('ZDRSchemaDispatchSyncDeleteDocument', function test_ZDRSchemaDispatchSyncDeleteDocument () {

		before(function () {
			return browser.OLSKLauncherRun('FakeZDRSchemaDispatchSyncDeleteDocument');
		});

		it('removes item', function () {
			browser.assert.elements('.SNPPlayListItem', 0);
		});

		context('selected same', function () {
			
			before(function () {
				return browser.OLSKLauncherRun('FakeZDRSchemaDispatchSyncCreateDocument');
			});

			before(function () {
				return browser.click('.SNPPlayListItem');
			});

			before(function () {
				return browser.OLSKLauncherRun('FakeZDRSchemaDispatchSyncDeleteDocument');
			});

			it('clears detail', function () {
				browser.assert.elements('.SNPPlayDetail', 0);
			});
		
		});

	});

	describe.skip('ZDRSchemaDispatchSyncConflictDocument', function test_ZDRSchemaDispatchSyncConflictDocument () {

		before(function () {
			return browser.pressButton(SNPPlayToggleFormButton);
		});

		before(function () {
			browser.fill(SNPPlayFormField, Math.random().toString());
		});

		before(function () {
			return browser.pressButton(SNPPlayFormSubmitButton);
		});

		before(function () {
			return browser.click('.SNPPlayListItem');
		});

		before(function () {
			return browser.fill('.SNPPlayDetailFormNotesField', 'FakeZDRSchemaDispatchSyncConflictDocument');
		});

		before(function () {
			return browser.OLSKLauncherRun('FakeZDRSchemaDispatchSyncConflictDocument');
		});

		it('selects local', function () {
			browser.assert.text('.SNPPlayListItem', 'FakeZDRSchemaDispatchSyncConflictDocument-local');
		});

	});

});
