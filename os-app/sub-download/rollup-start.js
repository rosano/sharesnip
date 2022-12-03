import RollupStart from './main.svelte';
import SNPDocument from '../_shared/SNPDocument/main.js';

const SNPDownload = new RollupStart({
	target: document.body,
	props: Object.assign({
		SNPDownloadData: Math.random().toString(),
	}, Object.fromEntries(Array.from((new window.URLSearchParams(window.location.search)).entries()).map(function (e) {
		return e;
	}))),
});

export default SNPDownload;
