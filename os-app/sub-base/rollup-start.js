import RollupStart from './main.svelte';
import SNPDocument from '../_shared/SNPDocument/main.js';

const SNPFormBase = new RollupStart({
	target: document.body,
	props: Object.assign({
		SNPFormBaseObject: {
			SNPDocumentName: '',
			SNPDocumentType: SNPDocument.SNPDocumentTypeNote(),
		},
		SNPCollectFormNotValid: (function  () {
			window.TestSNPCollectFormNotValid.innerHTML = parseInt(window.TestSNPCollectFormNotValid.innerHTML) + 1;
		}),
		SNPCollectFormValid: (function  (inputData) {
			window.TestSNPCollectFormValid.innerHTML = parseInt(window.TestSNPCollectFormValid.innerHTML) + 1;
			window.TestSNPCollectFormValidData.innerHTML = JSON.stringify(inputData);
		}),
		SNPCollectFormDidFill: (function  (inputData) {
			window.TestSNPCollectFormDidFill.innerHTML = parseInt(window.TestSNPCollectFormDidFill.innerHTML) + 1;
			window.TestSNPCollectFormDidFillData.innerHTML = JSON.stringify(inputData);
		}),
		SNPCollectFormDidSubmit: (function  (inputData) {
			window.TestSNPCollectFormDidSubmit.innerHTML = parseInt(window.TestSNPCollectFormDidSubmit.innerHTML) + 1;
			window.TestSNPCollectFormDidSubmitData.innerHTML = JSON.stringify(inputData);
		}),
	}, Object.fromEntries(Array.from((new window.URLSearchParams(window.location.search)).entries()).map(function (e) {
		if (['SNPFormBaseObject'].includes(e[0])) {
			e[1] = JSON.parse(e[1]);
		}

		return e;
	}))),
});

export default SNPFormBase;
