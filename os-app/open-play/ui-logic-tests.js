const { throws, rejects, deepEqual } = require('assert');

const mod = require('./ui-logic.js').default;
const OLSKMoment = require('OLSKMoment');
const OLSKEmbed = require('OLSKEmbed');
import { JSDOM } from 'jsdom';

const uLocalized = function (inputData) {
	return inputData + '-LOCALIZED';
};

describe('SNPPlayAccessibilitySummary', function test_SNPPlayAccessibilitySummary() {

	it('throws if not valid', function () {
		throws(function () {
			mod.SNPPlayAccessibilitySummary({});
		}, /SNPErrorInputNotValid/);
	});

	it('returns string', function() {
		const SNPDocumentNotes = Math.random().toString();
		deepEqual(mod.SNPPlayAccessibilitySummary(StubDocumentObjectValid({
			SNPDocumentNotes,
		})), SNPDocumentNotes);
	});

	it('truncates long string', function() {
		const item = Array.from(Array(100)).map(Math.random).join(' ');
		deepEqual(mod.SNPPlayAccessibilitySummary(StubDocumentObjectValid({
			SNPDocumentNotes: item,
		})), require('OLSKString').OLSKStringSnippet(item));
	});

});

describe('SNPPlaySortFunction', function test_SNPPlaySortFunction() {

	it('sorts by SNPDocumentCreationDate descending', function() {
		const item1 = {
			SNPDocumentCreationDate: new Date(0),
		};
		const item2 = {
			SNPDocumentCreationDate: new Date(1),
		};

		deepEqual([item1, item2].sort(mod.SNPPlaySortFunction), [item2, item1]);
	});

	it('sorts SNPDocumentArchiveDate below others', function() {
		const item1 = {
			SNPDocumentCreationDate: new Date(0),
			SNPDocumentArchiveDate: new Date(),
		};
		const item2 = {
			SNPDocumentCreationDate: new Date(1),
		};

		deepEqual([item1, item2].sort(mod.SNPPlaySortFunction), [item2, item1]);
	});

	it('sorts by SNPDocumentArchiveDate descending', function() {
		const item1 = {
			SNPDocumentCreationDate: new Date(1),
			SNPDocumentArchiveDate: new Date(0),
		};
		const item2 = {
			SNPDocumentCreationDate: new Date(0),
			SNPDocumentArchiveDate: new Date(1),
		};

		deepEqual([item1, item2].sort(mod.SNPPlaySortFunction), [item2, item1]);
	});

	it('sorts $SNPDocumentIsInbox above others', function() {
		const item1 = {
			SNPDocumentCreationDate: new Date(1),
		};
		const item2 = {
			SNPDocumentCreationDate: new Date(0),
			$SNPDocumentIsInbox: true,
		};

		deepEqual([item1, item2].sort(mod.SNPPlaySortFunction), [item2, item1]);
	});

});

describe('SNPPlayIsMatch', function test_SNPPlayIsMatch() {

	it('throws error param2 if not string', function() {
		throws(function() {
			mod.SNPPlayIsMatch({}, null);
		}, /SNPErrorInputNotValid/);
	});

	it('returns false if no match', function() {
		const key = uRandomElement('SNPDocumentURL', 'SNPDocumentName', 'SNPDocumentNotes', 'SNPDocumentTags');
		const haystack = 'alfa';
		deepEqual(mod.SNPPlayIsMatch({
			[key]: key === 'SNPDocumentTags' ? [haystack] : haystack,
		}, 'bravo'), false);
	});

	it('matches OLSKStringMatch', function() {
		const key = uRandomElement('SNPDocumentURL', 'SNPDocumentName', 'SNPDocumentNotes', 'SNPDocumentTags');
		const haystack = uRandomElement('alfa', 'álfa');
		deepEqual(mod.SNPPlayIsMatch({
			[key]: key === 'SNPDocumentTags' ? [haystack] : haystack,
		}, uRandomElement('alf', 'alfa', 'ALF')), true);
	});

});

