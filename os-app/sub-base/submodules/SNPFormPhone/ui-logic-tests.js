const { throws, rejects, deepEqual } = require('assert');

const mod = require('./ui-logic.js').default;

describe('SNPFormPhoneDocument', function test_SNPFormPhoneDocument() {

	it('throws if not valid', function () {
		throws(function () {
			mod.SNPFormPhoneDocument(null);
		}, /SNPErrorInputNotValid/);
	});

	it('throws if SNPDocumentPhone not valid', function () {
		throws(function () {
			mod.SNPFormPhoneDocument({
				SNPDocumentPhone: null,
			});
		}, /SNPErrorInputNotValid/);
	});

	it('returns string', function() {
		const SNPDocumentPhone = Math.random().toString();
		deepEqual(mod.SNPFormPhoneDocument({
			SNPDocumentPhone,
		}), {
			SNPDocumentPhone,
			SNPDocumentData: 'tel:' + SNPDocumentPhone,
		});
	});

});
