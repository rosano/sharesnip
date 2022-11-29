import OLSKString from 'OLSKString';
import OLSKDOM from 'OLSKDOM';
import OLSKEmbed from 'OLSKEmbed';
import OLSKMoment from 'OLSKMoment';
import SNPDocument from '../_shared/SNPDocument/main.js';

const uAscending = function (a, b) {
  return (a < b) ? -1 : ((a > b) ? 1 : 0);
};

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

	_SNPCodeChunk (inputData, OLSKLocalized) {
		const today = OLSKMoment.OLSKMomentPerceptionDate(new Date());

		if (inputData.SNPDocumentCreationDate >= today) {
			return OLSKLocalized('SNPCodeChunkTodayText');
		}

		if (inputData.SNPDocumentCreationDate >= (new Date(today - 1000 * 60 * 60 * 24))) {
			return OLSKLocalized('SNPCodeChunkYesterdayText');
		}

		return OLSKMoment.OLSKMomentPerceptionDate(inputData.SNPDocumentCreationDate).toLocaleDateString();
	},

	SNPCodeChunkFunction (inputData, OLSKLocalized) {
		if (!Array.isArray(inputData)) {
			throw new Error('SNPErrorInputNotValid');
		}

		return inputData.reduce(function (coll, item) {
			const group = mod._SNPCodeChunk(item, OLSKLocalized);
			return Object.assign(coll, {
				[group]: (coll[group] || []).concat(item),
			});
		}, {});
	},

	SNPCodeChunkKeySortFunction (OLSKLocalized) {
		if (typeof OLSKLocalized !== 'function') {
			throw new Error('SNPErrorInputNotValid');
		}

		return function (a, b) {
			return uAscending(a, b);
		};
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
