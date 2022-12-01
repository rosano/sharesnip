import RollupStart from './main.svelte';

const SNPCodeFormLink = new RollupStart({
	target: document.body,
	props: Object.assign({
		SNPCodeFormDidFill: (function  (inputData) {
			window.TestSNPCodeFormDidFill.innerHTML = parseInt(window.TestSNPCodeFormDidFill.innerHTML) + 1;
			window.TestSNPCodeFormDidFillData.innerHTML = JSON.stringify(inputData);
		}),
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

export default SNPCodeFormLink;
