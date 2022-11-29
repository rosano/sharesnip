import SNPDocument from '../_shared/SNPDocument/main.js';

import OLSKString from 'OLSKString';

const uDescending = function (a, b) {
  return (a > b) ? -1 : ((a < b) ? 1 : 0);
};

const mod = {

	SNPCodeAccessibilitySummary (inputData) {
		if (SNPDocument.SNPDocumentErrors(inputData)) {
			throw new Error('SNPErrorInputNotValid');
		}

		return OLSKString.OLSKStringSnippet(inputData.SNPDocumentName);
	},

	SNPCodeSortFunction (a, b, log) {
		return (function(e) {
			return uDescending(a[e], b[e]);
		})(['SNPDocumentCreationDate'].filter(function (e) {
			return a[e] && b[e];
		}).shift());
	},

	SNPCodeIsMatch (param1, param2) {
		if (typeof param2 !== 'string') {
			throw new Error('SNPErrorInputNotValid');
		}

		return [param1.SNPDocumentName].filter(function (e) {
			return !!e && OLSKString.OLSKStringMatch(param2, e);
		}).length;
	},

	SNPCodeDocumentCount (inputData) {
		if (!Array.isArray(inputData)) {
			throw new Error('SNPErrorInputNotValid');
		}

		return inputData.reduce(function (coll, item) {
			if (!item) {
				return coll;
			}

			return coll + 1;
		}, 0);
	},

};

export default mod;
