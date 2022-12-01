const { throws, rejects, deepEqual } = require('assert');

const mod = require('./ui-logic.js').default;

const SNPDocument = require('../_shared/SNPDocument/main.js').default;

describe('SNPCodeFormBaseChildClass', function test_SNPCodeFormBaseChildClass() {

	it('throws if not valid', function () {
		throws(function () {
			mod.SNPCodeFormBaseChildClass(Math.random().toString());
		}, /SNPErrorInputNotValid/);
	});

	it('returns string', function() {
		const item = uRandomElement(SNPDocument.SNPDocumentTypes());
		deepEqual(mod.SNPCodeFormBaseChildClass(item), {
			[SNPDocument.SNPDocumentTypeNote()]: 'SNPCodeFormNote',
		}[item]);
	});

});
