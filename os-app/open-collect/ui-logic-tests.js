const { throws, rejects, deepEqual } = require('assert');

const mod = require('./ui-logic.js').default;

describe('SNPCollectAccessibilitySummary', function test_SNPCollectAccessibilitySummary() {

	it('throws if not valid', function () {
		throws(function () {
			mod.SNPCollectAccessibilitySummary({});
		}, /SNPErrorInputNotValid/);
	});

	it('returns string', function() {
		const SNPDocumentName = Math.random().toString();
		deepEqual(mod.SNPCollectAccessibilitySummary(StubDocumentObjectValid({
			SNPDocumentName,
		})), SNPDocumentName);
	});

	it('truncates long string', function() {
		const item = Array.from(Array(100)).map(Math.random).join(' ');
		deepEqual(mod.SNPCollectAccessibilitySummary(StubDocumentObjectValid({
			SNPDocumentName: item,
		})), require('OLSKString').OLSKStringSnippet(item));
	});

});

describe('SNPCollectSortFunction', function test_SNPCollectSortFunction() {

	it('sorts by SNPDocumentModificationDate descending', function() {
		const item1 = {
			SNPDocumentModificationDate: new Date(0),
		};
		const item2 = {
			SNPDocumentModificationDate: new Date(1),
		};

		deepEqual([item1, item2].sort(mod.SNPCollectSortFunction), [item2, item1]);
	});

});

describe('SNPCollectIsMatch', function test_SNPCollectIsMatch() {

	it('throws error param2 if not string', function() {
		throws(function() {
			mod.SNPCollectIsMatch({}, null);
		}, /SNPErrorInputNotValid/);
	});

	it('returns false if no match', function() {
		const key = uRandomElement('SNPDocumentName', 'SNPDocumentData');
		const haystack = 'alfa';
		deepEqual(mod.SNPCollectIsMatch({
			[key]: haystack,
		}, 'bravo'), false);
	});

	it('matches OLSKStringMatch', function() {
		const key = uRandomElement('SNPDocumentName', 'SNPDocumentData');
		const haystack = 'álfa';
		deepEqual(mod.SNPCollectIsMatch({
			[key]: haystack,
		}, uRandomElement('alf', 'alfa', 'ALF')), true);
	});

});

describe('SNPCollectDocumentCount', function test_SNPCollectDocumentCount() {

	it('throws if not array', function () {
		throws(function () {
			mod.SNPCollectDocumentCount(null);
		}, /SNPErrorInputNotValid/);
	});

	it('returns number', function () {
		deepEqual(mod.SNPCollectDocumentCount([]), 0);
	});

	it('excludes if not invalid', function () {
		deepEqual(mod.SNPCollectDocumentCount([null]), 0);
	});

	it('includes if valid', function () {
		const item = uRandomInt();
		deepEqual(mod.SNPCollectDocumentCount(Array.from(Array(item)).map(function () {
			return StubDocumentObjectValid();
		})), item);
	});

});

describe('SNPCollectCloned', function test_SNPCollectCloned() {

	it('throws if not object', function () {
		throws(function () {
			mod.SNPCollectCloned(null);
		}, /SNPErrorInputNotValid/);
	});

	it('returns input', function() {
		deepEqual(mod.SNPCollectCloned({}), {});
	});

	it('returns copy', function() {
		const item = StubDocumentObjectValid({});
		require('assert').notStrictEqual(mod.SNPCollectCloned(item), item);
	});

	it('removes SNPDocumentID', function() {
		deepEqual(mod.SNPCollectCloned(StubDocumentObjectValid({
			SNPDocumentID: Math.random().toString(),
		})).SNPDocumentID, undefined);
	});

});
