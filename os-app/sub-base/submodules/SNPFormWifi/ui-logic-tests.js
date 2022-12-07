const { throws, rejects, deepEqual } = require('assert');

const mod = require('./ui-logic.js').default;

describe('SNPFormWifiDocument', function test_SNPFormWifiDocument() {

	it('throws if not valid', function () {
		throws(function () {
			mod.SNPFormWifiDocument(null);
		}, /SNPErrorInputNotValid/);
	});

	it('throws if SNPDocumentWifiNetwork not valid', function () {
		throws(function () {
			mod.SNPFormWifiDocument({
				SNPDocumentWifiNetwork: null,
			});
		}, /SNPErrorInputNotValid/);
	});

	it('returns string', function() {
		const SNPDocumentWifiNetwork = Math.random().toString();
		const SNPDocumentWifiPassword = Math.random().toString();
		const SNPDocumentWifiSecurity = Math.random().toString();
		const SNPDocumentWifiHidden = uRandomElement(true, false);
		deepEqual(mod.SNPFormWifiDocument({
			SNPDocumentWifiNetwork,
			SNPDocumentWifiPassword,
			SNPDocumentWifiSecurity,
			SNPDocumentWifiHidden,
		}), {
			SNPDocumentData: uDataWifi({
				SNPDocumentWifiNetwork,
				SNPDocumentWifiPassword,
				SNPDocumentWifiSecurity,
				SNPDocumentWifiHidden,
			}),
			SNPDocumentWifiNetwork,
			SNPDocumentWifiPassword,
			SNPDocumentWifiSecurity,
			SNPDocumentWifiHidden,
		});
	});

});
