const { throws, rejects, deepEqual } = require('assert');

const mod = require('./ui-logic.js').default;

describe('SNPPlayListItemHumanURL', function test_SNPPlayListItemHumanURL() {

	it('throws if not string', function () {
		throws(function () {
			mod.SNPPlayListItemHumanURL(null);
		}, /SNPErrorInputNotValid/);
	});

	it('returns string', function() {
		const item = Math.random().toString();
		deepEqual(mod.SNPPlayListItemHumanURL(item), item);
	});

	it('strips protocol', function() {
		const item = Math.random().toString();
		deepEqual(mod.SNPPlayListItemHumanURL(uRandomElement('http', 'https') + '://' + item), item);
	});

	it('strips www', function() {
		const item = Math.random().toString();
		deepEqual(mod.SNPPlayListItemHumanURL('https://www.' + item), item);
	});

	it('truncates long string', function() {
		const item = Array.from(Array(100)).map(Math.random).join(' ');
		deepEqual(mod.SNPPlayListItemHumanURL(item), require('OLSKString').OLSKStringSnippet(item));
	});

});
