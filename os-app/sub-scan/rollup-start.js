import RollupStart from './main.svelte';

const SNPScan = new RollupStart({
	target: document.body,
	props: Object.assign({
		SNPScanDidSucceed: (function  (inputData) {
			window.TestSNPScanDidSucceed.innerHTML = parseInt(window.TestSNPScanDidSucceed.innerHTML) + 1;
			window.TestSNPScanDidSucceedData.innerHTML = JSON.stringify(inputData);
		}),
	}, Object.fromEntries(Array.from((new window.URLSearchParams(window.location.search)).entries()).map(function (e) {
		return e;
	}))),
});

export default SNPScan;
