const { throws, rejects, deepEqual } = require('assert');

const mod = require('./ui-logic.js').default;

describe('SNPCodeAccessibilitySummary', function test_SNPCodeAccessibilitySummary() {

	it('throws if not valid', function () {
		throws(function () {
			mod.SNPCodeAccessibilitySummary({});
		}, /SNPErrorInputNotValid/);
	});

	it('returns string', function() {
		const SNPDocumentName = Math.random().toString();
		deepEqual(mod.SNPCodeAccessibilitySummary(StubDocumentObjectValid({
			SNPDocumentName,
		})), SNPDocumentName);
	});

	it('truncates long string', function() {
		const item = Array.from(Array(100)).map(Math.random).join(' ');
		deepEqual(mod.SNPCodeAccessibilitySummary(StubDocumentObjectValid({
			SNPDocumentName: item,
		})), require('OLSKString').OLSKStringSnippet(item));
	});

});

describe('SNPCodeSortFunction', function test_SNPCodeSortFunction() {

	it('sorts by SNPDocumentCreationDate descending', function() {
		const item1 = {
			SNPDocumentCreationDate: new Date(0),
		};
		const item2 = {
			SNPDocumentCreationDate: new Date(1),
		};

		deepEqual([item1, item2].sort(mod.SNPCodeSortFunction), [item2, item1]);
	});

});

describe('SNPCodeIsMatch', function test_SNPCodeIsMatch() {

	it('throws error param2 if not string', function() {
		throws(function() {
			mod.SNPCodeIsMatch({}, null);
		}, /SNPErrorInputNotValid/);
	});

	it('returns false if no match', function() {
		const key = uRandomElement('SNPDocumentName');
		const haystack = 'alfa';
		deepEqual(mod.SNPCodeIsMatch({
			[key]: key === 'SNPDocumentTags' ? [haystack] : haystack,
		}, 'bravo'), false);
	});

	it('matches OLSKStringMatch', function() {
		const key = uRandomElement('SNPDocumentName');
		const haystack = 'álfa';
		deepEqual(mod.SNPCodeIsMatch({
			[key]: key === 'SNPDocumentTags' ? [haystack] : haystack,
		}, uRandomElement('alf', 'alfa', 'ALF')), true);
	});

});

describe('SNPCodeDocumentCount', function test_SNPCodeDocumentCount() {

	it('throws if not array', function () {
		throws(function () {
			mod.SNPCodeDocumentCount(null);
		}, /SNPErrorInputNotValid/);
	});

	it('returns number', function () {
		deepEqual(mod.SNPCodeDocumentCount([]), 0);
	});

	it('excludes if not invalid', function () {
		deepEqual(mod.SNPCodeDocumentCount([null]), 0);
	});

	it('includes if valid', function () {
		const item = uRandomInt();
		deepEqual(mod.SNPCodeDocumentCount(Array.from(Array(item)).map(function () {
			return StubDocumentObjectValid();
		})), item);
	});

});
