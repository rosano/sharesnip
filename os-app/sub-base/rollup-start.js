import RollupStart from './main.svelte';
import SNPDocument from '../_shared/SNPDocument/main.js';

const SNPCodeFormBase = new RollupStart({
	target: document.body,
	props: Object.assign({
		SNPCodeFormBaseObject: {
			SNPDocumentName: '',
			SNPDocumentType: SNPDocument.SNPDocumentTypeNote(),
		},
		SNPCodeFormNotValid: (function  () {
			window.TestSNPCodeFormNotValid.innerHTML = parseInt(window.TestSNPCodeFormNotValid.innerHTML) + 1;
		}),
		SNPCodeFormValid: (function  (inputData) {
			window.TestSNPCodeFormValid.innerHTML = parseInt(window.TestSNPCodeFormValid.innerHTML) + 1;
			window.TestSNPCodeFormValidData.innerHTML = JSON.stringify(inputData);
		}),
		SNPCodeFormDidFill: (function  (inputData) {
			window.TestSNPCodeFormDidFill.innerHTML = parseInt(window.TestSNPCodeFormDidFill.innerHTML) + 1;
			window.TestSNPCodeFormDidFillData.innerHTML = JSON.stringify(inputData);
		}),
		SNPCodeFormDidSubmit: (function  (inputData) {
			window.TestSNPCodeFormDidSubmit.innerHTML = parseInt(window.TestSNPCodeFormDidSubmit.innerHTML) + 1;
			window.TestSNPCodeFormDidSubmitData.innerHTML = JSON.stringify(inputData);
		}),
	}, Object.fromEntries(Array.from((new window.URLSearchParams(window.location.search)).entries()).map(function (e) {
		if (['SNPCodeFormBaseObject'].includes(e[0])) {
			e[1] = JSON.parse(e[1]);
		}

		return e;
	}))),
});

export default SNPCodeFormBase;
