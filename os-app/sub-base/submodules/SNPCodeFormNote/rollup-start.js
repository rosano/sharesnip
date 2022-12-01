import RollupStart from './main.svelte';

const SNPCodeFormNote = new RollupStart({
	target: document.body,
	props: Object.assign({
		SNPCodeFormNotValid: (function  () {
			window.TestSNPCodeFormNotValid.innerHTML = parseInt(window.TestSNPCodeFormNotValid.innerHTML) + 1;
		}),
		SNPCodeFormValid: (function  (inputData) {
			window.TestSNPCodeFormValid.innerHTML = parseInt(window.TestSNPCodeFormValid.innerHTML) + 1;
			window.TestSNPCodeFormValidData.innerHTML = JSON.stringify(inputData);
		}),
	}, Object.fromEntries(Array.from((new window.URLSearchParams(window.location.search)).entries()).map(function (e) {
		return e;
	}))),
});

export default SNPCodeFormNote;
