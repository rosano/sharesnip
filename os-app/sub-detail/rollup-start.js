import RollupStart from './main.svelte';

import OLSKRemoteStorage from 'OLSKRemoteStorage';

const SNPCodeDetail = new RollupStart({
	target: document.body,
	props: Object.assign({
		SNPCodeDetailDispatchBack: (function  () {
			window.TestSNPCodeDetailDispatchBack.innerHTML = parseInt(window.TestSNPCodeDetailDispatchBack.innerHTML) + 1;
		}),
		SNPCodeDetailDispatchUpdate: (function  () {
			window.TestSNPCodeDetailDispatchUpdate.innerHTML = parseInt(window.TestSNPCodeDetailDispatchUpdate.innerHTML) + 1;
		}),
		SNPCodeDetailDispatchClone: (function  () {
			window.TestSNPCodeDetailDispatchClone.innerHTML = parseInt(window.TestSNPCodeDetailDispatchClone.innerHTML) + 1;
		}),
		SNPCodeDetailDispatchDiscard: (function  () {
			window.TestSNPCodeDetailDispatchDiscard.innerHTML = parseInt(window.TestSNPCodeDetailDispatchDiscard.innerHTML) + 1;
		}),
		_DebugLauncher: true,
	}, Object.fromEntries(Array.from((new window.URLSearchParams(window.location.search)).entries()).map(function (e) {
		if (['SNPCodeDetailItem'].includes(e[0])) {
			e[1] = JSON.parse(e[1]);
		}

		if (e[0] === 'SNPCodeDetailItem') {
			e[1] = OLSKRemoteStorage.OLSKRemoteStoragePostJSONParse(e[1]);
		}

		return e;
	}))),
});

export default SNPCodeDetail;
