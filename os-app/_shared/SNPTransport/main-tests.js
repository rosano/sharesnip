const { throws, rejects, deepEqual, strictEqual, notStrictEqual } = require('assert');

const mod = require('./main.js').default;

const SNPDocument = require('../SNPDocument/main.js').default;

describe('SNPTransportImport', function test_SNPTransportImport() {

	it('rejects if not object', async function () {
		await rejects(ZDRTestingWrap.App.SNPTransport.SNPTransportImport(null), /SNPErrorInputNotValid/);
	});

	it('returns object', async function () {
		deepEqual(await ZDRTestingWrap.App.SNPTransport.SNPTransportImport({}), {});
	});

	context('SNPDocument', function () {

		it('rejects if not array', async function () {
			await rejects(ZDRTestingWrap.App.SNPTransport.SNPTransportImport({
				SNPDocument: null,
			}), /SNPErrorInputNotValid/);
		});
		
		it('rejects if not valid', async function () {
			await rejects(ZDRTestingWrap.App.SNPTransport.SNPTransportImport({
				SNPDocument: [StubDocumentObjectValid({
					SNPDocumentName: null,
				})],
			}), /SNPErrorInputNotValid/);
		});

		it('passes input', async function () {
			const item = StubDocumentObjectValid()
			strictEqual((await ZDRTestingWrap.App.SNPTransport.SNPTransportImport({
				SNPDocument: [item],
			})).SNPDocument.shift(), item);
		});

		it('writes objects', async function () {
			const item = StubDocumentObjectValid();

			await ZDRTestingWrap.App.SNPTransport.SNPTransportImport({
				SNPDocument: [item],
			});

			deepEqual(await ZDRTestingWrap.App.SNPDocument.SNPDocumentList(), [item]);
		});
	
	});

	context('SNPSetting', function () {

		it('rejects if not array', async function () {
			await rejects(ZDRTestingWrap.App.SNPTransport.SNPTransportImport({
				SNPSetting: null,
			}), /SNPErrorInputNotValid/);
		});
		
		it('rejects if not valid', async function () {
			await rejects(ZDRTestingWrap.App.SNPTransport.SNPTransportImport({
				SNPSetting: [StubSettingObjectValid({
					SNPSettingKey: null,
				})],
			}), /SNPErrorInputNotValid/);
		});

		it('passes input', async function () {
			const item = StubSettingObjectValid()
			strictEqual((await ZDRTestingWrap.App.SNPTransport.SNPTransportImport({
				SNPSetting: [item],
			})).SNPSetting.shift(), item);
		});

		it('writes objects', async function () {
			const item = StubSettingObjectValid();

			await ZDRTestingWrap.App.SNPTransport.SNPTransportImport({
				SNPSetting: [item],
			});

			deepEqual(await ZDRTestingWrap.App.SNPSetting.SNPSettingList(), [item]);
		});
	
	});

});

describe('SNPTransportExport', function test_SNPTransportExport() {

	it('throws if not object', function () {
		throws(function () {
			ZDRTestingWrap.App.SNPTransport.SNPTransportExport(null);
		}, /SNPErrorInputNotValid/);
	});

	it('returns object', function () {
		deepEqual(ZDRTestingWrap.App.SNPTransport.SNPTransportExport({}), {});
	});

	context('SNPDocument', function () {

		it('throws if not array', function () {
			throws(function () {
				ZDRTestingWrap.App.SNPTransport.SNPTransportExport({
					SNPDocument: null,
				});
			}, /SNPErrorInputNotValid/);
		});

		it('copies input', function () {
			const item = StubDocumentObjectValid();
			notStrictEqual((ZDRTestingWrap.App.SNPTransport.SNPTransportExport({
				SNPDocument: [item],
			})).SNPDocument.shift(), item);
		});

		it('strips dynamic attributes', function () {
			const item = StubDocumentObjectValid({
				$alfa: Math.random().toString(),
			});
			deepEqual((ZDRTestingWrap.App.SNPTransport.SNPTransportExport({
				SNPDocument: [item],
			})).SNPDocument.shift().$alfa, undefined);
		});
	
	});

	context('SNPSetting', function () {

		it('throws if not array', function () {
			throws(function () {
				ZDRTestingWrap.App.SNPTransport.SNPTransportExport({
					SNPSetting: null,
				});
			}, /SNPErrorInputNotValid/);
		});

		it('copies input', function () {
			const item = StubSettingObjectValid();
			notStrictEqual((ZDRTestingWrap.App.SNPTransport.SNPTransportExport({
				SNPSetting: [item],
			})).SNPSetting.shift(), item);
		});

		it('strips dynamic attributes', function () {
			const item = StubSettingObjectValid({
				$alfa: Math.random().toString(),
			});
			deepEqual((ZDRTestingWrap.App.SNPTransport.SNPTransportExport({
				SNPSetting: [item],
			})).SNPSetting.shift().$alfa, undefined);
		});
	
	});

});
