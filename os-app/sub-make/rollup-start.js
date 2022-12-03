import RollupStart from './main.svelte';
import SNPDocument from '../_shared/SNPDocument/main.js';

const SNPMake = new RollupStart({
	target: document.body,
	props: Object.assign({
		SNPFormNotValid: (function  () {
			window.TestSNPFormNotValid.innerHTML = parseInt(window.TestSNPFormNotValid.innerHTML) + 1;
		}),
		SNPFormValid: (function  (inputData) {
			window.TestSNPFormValid.innerHTML = parseInt(window.TestSNPFormValid.innerHTML) + 1;
			window.TestSNPFormValidData.innerHTML = JSON.stringify(inputData);
		}),
		SNPFormDidSubmit: (function  (inputData) {
			window.TestSNPFormDidSubmit.innerHTML = parseInt(window.TestSNPFormDidSubmit.innerHTML) + 1;
			window.TestSNPFormDidSubmitData.innerHTML = JSON.stringify(inputData);
		}),
	}, Object.fromEntries(Array.from((new window.URLSearchParams(window.location.search)).entries()).map(function (e) {
		return e;
	}))),
});

export default SNPMake;
