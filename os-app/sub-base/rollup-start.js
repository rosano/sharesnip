import RollupStart from './main.svelte';
import SNPDocument from '../_shared/SNPDocument/main.js';

const SNPFormBase = new RollupStart({
	target: document.body,
	props: Object.assign({
		SNPFormBaseObject: {
			SNPDocumentName: '',
			SNPDocumentType: SNPDocument.SNPDocumentTypeNote(),
		},
		SNPFormNotValid: (function  () {
			window.TestSNPFormNotValid.innerHTML = parseInt(window.TestSNPFormNotValid.innerHTML) + 1;
		}),
		SNPFormValid: (function  (inputData) {
			window.TestSNPFormValid.innerHTML = parseInt(window.TestSNPFormValid.innerHTML) + 1;
			window.TestSNPFormValidData.innerHTML = JSON.stringify(inputData);
		}),
		SNPFormDidFill: (function  (inputData) {
			window.TestSNPFormDidFill.innerHTML = parseInt(window.TestSNPFormDidFill.innerHTML) + 1;
			window.TestSNPFormDidFillData.innerHTML = JSON.stringify(inputData);
		}),
		SNPFormDidSubmit: (function  (inputData) {
			window.TestSNPFormDidSubmit.innerHTML = parseInt(window.TestSNPFormDidSubmit.innerHTML) + 1;
			window.TestSNPFormDidSubmitData.innerHTML = JSON.stringify(inputData);
		}),
	}, Object.fromEntries(Array.from((new window.URLSearchParams(window.location.search)).entries()).map(function (e) {
		if (['SNPFormBaseObject', 'SNPFormDidSubmit'].includes(e[0]) && e[1].trim()) {
			e[1] = JSON.parse(e[1]);
		}

		return e;
	}))),
});

export default SNPFormBase;