describe('SNPPlayChunkFunction', function test_SNPPlayChunkFunction() {

	const _SNPPlayChunkFunction = function (inputData) {
		return mod.SNPPlayChunkFunction([stub], uLocalized);
	};

	it('throws if not array', function () {
		throws(function () {
			mod.SNPPlayChunkFunction(null);
		}, /SNPErrorInputNotValid/);
	});

	it('returns object', function() {
		deepEqual(mod.SNPPlayChunkFunction([]), {});
	});

	it('groups if inbox', function() {
		const item = {
			$SNPDocumentIsInbox: true,
		};
		deepEqual(mod.SNPPlayChunkFunction([item], uLocalized), {
			[uLocalized('SNPPlayChunkInboxText')]: [item],
		});
	});

	it('groups if today', function() {
		const item = {
			SNPDocumentCreationDate: OLSKMoment.OLSKMomentPerceptionDate(new Date()),
		};
		deepEqual(mod.SNPPlayChunkFunction([item], uLocalized), {
			[uLocalized('SNPPlayChunkTodayText')]: [item],
		});
	});

	it('groups if yesterday', function() {
		const item = {
			SNPDocumentCreationDate: new Date(OLSKMoment.OLSKMomentPerceptionDate(new Date()) - 1),
		};
		deepEqual(mod.SNPPlayChunkFunction([item], uLocalized), {
			[uLocalized('SNPPlayChunkYesterdayText')]: [item],
		});
	});

	it('groups if before yesterday', function() {
		const item = {
			SNPDocumentCreationDate: new Date(OLSKMoment.OLSKMomentPerceptionDate(new Date()) - 1000 * 60 * 60 * 24 - 1),
		};
		deepEqual(mod.SNPPlayChunkFunction([item], uLocalized), {
			[OLSKMoment.OLSKMomentPerceptionDate(item.SNPDocumentCreationDate).toLocaleDateString()]: [item],
		});
	});

	it('groups if archive', function() {
		const item = {
			SNPDocumentCreationDate: new Date(),
			SNPDocumentArchiveDate: new Date(),
		};
		deepEqual(mod.SNPPlayChunkFunction([item], uLocalized), {
			[uLocalized('SNPPlayChunkArchiveText')]: [item],
		});
	});

});

describe('SNPPlayChunkKeySortFunction', function test_SNPPlayChunkKeySortFunction() {

	it('throws if not function', function () {
		throws(function () {
			mod.SNPPlayChunkKeySortFunction(null);
		}, /SNPErrorInputNotValid/);
	});

	it('returns function', function () {
		deepEqual(typeof mod.SNPPlayChunkKeySortFunction(function () {}), 'function');
	});

	it('sorts SNPPlayChunkArchiveText below others', function() {
		const item1 = uLocalized('SNPPlayChunkArchiveText');
		const item2 = Math.random().toString();

		deepEqual([item1, item2].sort(mod.SNPPlayChunkKeySortFunction(uLocalized)), [item2, item1]);
	});

});

describe('SNPPlayDocuments', function test_SNPPlayDocuments () {

	const uItems = function (inputData) {
		return Array.from(Array(Math.max(2, uRandomInt(10)))).map(inputData);
	};

	it('throws if not string', function () {
		throws(function () {
			mod.SNPPlayDocuments(null);
		}, /SNPErrorInputNotValid/);
	});

	it('returns array', function () {
		deepEqual(mod.SNPPlayDocuments(''), []);
	});

	it('parses strings', function () {
		const item = uItems(function () {
			return Math.random().toString();
		});
		deepEqual(mod.SNPPlayDocuments(item.join('\n\n')), item.map(function (e) {
			return {
				SNPDocumentNotes: e,
			};
		}));
	});

	it('parses urls', function () {
		const item = uItems(function () {
			return uRandomElement('http', 'https') + '://example.com/' + Math.random().toString();
		});
		deepEqual(mod.SNPPlayDocuments(item.join('\n')), item.map(function (e) {
			return {
				SNPDocumentURL: e,
				SNPDocumentNotes: '',
			};
		}));
	});

	it('parses combined', function () {
		const textFirst = uRandomElement(true, false);

		const item = uItems(function () {
			const text = Math.random().toString();
			const link = 'https://example.com';
			return (textFirst ? [text, link] : [link, text]).join(' ');
		});

		deepEqual(mod.SNPPlayDocuments(item.join('\n')), item.map(function (e) {
			const [ text, link ] = textFirst ? e.split(' ') : e.split(' ').reverse();
			return {
				SNPDocumentURL: link,
				SNPDocumentNotes: text,
			};
		}));
	});

	it('parses multi-url line', function () {
		const SNPDocumentNotes = Math.random().toString();
		const links = uItems(function () {
			return uLink();
		});

		deepEqual(mod.SNPPlayDocuments([SNPDocumentNotes].concat(links).join(' ')), links.map(function (SNPDocumentURL) {
			return {
				SNPDocumentURL,
				SNPDocumentNotes,
			};
		}));
	});

	it('parses multi-url block', function () {
		const items = uItems(function () {
			return [Math.random().toString(), uLink()];
		});

		deepEqual(mod.SNPPlayDocuments(items.map(function ([text, link]) {
			return [text, link].join(' ');
		}).join('\n')), items.map(function ([SNPDocumentNotes, SNPDocumentURL]) {
			return {
				SNPDocumentURL,
				SNPDocumentNotes,
			};
		}));
	});

	it('parses single-url block', function () {
		const SNPDocumentNotes = uItems(function () {
			return Math.random().toString();
		}).join('\n');
		const SNPDocumentURL = uLink();

		deepEqual(mod.SNPPlayDocuments([SNPDocumentURL, SNPDocumentNotes].join('\n')), [{
			SNPDocumentURL,
			SNPDocumentNotes,
		}]);
	});

});

