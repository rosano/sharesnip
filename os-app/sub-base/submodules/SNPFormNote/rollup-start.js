import RollupStart from './main.svelte';

const SNPFormNote = new RollupStart({
	target: document.body,
	props: Object.assign({
		SNPFormDidFill: (function  (inputData) {
			window.TestSNPFormDidFill.innerHTML = parseInt(window.TestSNPFormDidFill.innerHTML) + 1;
			window.TestSNPFormDidFillData.innerHTML = JSON.stringify(inputData);
		}),
		SNPFormNotValid: (function  () {
			window.TestSNPFormNotValid.innerHTML = parseInt(window.TestSNPFormNotValid.innerHTML) + 1;
		}),
		SNPFormValid: (function  (inputData) {
			window.TestSNPFormValid.innerHTML = parseInt(window.TestSNPFormValid.innerHTML) + 1;
			window.TestSNPFormValidData.innerHTML = JSON.stringify(inputData);
		}),
	}, Object.fromEntries(Array.from((new window.URLSearchParams(window.location.search)).entries()).map(function (e) {
		if (['SNPFormObject'].includes(e[0])) {
			e[1] = JSON.parse(e[1]);
		}

		return e;
	}))),
});

export default SNPFormNote;
