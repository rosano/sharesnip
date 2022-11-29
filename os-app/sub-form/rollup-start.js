import RollupStart from './main.svelte';
import SNPDocument from '../_shared/SNPDocument/main.js';

const SNPCodeFormBase = new RollupStart({
	target: document.body,
	props: Object.assign({
		SNPCodeFormBaseObject: {
			SNPDocumentType: SNPDocument.SNPDocumentTypeNote(),
		},
	}, Object.fromEntries(Array.from((new window.URLSearchParams(window.location.search)).entries()).map(function (e) {
		if (['SNPCodeFormBaseObject'].includes(e[0])) {
			e[1] = JSON.parse(e[1]);
		}

		return e;
	}))),
});

export default SNPCodeFormBase;
