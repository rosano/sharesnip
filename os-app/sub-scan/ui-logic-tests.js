const { throws, rejects, deepEqual } = require('assert');

const mod = require('./ui-logic.js').default;

const SNPDocument = require('../_shared/SNPDocument/main.js').default;

describe('SNPScanDocument', function test_SNPScanDocument() {

	it('throws if not string', function () {
		throws(function () {
			mod.SNPScanDocument(null);
		}, /SNPErrorInputNotValid/);
	});

	it('returns object', function() {
		const SNPDocumentData = Math.random().toString();
		deepEqual(mod.SNPScanDocument(SNPDocumentData), {
			SNPDocumentType: SNPDocument.SNPDocumentTypeNote(),
			SNPDocumentData,
		});
	});

	context('SNPDocumentTypeLink', function () {

		it('returns object', function() {
			const SNPDocumentData = uRandomElement('http', 'https') + '://example.com';
			deepEqual(mod.SNPScanDocument(SNPDocumentData), {
				SNPDocumentType: SNPDocument.SNPDocumentTypeLink(),
				SNPDocumentData,
			});
		});
	
	});

});
