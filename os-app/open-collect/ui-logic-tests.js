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

	it('sorts by SNPDocumentModificationDate descending', function() {
		const item1 = {
			SNPDocumentModificationDate: new Date(0),
		};
		const item2 = {
			SNPDocumentModificationDate: new Date(1),
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
		const key = uRandomElement('SNPDocumentName', 'SNPDocumentData');
		const haystack = 'alfa';
		deepEqual(mod.SNPCodeIsMatch({
			[key]: haystack,
		}, 'bravo'), false);
	});

	it('matches OLSKStringMatch', function() {
		const key = uRandomElement('SNPDocumentName', 'SNPDocumentData');
		const haystack = 'álfa';
		deepEqual(mod.SNPCodeIsMatch({
			[key]: haystack,
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

describe('SNPCodeCloned', function test_SNPCodeCloned() {

	it('throws if not object', function () {
		throws(function () {
			mod.SNPCodeCloned(null);
		}, /SNPErrorInputNotValid/);
	});

	it('returns input', function() {
		deepEqual(mod.SNPCodeCloned({}), {});
	});

	it('returns copy', function() {
		const item = StubDocumentObjectValid({});
		require('assert').notStrictEqual(mod.SNPCodeCloned(item), item);
	});

	it('removes SNPDocumentID', function() {
		deepEqual(mod.SNPCodeCloned(StubDocumentObjectValid({
			SNPDocumentID: Math.random().toString(),
		})).SNPDocumentID, undefined);
	});

});
