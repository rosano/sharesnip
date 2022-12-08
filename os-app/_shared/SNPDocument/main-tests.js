const { rejects, throws, deepEqual, strictEqual, notStrictEqual } = require('assert');

const mod = require('./main.js').default;

const OLSKObject = require('OLSKObject');

describe('SNPDocumentTypeNote', function test_SNPDocumentTypeNote() {

	it('returns string', function() {
		deepEqual(mod.SNPDocumentTypeNote(), 'TYPE_NOTE');
	});

});

describe('SNPDocumentTypeLink', function test_SNPDocumentTypeLink() {

	it('returns string', function() {
		deepEqual(mod.SNPDocumentTypeLink(), 'TYPE_LINK');
	});

});

describe('SNPDocumentTypeEmail', function test_SNPDocumentTypeEmail() {

	it('returns string', function() {
		deepEqual(mod.SNPDocumentTypeEmail(), 'TYPE_EMAIL');
	});

});

describe('SNPDocumentTypePhone', function test_SNPDocumentTypePhone() {

	it('returns string', function() {
		deepEqual(mod.SNPDocumentTypePhone(), 'TYPE_PHONE');
	});

});

describe('SNPDocumentTypeWifi', function test_SNPDocumentTypeWifi() {

	it('returns string', function() {
		deepEqual(mod.SNPDocumentTypeWifi(), 'TYPE_WIFI');
	});

});

describe('SNPDocumentTypeContact', function test_SNPDocumentTypeContact() {

	it('returns string', function() {
		deepEqual(mod.SNPDocumentTypeContact(), 'TYPE_CONTACT');
	});

});

describe('SNPDocumentTypes', function test_SNPDocumentTypes() {

	it('returns string', function() {
		deepEqual(mod.SNPDocumentTypes(), [
			mod.SNPDocumentTypeNote(),
			mod.SNPDocumentTypeLink(),
			mod.SNPDocumentTypeEmail(),
			mod.SNPDocumentTypePhone(),
			mod.SNPDocumentTypeWifi(),
			mod.SNPDocumentTypeContact(),
			]);
	});

});

describe('SNPDocumentErrors', function test_SNPDocumentErrors() {

	it('throws error if not object', function() {
		throws(function() {
			mod.SNPDocumentErrors(null);
		}, /SNPErrorInputNotValid/);
	});

	it('returns object if SNPDocumentID not string', function() {
		deepEqual(mod.SNPDocumentErrors(StubDocumentObjectValid({
			SNPDocumentID: null,
		})), {
			SNPDocumentID: [
				'SNPErrorNotString',
			],
		});
	});

	it('returns object if SNPDocumentID not filled', function() {
		deepEqual(mod.SNPDocumentErrors(StubDocumentObjectValid({
			SNPDocumentID: ' ',
		})), {
			SNPDocumentID: [
				'SNPErrorNotFilled',
			],
		});
	});

	it('returns object if SNPDocumentCreationDate not date', function() {
		deepEqual(mod.SNPDocumentErrors(StubDocumentObjectValid({
			SNPDocumentCreationDate: new Date('alfa'),
		})), {
			SNPDocumentCreationDate: [
				'SNPErrorNotDate',
			],
		});
	});

	it('returns object if SNPDocumentModificationDate not date', function() {
		deepEqual(mod.SNPDocumentErrors(StubDocumentObjectValid({
			SNPDocumentModificationDate: new Date('alfa'),
		})), {
			SNPDocumentModificationDate: [
				'SNPErrorNotDate',
			],
		});
	});

	it('returns object if SNPDocumentName not string', function() {
		deepEqual(mod.SNPDocumentErrors(StubDocumentObjectValid({
			SNPDocumentName: null,
		})), {
			SNPDocumentName: [
				'SNPErrorNotString',
			],
		});
	});

	it('returns object if SNPDocumentData not string', function() {
		deepEqual(mod.SNPDocumentErrors(StubDocumentObjectValid({
			SNPDocumentData: null,
		})), {
			SNPDocumentData: [
				'SNPErrorNotString',
			],
		});
	});

	it('returns object if SNPDocumentData not filled', function() {
		deepEqual(mod.SNPDocumentErrors(StubDocumentObjectValid({
			SNPDocumentData: ' ',
		})), {
			SNPDocumentData: [
				'SNPErrorNotFilled',
			],
		});
	});

	it('returns object if SNPDocumentType not valid', function() {
		deepEqual(mod.SNPDocumentErrors(StubDocumentObjectValid({
			SNPDocumentType: Math.random().toString(),
		})), {
			SNPDocumentType: [
				'SNPErrorNotValid',
			],
		});
	});

	it('returns null', function() {
		deepEqual(mod.SNPDocumentErrors(StubDocumentObjectValid()), null);
	});

});

