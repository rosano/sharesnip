import RollupStart from './main.svelte';

const SNPCodeMake = new RollupStart({
	target: document.body,
	props: Object.assign({
		SNPCodeMakeObject: {
			SNPDocumentName: '',
		},
		SNPCodeFormDidSubmit: (function  (inputData) {
			window.TestSNPCodeFormDidSubmit.innerHTML = parseInt(window.TestSNPCodeFormDidSubmit.innerHTML) + 1;
			window.TestSNPCodeFormDidSubmitData.innerHTML = JSON.stringify(inputData);
		}),
	}, Object.fromEntries(Array.from((new window.URLSearchParams(window.location.search)).entries()).map(function (e) {
		return e;
	}))),
});

export default SNPCodeMake;
