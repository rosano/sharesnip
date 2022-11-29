(function SNPMochaWrap() {
	if (process.env.OLSK_SPEC_MOCHA_INTERFACE === 'true') {
		return;
	}

	before(async function() {
		global.ZDRTestingWrap = await require('zerodatawrap').ZDRWrap({
			ZDRParamLibrary: require('remotestoragejs'),
			ZDRParamScopes: [{
				ZDRScopeKey: 'App',
				ZDRScopeDirectory: 'sharesnip',
				ZDRScopeSchemas: [
					require('./os-app/_shared/SNPDocument/main.js').default,
					require('./os-app/_shared/SNPSetting/main.js').default,
					require('./os-app/_shared/SNPTransport/main.js').default,
					],
			}],
			_ZDRParamDispatchJSONPreStringify: require('OLSKObject').OLSKObjectSafeCopy,
		});
	});

	beforeEach(function() {
		return ZDRTestingWrap.App.ZDRStorageDeleteFolderRecursive('');
	});
})();

(function SNPMochaStubs() {
	Object.entries({

		StubDocumentObject(inputData) {
			return Object.assign({
				SNPDocumentNotes: Math.random().toString(),
			}, inputData);
		},

		StubDocumentObjectValid(inputData) {
			return StubDocumentObject(Object.assign({
				SNPDocumentID: Math.random().toString(),
				SNPDocumentCreationDate: new Date(),
				SNPDocumentModificationDate: new Date(),
			}, inputData));
		},

		StubSettingObjectValid (inputData = {}) {
			return Object.assign({
				SNPSettingKey: Math.random().toString(),
				SNPSettingValue: Math.random().toString(),
			}, inputData);
		},

	}).map(function (e) {
		return global[e.shift()] = e.pop();
	});
})();