describe('SNPDocumentValidateLink', function test_SNPDocumentValidateLink() {

	it('binds function', function() {
		deepEqual(mod.SNPDocumentValidateLink, require('OLSKLink').OLSKLinkValid);
	});

});

describe('SNPDocumentValidateEmail', function test_SNPDocumentValidateEmail() {

	it('throws if not string', function () {
		throws(function () {
			mod.SNPDocumentValidateEmail(null);
		}, /SNPErrorInputNotValid/);
	});

	it('returns false if not valid', function() {
		deepEqual(mod.SNPDocumentValidateEmail(Math.random().toString()), false);
	});

	it('returns true', function() {
		deepEqual(mod.SNPDocumentValidateEmail(uRandomElement('mailto:', '') + uEmail()), true);
	});

});

describe('SNPDocumentValidatePhone', function test_SNPDocumentValidatePhone() {

	it('throws if not string', function () {
		throws(function () {
			mod.SNPDocumentValidatePhone(null);
		}, /SNPErrorInputNotValid/);
	});

	it('returns false if without prefix', function() {
		deepEqual(mod.SNPDocumentValidatePhone(Math.random().toString()), false);
	});

	it('returns true', function() {
		deepEqual(mod.SNPDocumentValidatePhone(uDataPhone()), true);
	});

});

describe('SNPDocumentValidateWifi', function test_SNPDocumentValidateWifi() {

	it('throws if not string', function () {
		throws(function () {
			mod.SNPDocumentValidateWifi(null);
		}, /SNPErrorInputNotValid/);
	});

	it('returns false if without prefix', function() {
		deepEqual(mod.SNPDocumentValidateWifi(Math.random().toString()), false);
	});

	it('returns true', function() {
		deepEqual(mod.SNPDocumentValidateWifi(uDataWifi()), true);
	});

});

describe('SNPDocumentExplodeEmail', function test_SNPDocumentExplodeEmail() {

	it('throws if not string', function () {
		throws(function () {
			mod.SNPDocumentExplodeEmail(null);
		}, /SNPErrorInputNotValid/);
	});

	it('returns object', function() {
		const SNPDocumentEmail = uEmail();
		const SNPDocumentData = uRandomElement('mailto:', '') + SNPDocumentEmail;
		deepEqual(mod.SNPDocumentExplodeEmail(SNPDocumentData), {
			SNPDocumentData,
			SNPDocumentType: mod.SNPDocumentTypeEmail(),
			SNPDocumentEmail,
		});
	});

});

describe('SNPDocumentExplodePhone', function test_SNPDocumentExplodePhone() {

	it('throws if not string', function () {
		throws(function () {
			mod.SNPDocumentExplodePhone(null);
		}, /SNPErrorInputNotValid/);
	});

	it('returns object', function() {
		const SNPDocumentPhone = Math.random().toString();
		const SNPDocumentData = uDataPhone(SNPDocumentPhone);
		deepEqual(mod.SNPDocumentExplodePhone(SNPDocumentData), {
			SNPDocumentData,
			SNPDocumentType: mod.SNPDocumentTypePhone(),
			SNPDocumentPhone,
		});
	});

});

describe('SNPDocumentExplodeWifi', function test_SNPDocumentExplodeWifi() {

	it('throws if not string', function () {
		throws(function () {
			mod.SNPDocumentExplodeWifi(null);
		}, /SNPErrorInputNotValid/);
	});

	it('returns object', function() {
		const SNPDocumentWifiSecurity = uRandomElement('WPA', 'WEP', 'nopass');
		const SNPDocumentWifiNetwork = Math.random().toString();
		const SNPDocumentWifiPassword = Math.random().toString();
		const SNPDocumentWifiHidden = uRandomElement(false, true)
		const SNPDocumentData = uDataWifi({
			SNPDocumentWifiSecurity,
			SNPDocumentWifiNetwork,
			SNPDocumentWifiPassword,
			SNPDocumentWifiHidden,
		});
		deepEqual(mod.SNPDocumentExplodeWifi(SNPDocumentData), {
			SNPDocumentData,
			SNPDocumentType: mod.SNPDocumentTypeWifi(),
			SNPDocumentWifiSecurity,
			SNPDocumentWifiNetwork,
			SNPDocumentWifiPassword,
			SNPDocumentWifiHidden,
		});
	});

});

