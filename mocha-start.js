const SNPDocument = require('./os-app/_shared/SNPDocument/main.js').default;

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
					SNPDocument,
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
				SNPDocumentData: Math.random().toString(),
				SNPDocumentName: '',
				SNPDocumentType: SNPDocument.SNPDocumentTypeNote(),
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

		async uCreateDocument () {
			await browser.pressButton('.SNPCollectToggleFormButton');
			await browser.pressButton('.SNPMakeTypesNoteButton');			
			await browser.fill('.SNPFormDataField', Math.random().toString());
			return browser.pressButton('.SNPFormBaseSaveButton');
		},

		uDataSite (inputData = '') {
			return uRandomElement('http', 'https') + '://example.com/' + (inputData || Math.random().toString());
		},

		uDataEmail (inputData) {
			return 'mailto:' + uEmail(inputData);
		},

		uDataPhone (inputData) {
			return 'tel:' + (inputData || Math.random().toString());
		},

		uDataWifi (inputData = '') {
			return `WIFI:T:${ inputData.SNPDocumentWifiSecurity || 'WPA' };S:${ inputData.SNPDocumentWifiNetwork || inputData || Math.random().toString() };P:${ inputData.SNPDocumentWifiPassword || inputData || Math.random().toString() };H:${ inputData.SNPDocumentWifiHidden || '' };;`
		},

		uDataContact (inputData = {}) {
			Object.assign(inputData, {
				SNPDocumentContactFirstName: inputData.SNPDocumentContactFirstName || Math.random().toString(),
				SNPDocumentContactLastName: inputData.SNPDocumentContactLastName || Math.random().toString(),
				SNPDocumentContactOrganization: inputData.SNPDocumentContactOrganization || Math.random().toString(),
				SNPDocumentContactPhone: inputData.SNPDocumentContactPhone || Math.random().toString(),
				SNPDocumentContactEmail: inputData.SNPDocumentContactEmail || Math.random().toString(),
				SNPDocumentContactLink: inputData.SNPDocumentContactLink || Math.random().toString(),
			});

			return `BEGIN:VCARD
VERSION:3.0
N:${ inputData.SNPDocumentContactLastName };${ inputData.SNPDocumentContactFirstName };;;
FN:${ inputData.SNPDocumentContactFirstName } ${ inputData.SNPDocumentContactLastName }
ORG:${ inputData.SNPDocumentContactOrganization }
EMAIL;type=INTERNET;type=HOME;type=pref:${ inputData.SNPDocumentContactEmail }
TEL;type=CELL;type=VOICE;type=pref:${ inputData.SNPDocumentContactPhone }
URL:${ inputData.SNPDocumentContactLink }
END:VCARD`
		},

	}).map(function (e) {
		return global[e.shift()] = e.pop();
	});
})();
