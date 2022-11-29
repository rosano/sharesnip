import OLSKString from 'OLSKString';
import OLSKDOM from 'OLSKDOM';
import OLSKEmbed from 'OLSKEmbed';
import OLSKMoment from 'OLSKMoment';
import SNPDocument from '../_shared/SNPDocument/main.js';

const kSNPPlayCaptureAnchor = 'capture';
const kSNPPlayNameAnchor = 'name';
const kSNPPlayImageAnchor = 'image';
const kSNPPlayInboxAnchor = 'inbox';

const uAscending = function (a, b) {
  return (a < b) ? -1 : ((a > b) ? 1 : 0);
};

const uDescending = function (a, b) {
  return (a > b) ? -1 : ((a < b) ? 1 : 0);
};

const mod = {

	SNPPlayAccessibilitySummary (inputData) {
		if (SNPDocument.SNPDocumentErrors(inputData)) {
			throw new Error('SNPErrorInputNotValid');
		}

		return OLSKString.OLSKStringSnippet(inputData.SNPDocumentNotes);
	},

	SNPPlaySortFunction (a, b, log) {
		if (a.$SNPDocumentIsInbox !== b.$SNPDocumentIsInbox) {
			return uDescending(!!a.$SNPDocumentIsInbox, !!b.$SNPDocumentIsInbox);
		}

		if ([a.SNPDocumentArchiveDate, b.SNPDocumentArchiveDate].filter(function (e) {
			return !e;
		}) === 1) {
			return uAscending(!!a.SNPDocumentArchiveDate, !!b.SNPDocumentArchiveDate);
		}

		return (function(e) {
			return uDescending(a[e], b[e]);
		})(['SNPDocumentArchiveDate', 'SNPDocumentCreationDate'].filter(function (e) {
			return a[e] && b[e];
		}).shift());
	},

	SNPPlayIsMatch (param1, param2) {
		if (typeof param2 !== 'string') {
			throw new Error('SNPErrorInputNotValid');
		}

		return [param1.SNPDocumentURL, param1.SNPDocumentName, param1.SNPDocumentNotes].concat(param1.SNPDocumentTags).filter(function (e) {
			return !!e && OLSKString.OLSKStringMatch(param2, e);
		}).length;
	},

	_SNPPlayChunk (inputData, OLSKLocalized) {
		const today = OLSKMoment.OLSKMomentPerceptionDate(new Date());

		if (inputData.SNPDocumentArchiveDate) {
			return OLSKLocalized('SNPPlayChunkArchiveText');
		}

		if (inputData.$SNPDocumentIsInbox) {
			return OLSKLocalized('SNPPlayChunkInboxText');
		}

		if (inputData.SNPDocumentCreationDate >= today) {
			return OLSKLocalized('SNPPlayChunkTodayText');
		}

		if (inputData.SNPDocumentCreationDate >= (new Date(today - 1000 * 60 * 60 * 24))) {
			return OLSKLocalized('SNPPlayChunkYesterdayText');
		}

		return OLSKMoment.OLSKMomentPerceptionDate(inputData.SNPDocumentCreationDate).toLocaleDateString();
	},

	SNPPlayChunkFunction (inputData, OLSKLocalized) {
		if (!Array.isArray(inputData)) {
			throw new Error('SNPErrorInputNotValid');
		}

		return inputData.reduce(function (coll, item) {
			const group = mod._SNPPlayChunk(item, OLSKLocalized);
			return Object.assign(coll, {
				[group]: (coll[group] || []).concat(item),
			});
		}, {});
	},

	SNPPlayChunkKeySortFunction (OLSKLocalized) {
		if (typeof OLSKLocalized !== 'function') {
			throw new Error('SNPErrorInputNotValid');
		}

		return function (a, b) {
			return uAscending(a === OLSKLocalized('SNPPlayChunkArchiveText'), b === OLSKLocalized('SNPPlayChunkArchiveText'));
		};
	},

	SNPPlayDocuments (inputData) {
		if (typeof inputData !== 'string') {
			throw new Error('SNPErrorInputNotValid');
		}

		const recurse = function (coll, item) {
			const urls = item.split(/\s/).filter(function (e) {
				try {
					const item = new URL('', e);
					if (item.hostname) {
						return true;
					}
				} catch (err) {
					return false;
				}
			});

			if (urls.length > 1 && item.includes('\n')) {
				return item.split('\n').reduce(recurse, coll);
			}

			const SNPDocumentNotes = urls.reduce(function (coll, item) {
				return coll.split(item).join(' ');
			}, item).trim();

			if (!urls.length) {
				return coll.concat({
					SNPDocumentNotes,
				});
			}

			return coll.concat(urls.map(function (SNPDocumentURL) {
				return {
					SNPDocumentNotes,
					SNPDocumentURL,
				};
			}));
		};

		return inputData.split('\n\n').filter(function (e) {
			return !!e.trim();
		}).reduce(recurse, []);
	},

	async SNPPlayFetch (inputData, debug = {}) {
		if (SNPDocument.SNPDocumentErrors(inputData)) {
			throw new Error('SNPErrorInputNotValid');
		}

		if (!inputData.SNPDocumentURL) {
			return inputData;
		}

		const embed = OLSKEmbed.OLSKEmbedEndpointURL(inputData.SNPDocumentURL);

		const metadata = {};

		try {
			Object.assign(metadata, await (await (debug.window || window).fetch(OLSKEmbed.OLSKEmbedFetchURL(embed, inputData.SNPDocumentURL))).json());
		} catch {};

		if (Object.keys(metadata).length <= 1) {
			Object.assign(metadata, OLSKDOM.OLSKDOMMetadata(await (await (debug.window || window).fetch('SNP_PLAY_PROXY_URL_TEMPLATE_SWAP_TOKEN' + encodeURIComponent(inputData.SNPDocumentURL))).text(), debug));
		}

		return Object.assign(inputData, {
			SNPDocumentName: inputData.SNPDocumentName || metadata.title,
			SNPDocumentEmbedURL: metadata.html ? metadata.html.match(/src=\u0022(\S*)\u0022/)[1] : [
				'og:video:secure_url',
				'og:video:url',
				'og:video',
				'embedUrl',
			].reduce(function (coll, item) {
				return coll || metadata[item];
			}, undefined),
			SNPDocumentImageURL: [
				'thumbnail_url',
				'og:image',
			].reduce(function (coll, item) {
				return coll || metadata[item];
			}, undefined),
			SNPDocumentDidFetch: true,
		});
	},

	SNPPlayCaptureAnchor () {
		return kSNPPlayCaptureAnchor;
	},

	SNPPlayNameAnchor () {
		return kSNPPlayNameAnchor;
	},

	SNPPlayImageAnchor () {
		return kSNPPlayImageAnchor;
	},

	SNPPlayInboxAnchor () {
		return kSNPPlayInboxAnchor;
	},

	SNPPlayRemap () {
		return {
			SNPDocumentNotes: 'description',
			SNPDocumentURL: 'url',
			SNPDocumentName: 'name',
			SNPDocumentEmbedURL: 'embedUrl',
			SNPDocumentImageURL: 'image',
			SNPDocumentDidFetch: 'didFetch',
		};
	},

	SNPPlayDocumentCount (inputData) {
		if (!Array.isArray(inputData)) {
			throw new Error('SNPErrorInputNotValid');
		}

		return inputData.reduce(function (coll, item) {
			if (!item || item.$SNPDocumentIsInbox) {
				return coll;
			}

			return coll + 1;
		}, 0);
	},

};

export default mod;
