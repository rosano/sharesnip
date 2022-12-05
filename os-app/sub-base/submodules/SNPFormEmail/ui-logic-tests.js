const { throws, rejects, deepEqual } = require('assert');

const mod = require('./ui-logic.js').default;

describe('SNPFormEmailDocument', function test_SNPFormEmailDocument() {

	it('throws if not valid', function () {
		throws(function () {
			mod.SNPFormEmailDocument(null);
		}, /SNPErrorInputNotValid/);
	});

	it('throws if SNPDocumentEmail not valid', function () {
		throws(function () {
			mod.SNPFormEmailDocument({
				SNPDocumentEmail: null,
			});
		}, /SNPErrorInputNotValid/);
	});

	it('returns string', function() {
		const SNPDocumentEmail = uEmail();
		deepEqual(mod.SNPFormEmailDocument({
			SNPDocumentEmail,
		}), {
			SNPDocumentEmail,
			SNPDocumentData: 'mailto:' + SNPDocumentEmail,
		});
	});

});