describe('SNPDocumentExplode', function test_SNPDocumentExplode() {

	it('throws if not string', function () {
		throws(function () {
			mod.SNPDocumentExplode(null);
		}, /SNPErrorInputNotValid/);
	});

	it('returns object', function() {
		const SNPDocumentData = Math.random().toString();
		deepEqual(mod.SNPDocumentExplode(SNPDocumentData), {
			SNPDocumentData,
			SNPDocumentType: mod.SNPDocumentTypeNote(),
		});
	});

	context('SNPDocumentTypeLink', function () {

		it('returns object', function() {
			const SNPDocumentData = uRandomElement('http', 'https') + '://example.com';
			deepEqual(mod.SNPDocumentExplode(SNPDocumentData), {
				SNPDocumentType: mod.SNPDocumentTypeLink(),
				SNPDocumentData,
			});
		});
	
	});

	context('SNPDocumentTypePhone', function () {

		it('returns object', function() {
			const SNPDocumentData = uDataPhone();
			deepEqual(mod.SNPDocumentExplode(SNPDocumentData), mod.SNPDocumentExplodePhone(SNPDocumentData));
		});
	
	});

	context('SNPDocumentTypeEmail', function () {

		it('returns object', function() {
			const SNPDocumentData = uDataEmail();
			deepEqual(mod.SNPDocumentExplode(SNPDocumentData), mod.SNPDocumentExplodeEmail(SNPDocumentData));
		});
	
	});

});

describe('SNPDocumentDirectory', function test_SNPDocumentDirectory() {

	it('returns string', function() {
		deepEqual(mod.SNPDocumentDirectory(), 'snp_documents');
	});

});

describe('SNPDocumentObjectPath', function test_SNPDocumentObjectPath() {

	it('returns string', function() {
		const item = {
			SNPDocumentID: Math.random().toString(),
		};
		deepEqual(mod.SNPDocumentObjectPath(item), mod.SNPDocumentDirectory(item) + '/' + item.SNPDocumentID);
	});

});

describe('SNPDocumentStub', function test_SNPDocumentStub() {

	it('returns string', function() {
		const SNPDocumentID = Math.random().toString();
		deepEqual(mod.SNPDocumentStub(`${ mod.SNPDocumentDirectory() }/${ SNPDocumentID }`), {
			SNPDocumentID,
		});
	});

});

describe('_SNPDocumentProcess', function test__SNPDocumentProcess() {

	it('throws if not object', function () {
		throws(function () {
			mod._SNPDocumentProcess(null)
		}, /SNPErrorInputNotValid/);
	});

	it('returns inputData', function() {
		const item = StubDocumentObjectValid();
		strictEqual(mod._SNPDocumentProcess(item), item);
	});

	it('strips __SNPDocumentProcessTest', function() {
		deepEqual(mod._SNPDocumentProcess(StubDocumentObjectValid({
			__SNPDocumentProcessTest: Math.random().toString(),
		})).__SNPDocumentProcessTest, undefined);
	});

});

describe('SNPDocumentCreate', function test_SNPDocumentCreate() {

	it('throws if not object', function () {
		throws(function () {
			ZDRTestingWrap.App.SNPDocument.SNPDocumentCreate(null)
		}, /SNPErrorInputNotValid/);
	});

	it('rejects with errors if not valid', async function() {
		await rejects(ZDRTestingWrap.App.SNPDocument.SNPDocumentCreate(StubDocumentObject({
			SNPDocumentName: null,
		})), {
			SNPDocumentName: [
				'SNPErrorNotString',
			],
		});
	});

	it('returns inputData', async function() {
		const item = StubDocumentObjectValid();
		strictEqual(await ZDRTestingWrap.App.SNPDocument.SNPDocumentCreate(item), item);
	});

	it('sets SNPDocumentID to unique value', async function() {
		const items = await uSerial(Array.from(Array(10)).map(async function (e) {
			return (await ZDRTestingWrap.App.SNPDocument.SNPDocumentCreate(StubDocumentObject())).SNPDocumentID;
		}));
		deepEqual([...(new Set(items))], items);
	});

	it('sets SNPDocumentCreationDate', async function() {
		deepEqual(new Date() - (await ZDRTestingWrap.App.SNPDocument.SNPDocumentCreate(StubDocumentObject())).SNPDocumentCreationDate < 100, true);
	});

	it('sets SNPDocumentModificationDate', async function() {
		deepEqual(new Date() - (await ZDRTestingWrap.App.SNPDocument.SNPDocumentCreate(StubDocumentObject())).SNPDocumentModificationDate < 100, true);
	});

	it('allows overwrite by input', async function() {
		const item = StubDocumentObjectValid();
		deepEqual(await ZDRTestingWrap.App.SNPDocument.SNPDocumentCreate(Object.assign({}, item)), item);
	});

	it('calls _SNPDocumentProcess', async function() {
		deepEqual((await ZDRTestingWrap.App.SNPDocument.SNPDocumentCreate(StubDocumentObjectValid({
			__SNPDocumentProcessTest: Math.random().toString(),
		}))).__SNPDocumentProcessTest, undefined);
	});

	context('relations', function () {

		const memory = StubDocumentObjectValid({
			$alfa: 'bravo',
		});
		const item = {};

		beforeEach(async function () {
			item.outputData = await ZDRTestingWrap.App.SNPDocument.SNPDocumentCreate(memory);
		});

		beforeEach(async function () {
			item.storage = await ZDRTestingWrap.App.SNPDocument.SNPDocumentList();
		});

		it('excludes from storage', function () {
			deepEqual(item.storage, [OLSKObject.OLSKObjectSafeCopy(memory)]);
		});

		it('includes in outputData', function () {
			deepEqual(item.outputData, memory);
		});

		it('updates inputData', function () {
			strictEqual(item.outputData, memory);
		});

	});

});

