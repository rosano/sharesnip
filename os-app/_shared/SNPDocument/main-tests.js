const { rejects, throws, deepEqual, strictEqual, notStrictEqual } = require('assert');

const mod = require('./main.js').default;

const OLSKObject = require('OLSKObject');
const OLSKWash = require('OLSKWash');

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

	it('returns object if SNPDocumentNotes not string', function() {
		deepEqual(mod.SNPDocumentErrors(StubDocumentObjectValid({
			SNPDocumentNotes: null,
		})), {
			SNPDocumentNotes: [
				'SNPErrorNotString',
			],
		});
	});

	it('returns null', function() {
		deepEqual(mod.SNPDocumentErrors(StubDocumentObjectValid()), null);
	});

	context('SNPDocumentURL', function() {

		it('returns object if not string', function() {
			deepEqual(mod.SNPDocumentErrors(StubDocumentObjectValid({
				SNPDocumentURL: null,
			})), {
				SNPDocumentURL: [
					'SNPErrorNotString',
				],
			});
		});

		it('returns null', function() {
			deepEqual(mod.SNPDocumentErrors(StubDocumentObjectValid({
				SNPDocumentURL: Math.random().toString(),
			})), null);
		});

	});

	context('SNPDocumentName', function() {

		it('returns object if not string', function() {
			deepEqual(mod.SNPDocumentErrors(StubDocumentObjectValid({
				SNPDocumentName: null,
			})), {
				SNPDocumentName: [
					'SNPErrorNotString',
				],
			});
		});

		it('returns null', function() {
			deepEqual(mod.SNPDocumentErrors(StubDocumentObjectValid({
				SNPDocumentName: Math.random().toString(),
			})), null);
		});

	});

	context('SNPDocumentEmbedURL', function() {

		it('returns object if not string', function() {
			deepEqual(mod.SNPDocumentErrors(StubDocumentObjectValid({
				SNPDocumentEmbedURL: null,
			})), {
				SNPDocumentEmbedURL: [
					'SNPErrorNotString',
				],
			});
		});

		it('returns null', function() {
			deepEqual(mod.SNPDocumentErrors(StubDocumentObjectValid({
				SNPDocumentEmbedURL: Math.random().toString(),
			})), null);
		});

	});

	context('SNPDocumentImageURL', function() {

		it('returns object if not string', function() {
			deepEqual(mod.SNPDocumentErrors(StubDocumentObjectValid({
				SNPDocumentImageURL: null,
			})), {
				SNPDocumentImageURL: [
					'SNPErrorNotString',
				],
			});
		});

		it('returns null', function() {
			deepEqual(mod.SNPDocumentErrors(StubDocumentObjectValid({
				SNPDocumentImageURL: Math.random().toString(),
			})), null);
		});

	});

	context('SNPDocumentDidFetch', function() {

		it('returns object if not boolean', function() {
			deepEqual(mod.SNPDocumentErrors(StubDocumentObjectValid({
				SNPDocumentDidFetch: null,
			})), {
				SNPDocumentDidFetch: [
					'SNPErrorNotBoolean',
				],
			});
		});

		it('returns null', function() {
			deepEqual(mod.SNPDocumentErrors(StubDocumentObjectValid({
				SNPDocumentDidFetch: true,
			})), null);
		});

	});

	it('returns object if SNPDocumentArchiveDate not date', function() {
		deepEqual(mod.SNPDocumentErrors(StubDocumentObjectValid({
			SNPDocumentArchiveDate: new Date('alfa'),
		})), {
			SNPDocumentArchiveDate: [
				'SNPErrorNotDate',
			],
		});
	});

	context('SNPDocumentTags', function () {

		it('returns object if not array', function () {
			deepEqual(mod.SNPDocumentErrors(StubDocumentObjectValid({
				SNPDocumentTags: null,
			})), {
				SNPDocumentTags: [
					'SNPErrorNotArray',
				],
			});
		});

		it('returns null', function () {
			deepEqual(mod.SNPDocumentErrors(StubDocumentObjectValid({
				SNPDocumentTags: [],
			})), null);
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

	it('calls OLSKWash', function() {
		const key = uRandomElement('SNPDocumentURL', 'SNPDocumentEmbedURL');
		const value = 'https://player.vimeo.com/video/535982936';
		deepEqual(mod._SNPDocumentProcess(StubDocumentObjectValid({
			[key]: [value, '?', uRandomElement(OLSKWash._OLSKWashGlobalKeys()), '=', Math.random().toString()].join(''),
		}))[key], value);
	});

	it('removes autoplay from vimeo', function() {
		const SNPDocumentEmbedURL = 'https://player.vimeo.com/video/535982936?autoplay=1';
		deepEqual(mod._SNPDocumentProcess(StubDocumentObjectValid({
			SNPDocumentEmbedURL,
		})).SNPDocumentEmbedURL, SNPDocumentEmbedURL.replace('autoplay=1', 'autoplay=0'));
	});

	it('renames youtube.com', function() {
		const SNPDocumentEmbedURL = 'https://www.youtube.com/embed/q-ngFA8VBOM?list=OLAK5uy_nxjqj-pnNjTI2tfejntOuHILUVCtvO7Es';
		deepEqual(mod._SNPDocumentProcess(StubDocumentObjectValid({
			SNPDocumentEmbedURL,
		})).SNPDocumentEmbedURL, SNPDocumentEmbedURL.replace('youtube.com', 'youtube-nocookie.com'));
	});

	it('filters empty tags', function() {
		const SNPDocumentTags = ['', ' ', null];
		deepEqual(mod._SNPDocumentProcess(StubDocumentObjectValid({
			SNPDocumentTags,
		})).SNPDocumentTags, []);
	});

	it('filters duplicate tags', function() {
		const item = Math.random().toString();
		deepEqual(mod._SNPDocumentProcess(StubDocumentObjectValid({
			SNPDocumentTags: [item, item],
		})).SNPDocumentTags, [item]);
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
			SNPDocumentNotes: null,
		})), {
			SNPDocumentNotes: [
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