describe('SNPPlayFetch', function test_SNPPlayFetch () {

	it('rejects if not valid', async function () {
		await rejects(mod.SNPPlayFetch({}), /SNPErrorInputNotValid/);
	});

	it('returns inputData', async function () {
		const item = StubDocumentObjectValid();
		deepEqual(await mod.SNPPlayFetch(item), item);
	});

	it('calls window.fetch', function () {
		const SNPDocumentURL = Math.random().toString();
		deepEqual(uCapture(function (fetch) {
			mod.SNPPlayFetch(StubDocumentObjectValid({
				SNPDocumentURL,
			}), {
				window: {
					fetch,
				},
			});
		}), ['SNP_PLAY_PROXY_URL_TEMPLATE_SWAP_TOKEN' + SNPDocumentURL]);
	});

	it('sets SNPDocumentName', async function () {
		const item = Math.random().toString();
		deepEqual((await mod.SNPPlayFetch(StubDocumentObjectValid({
			SNPDocumentURL: Math.random().toString(),
		}), {
			window: {
				fetch: (function () {
					return {
						text: (function () {
							return `<title>${ item }</title>`;
						}),
					};
				}),
			},
			JSDOM: JSDOM.fragment,
		})).SNPDocumentName, item);
	});

	it('keeps existing SNPDocumentName', async function () {
		const SNPDocumentName = Math.random().toString();
		deepEqual((await mod.SNPPlayFetch(StubDocumentObjectValid({
			SNPDocumentName,
			SNPDocumentURL: Math.random().toString(),
		}), {
			window: {
				fetch: (function () {
					return {
						text: (function () {
							return `<title>${ Math.random().toString() }</title>`;
						}),
					};
				}),
			},
			JSDOM: JSDOM.fragment,
		})).SNPDocumentName, SNPDocumentName);
	});

	context('SNPDocumentEmbedURL', function () {

		const item = Math.random().toString();
		Object.entries({
			'og:video': `<meta property="og:video" content="${ item }" />`,
			'og:video:url': `<meta property="og:video:url" content="${ item }" />`,
			'og:video:secure_url': `<meta property="og:video:secure_url" content="${ item }" />`,
			'meta embedUrl': `<meta itemprop="embedUrl" content="${ item }"/>`,
			'link embedUrl': `<link itemprop="embedUrl" href="${ item }"/>`,
			'json-ld': `<script type="application/ld+json">[{"embedUrl":"${ item }"}]</script>`,
		}).forEach(function ([key, value]) {

			it('extracts ' + key, async function () {
				deepEqual((await mod.SNPPlayFetch(StubDocumentObjectValid({
					SNPDocumentURL: Math.random().toString(),
				}), {
					window: {
						fetch: (function () {
							return {
								text: (function () {
									return key === 'og:video:secure_url' ? [
										`<meta property="og:video" content="${ item }" />`,
										value,
									].join('') : value;
								}),
							};
						}),
					},
					JSDOM: JSDOM.fragment,
				})).SNPDocumentEmbedURL, item);
			});

		});
	
	});

	context('SNPDocumentImageURL', function () {
		
		const item = Math.random().toString();
		Object.entries({
			'og:image': `<meta property="og:image" content="${ item }" />`,
		}).forEach(function ([key, value]) {

			it('extracts ' + key, async function () {
				deepEqual((await mod.SNPPlayFetch(StubDocumentObjectValid({
					SNPDocumentURL: Math.random().toString(),
				}), {
					window: {
						fetch: (function () {
							return {
								text: (function () {
									return value;
								}),
							};
						}),
					},
					JSDOM: JSDOM.fragment,
				})).SNPDocumentImageURL, item);
			});

		});
	
	});

	it('sets SNPDocumentDidFetch', async function () {
		const item = Math.random().toString();
		deepEqual((await mod.SNPPlayFetch(StubDocumentObjectValid({
			SNPDocumentURL: Math.random().toString(),
		}), {
			window: {
				fetch: (function () {
					return {
						text: (function () {
							return Math.random().toString();
						}),
					};
				}),
			},
			JSDOM: JSDOM.fragment,
		})).SNPDocumentDidFetch, true);
	});

	context('oembed', function () {

		it('fetch embed url', function () {
			const SNPDocumentURL = OLSKEmbed._OLSKEmbedCanonicalURL();
			deepEqual(uCapture(function (fetch) {
				mod.SNPPlayFetch(StubDocumentObjectValid({
					SNPDocumentURL,
				}), {
					window: {
						fetch,
					},
				});
			}), [OLSKEmbed.OLSKEmbedFetchURL(OLSKEmbed.OLSKEmbedEndpointURL(SNPDocumentURL), SNPDocumentURL)]);
		});

		it('sets SNPDocumentName', async function () {
			const title = Math.random().toString();
			deepEqual((await mod.SNPPlayFetch(StubDocumentObjectValid({
				SNPDocumentURL: OLSKEmbed._OLSKEmbedCanonicalURL(),
			}), {
				window: {
					fetch: (function () {
						return {
							json: (function () {
								return {
									[Math.random().toString()]: Math.random().toString(),
									title,
								};
							}),
						};
					}),
				},
				JSDOM: JSDOM.fragment,
			})).SNPDocumentName, title);
		});

		it('sets SNPDocumentImageURL', async function () {
			const thumbnail_url = Math.random().toString();
			deepEqual((await mod.SNPPlayFetch(StubDocumentObjectValid({
				SNPDocumentURL: OLSKEmbed._OLSKEmbedCanonicalURL(),
			}), {
				window: {
					fetch: (function () {
						return {
							json: (function () {
								return {
									[Math.random().toString()]: Math.random().toString(),
									thumbnail_url,
								};
							}),
						};
					}),
				},
				JSDOM: JSDOM.fragment,
			})).SNPDocumentImageURL, thumbnail_url);
		});

		it('sets SNPDocumentEmbedURL', async function () {
			const url = 'https://www.youtube.com/embed/oKjXqck4AS8?feature=oembed';
			const html = `"html":"\u003ciframe width=\u0022200\u0022 height=\u0022113\u0022 src=\u0022${ url }\u0022 frameborder=\u00220\u0022 allow=\u0022accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\u0022 allowfullscreen\u003e\u003c/iframe\u003e"}`;
			deepEqual((await mod.SNPPlayFetch(StubDocumentObjectValid({
				SNPDocumentURL: OLSKEmbed._OLSKEmbedCanonicalURL(),
			}), {
				window: {
					fetch: (function () {
						return {
							json: (function () {
								return {
									[Math.random().toString()]: Math.random().toString(),
									html,
								};
							}),
						};
					}),
				},
				JSDOM: JSDOM.fragment,
			})).SNPDocumentEmbedURL, url);
		});
	
	});

});

