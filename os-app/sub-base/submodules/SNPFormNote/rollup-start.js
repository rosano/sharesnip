import RollupStart from './main.svelte';

const SNPFormNote = new RollupStart({
	target: document.body,
	props: Object.assign({
		SNPCollectFormDidFill: (function  (inputData) {
			window.TestSNPCollectFormDidFill.innerHTML = parseInt(window.TestSNPCollectFormDidFill.innerHTML) + 1;
			window.TestSNPCollectFormDidFillData.innerHTML = JSON.stringify(inputData);
		}),
		SNPCollectFormNotValid: (function  () {
			window.TestSNPCollectFormNotValid.innerHTML = parseInt(window.TestSNPCollectFormNotValid.innerHTML) + 1;
		}),
		SNPCollectFormValid: (function  (inputData) {
			window.TestSNPCollectFormValid.innerHTML = parseInt(window.TestSNPCollectFormValid.innerHTML) + 1;
			window.TestSNPCollectFormValidData.innerHTML = JSON.stringify(inputData);
		}),
	}, Object.fromEntries(Array.from((new window.URLSearchParams(window.location.search)).entries()).map(function (e) {
		if (['SNPCollectFormObject'].includes(e[0])) {
			e[1] = JSON.parse(e[1]);
		}

		return e;
	}))),
});

export default SNPFormNote;
