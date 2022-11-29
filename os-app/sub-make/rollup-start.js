import RollupStart from './main.svelte';

const SNPCodeMake = new RollupStart({
	target: document.body,
	props: Object.assign({
		SNPCodeMakeDispatchNote: (function  () {
			window.TestSNPCodeMakeDispatchNote.innerHTML = parseInt(window.TestSNPCodeMakeDispatchNote.innerHTML) + 1;
		}),
		SNPCodeMakeDispatchLink: (function  () {
			window.TestSNPCodeMakeDispatchLink.innerHTML = parseInt(window.TestSNPCodeMakeDispatchLink.innerHTML) + 1;
		}),
	}, Object.fromEntries(Array.from((new window.URLSearchParams(window.location.search)).entries()).map(function (e) {
		return e;
	}))),
});

export default SNPCodeMake;
