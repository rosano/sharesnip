import RollupStart from './main.svelte';
import SNPDocument from '../_shared/SNPDocument/main.js';

const SNPMake = new RollupStart({
	target: document.body,
	props: Object.assign({
		SNPFormDidSubmit: (function  (inputData) {
			window.TestSNPFormDidSubmit.innerHTML = parseInt(window.TestSNPFormDidSubmit.innerHTML) + 1;
			window.TestSNPFormDidSubmitData.innerHTML = JSON.stringify(inputData);
		}),
	}, Object.fromEntries(Array.from((new window.URLSearchParams(window.location.search)).entries()).map(function (e) {
		return e;
	}))),
});

export default SNPMake;