describe('SNPPlayCaptureAnchor', function test_SNPPlayCaptureAnchor() {

	it('returns string', function() {
		deepEqual(mod.SNPPlayCaptureAnchor(), 'capture');
	});

});

describe('SNPPlayNameAnchor', function test_SNPPlayNameAnchor() {

	it('returns string', function() {
		deepEqual(mod.SNPPlayNameAnchor(), 'name');
	});

});

describe('SNPPlayImageAnchor', function test_SNPPlayImageAnchor() {

	it('returns string', function() {
		deepEqual(mod.SNPPlayImageAnchor(), 'image');
	});

});

describe('SNPPlayInboxAnchor', function test_SNPPlayInboxAnchor() {

	it('returns string', function() {
		deepEqual(mod.SNPPlayInboxAnchor(), 'inbox');
	});

});

describe('SNPPlayRemap', function test_SNPPlayRemap() {

	it('returns object', function() {
		deepEqual(mod.SNPPlayRemap(), {
			SNPDocumentNotes: 'description',
			SNPDocumentURL: 'url',
			SNPDocumentName: 'name',
			SNPDocumentEmbedURL: 'embedUrl',
			SNPDocumentImageURL: 'image',
			SNPDocumentDidFetch: 'didFetch',
		});
	});

});

describe('SNPPlayDocumentCount', function test_SNPPlayDocumentCount() {

	it('throws if not array', function () {
		throws(function () {
			mod.SNPPlayDocumentCount(null);
		}, /SNPErrorInputNotValid/);
	});

	it('returns number', function () {
		deepEqual(mod.SNPPlayDocumentCount([]), 0);
	});

	it('excludes if not invalid', function () {
		deepEqual(mod.SNPPlayDocumentCount([null]), 0);
	});

	it('includes if valid', function () {
		const item = uRandomInt();
		deepEqual(mod.SNPPlayDocumentCount(Array.from(Array(item)).map(function () {
			return StubDocumentObjectValid();
		})), item);
	});

	it('excludes if $SNPDocumentIsInbox', function () {
		deepEqual(mod.SNPPlayDocumentCount(Array.from(Array(uRandomInt())).map(function () {
			return StubDocumentObjectValid({
				$SNPDocumentIsInbox: true,
			});
		})), 0);
	});

});
