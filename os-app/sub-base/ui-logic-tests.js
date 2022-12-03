const { throws, rejects, deepEqual } = require('assert');

const mod = require('./ui-logic.js').default;

const SNPDocument = require('../_shared/SNPDocument/main.js').default;

describe('SNPFormBaseChildClass', function test_SNPFormBaseChildClass() {

	it('throws if not valid', function () {
		throws(function () {
			mod.SNPFormBaseChildClass(Math.random().toString());
		}, /SNPErrorInputNotValid/);
	});

	it('returns string', function() {
		const item = uRandomElement(SNPDocument.SNPDocumentTypes());
		deepEqual(mod.SNPFormBaseChildClass(item), {
			[SNPDocument.SNPDocumentTypeNote()]: 'SNPFormNote',
			[SNPDocument.SNPDocumentTypeLink()]: 'SNPCodeFormLink',
		}[item]);
	});

});