describe('SNPDocumentUpdate', function test_SNPDocumentUpdate() {

	it('throws if not object', function () {
		throws(function () {
			ZDRTestingWrap.App.SNPDocument.SNPDocumentUpdate(null)
		}, /SNPErrorInputNotValid/);
	});

	it('rejects with errors if not valid', async function() {
		await rejects(ZDRTestingWrap.App.SNPDocument.SNPDocumentUpdate(Object.assign(await ZDRTestingWrap.App.SNPDocument.SNPDocumentCreate(StubDocumentObject()), {
			SNPDocumentID: null,
		})), {
			SNPDocumentID: [
				'SNPErrorNotString',
			],
		});
	});

	it('returns inputData', async function() {
		const item = await ZDRTestingWrap.App.SNPDocument.SNPDocumentCreate(StubDocumentObject());
		strictEqual(await ZDRTestingWrap.App.SNPDocument.SNPDocumentUpdate(item), item);
	});

	it('sets SNPDocumentModificationDate', async function() {
		const item = await ZDRTestingWrap.App.SNPDocument.SNPDocumentCreate(StubDocumentObject());
		const date = item.SNPDocumentModificationDate;

		await ZDRTestingWrap.App.SNPDocument.SNPDocumentUpdate(item);
		
		notStrictEqual(item.SNPDocumentModificationDate, date);
		deepEqual(new Date() - item.SNPDocumentModificationDate < 100, true);
	});

	it('writes inputData if not found', async function() {
		const item = await ZDRTestingWrap.App.SNPDocument.SNPDocumentUpdate(StubDocumentObjectValid());
		deepEqual(await ZDRTestingWrap.App.SNPDocument.SNPDocumentList(), [item]);
	});

	it('calls _SNPDocumentProcess', async function() {
		deepEqual((await ZDRTestingWrap.App.SNPDocument.SNPDocumentUpdate(StubDocumentObjectValid({
			__SNPDocumentProcessTest: Math.random().toString(),
		}))).__SNPDocumentProcessTest, undefined);
	});

	context('relations', function () {

		const memory = StubDocumentObjectValid({
			$alfa: 'bravo',
		});
		const item = {};

		beforeEach(async function () {
			item.outputData = await ZDRTestingWrap.App.SNPDocument.SNPDocumentUpdate(memory);
		});

		beforeEach(async function () {
			item.storage = await ZDRTestingWrap.App.SNPDocument.SNPDocumentList();
		});

		it('excludes from storage', function () {
			deepEqual(item.storage, [OLSKObject.OLSKObjectSafeCopy(memory)]);
		});

		it('includes in outputData', function () {
			deepEqual(item.outputData, memory);
		});

		it('updates inputData', function () {
			strictEqual(item.outputData, memory);
		});

	});

});

describe('SNPDocumentList', function test_SNPDocumentList() {

	it('returns array', async function() {
		deepEqual(await ZDRTestingWrap.App.SNPDocument.SNPDocumentList(), []);
	});

	it('returns array with existing items', async function() {
		const item = await ZDRTestingWrap.App.SNPDocument.SNPDocumentCreate(StubDocumentObjectValid());

		deepEqual(await ZDRTestingWrap.App.SNPDocument.SNPDocumentList(), [item]);
	});

});

describe('ZDRSchemaDispatchValidate', function () {

	it('returns function', function () {
		deepEqual(mod.ZDRSchemaDispatchValidate, mod.SNPDocumentErrors);
	});

});

describe('ZDRSchemaPath', function () {

	it('returns function', function() {
		deepEqual(mod.ZDRSchemaPath, mod.SNPDocumentObjectPath);
	});

});

describe('ZDRSchemaStub', function () {

	it('returns function', function() {
		deepEqual(mod.ZDRSchemaStub, mod.SNPDocumentStub);
	});

});
