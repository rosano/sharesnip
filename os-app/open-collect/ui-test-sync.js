const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('SNPCode_Sync', function () {	

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});

	describe('ZDRSchemaDispatchSyncCreateDocument', function test_ZDRSchemaDispatchSyncCreateDocument () {

		before(function () {
			browser.assert.elements('.SNPCodeListItem', 0);
		});

		before(function () {
			return browser.OLSKLauncherRun('FakeZDRSchemaDispatchSyncCreateDocument');
		});

		it('adds item', function () {
			browser.assert.elements('.SNPCodeListItem', 1);
		});

	});

	describe('ZDRSchemaDispatchSyncUpdateDocument', function test_ZDRSchemaDispatchSyncUpdateDocument () {

		before(function () {
			browser.assert.text('.SNPCodeListItem', 'FakeZDRSchemaDispatchSyncCreateDocument');
		});

		before(function () {
			return browser.OLSKLauncherRun('FakeZDRSchemaDispatchSyncUpdateDocument');
		});

		it('updates item', function () {
			browser.assert.text('.SNPCodeListItem', 'FakeZDRSchemaDispatchSyncUpdateDocument');
		});

		context('selected same', function () {
			
			before(function () {
				return browser.click('.SNPCodeListItem');
			});

			before(function () {
				return browser.fill('.SNPCodeDetailFormNameField', 'FakeZDRSchemaDispatchSyncCreateDocument');
			});

			before(function () {
				return browser.OLSKLauncherRun('FakeZDRSchemaDispatchSyncUpdateDocument');
			});

			it('updates detail', function () {
				browser.assert.input('.SNPCodeDetailFormNameField', 'FakeZDRSchemaDispatchSyncUpdateDocument');
			});

		});

	});

	describe('ZDRSchemaDispatchSyncDeleteDocument', function test_ZDRSchemaDispatchSyncDeleteDocument () {

		before(function () {
			return browser.OLSKLauncherRun('FakeZDRSchemaDispatchSyncDeleteDocument');
		});

		it('removes item', function () {
			browser.assert.elements('.SNPCodeListItem', 0);
		});

		context('selected same', function () {
			
			before(function () {
				return browser.OLSKLauncherRun('FakeZDRSchemaDispatchSyncCreateDocument');
			});

			before(function () {
				return browser.click('.SNPCodeListItem');
			});

			before(function () {
				return browser.OLSKLauncherRun('FakeZDRSchemaDispatchSyncDeleteDocument');
			});

			it('clears detail', function () {
				browser.assert.elements('.SNPCodeDetail', 0);
			});
		
		});

	});

	describe.skip('ZDRSchemaDispatchSyncConflictDocument', function test_ZDRSchemaDispatchSyncConflictDocument () {

		before(function () {
			return uCreateDocument();
		});

		before(function () {
			return browser.click('.SNPCodeListItem');
		});

		before(function () {
			return browser.fill('.SNPCodeDetailFormNameField', 'FakeZDRSchemaDispatchSyncConflictDocument');
		});

		before(function () {
			return browser.OLSKLauncherRun('FakeZDRSchemaDispatchSyncConflictDocument');
		});

		it('selects local', function () {
			browser.assert.text('.SNPCodeListItem', 'FakeZDRSchemaDispatchSyncConflictDocument-local');
		});

	});

});
