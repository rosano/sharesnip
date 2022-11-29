const { rejects, throws, deepEqual } = require('assert');

const mod = require('./main.js').default;

describe('SNPSettingErrors', function test_SNPSettingErrors() {

	it('throws error if not object', function() {
		throws(function() {
			mod.SNPSettingErrors(null);
		}, /SNPErrorInputNotValid/);
	});

	it('returns object if SNPSettingKey not string', function() {
		deepEqual(mod.SNPSettingErrors(StubSettingObjectValid({
			SNPSettingKey: null,
		})), {
			SNPSettingKey: [
				'SNPErrorNotString',
			],
		});
	});

	it('returns object if SNPSettingKey not filled', function() {
		deepEqual(mod.SNPSettingErrors(StubSettingObjectValid({
			SNPSettingKey: ' ',
		})), {
			SNPSettingKey: [
				'SNPErrorNotFilled',
			],
		});
	});

	it('returns object if SNPSettingValue not string', function() {
		deepEqual(mod.SNPSettingErrors(StubSettingObjectValid({
			SNPSettingValue: null,
		})), {
			SNPSettingValue: [
				'SNPErrorNotString',
			],
		});
	});

	it('returns null', function() {
		deepEqual(mod.SNPSettingErrors(StubSettingObjectValid()), null);
	});

});

describe('SNPSettingDirectory', function test_SNPSettingDirectory() {

	it('returns string', function() {
		deepEqual(mod.SNPSettingDirectory(), 'snp_settings');
	});

});

describe('SNPSettingPath', function test_SNPSettingPath() {

	it('returns string', function() {
		const SNPSettingKey = Math.random().toString();
		deepEqual(mod.SNPSettingPath({
			SNPSettingKey,
		}), mod.SNPSettingDirectory() + '/' + SNPSettingKey);
	});

});

describe('SNPSettingStub', function test_SNPSettingStub() {

	it('returns string', function() {
		const SNPSettingKey = Math.random().toString();
		deepEqual(mod.SNPSettingStub(`${ mod.SNPSettingDirectory() }/${ SNPSettingKey }`), {
			SNPSettingKey,
		});
	});

});

describe('SNPSettingList', function test_SNPSettingActList() {

	it('returns array', async function() {
		deepEqual(await ZDRTestingWrap.App.SNPSetting.SNPSettingList(), []);
	});

	it('returns array with existing items', async function() {
		
		const item = await ZDRTestingWrap.App.SNPSetting.ZDRModelWriteObject(StubSettingObjectValid());
		deepEqual(await ZDRTestingWrap.App.SNPSetting.SNPSettingList(), [item]);
	});

});

describe('ZDRSchemaDispatchValidate', function () {

	it('returns function', function () {
		deepEqual(mod.ZDRSchemaDispatchValidate, mod.SNPSettingErrors);
	});

});

describe('ZDRSchemaPath', function () {

	it('returns function', function() {
		deepEqual(mod.ZDRSchemaPath, mod.SNPSettingPath);
	});

});


describe('ZDRSchemaStub', function () {

	it('returns function', function() {
		deepEqual(mod.ZDRSchemaStub, mod.SNPSettingStub);
	});

});
	
