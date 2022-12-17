import RollupStart from './main.svelte';

import OLSKRemoteStorage from 'OLSKRemoteStorage';

const SNPCollectDetail = new RollupStart({
	target: document.body,
	props: Object.assign({
		SNPCollectDetailDispatchBack: (function  () {
			window.TestSNPCollectDetailDispatchBack.innerHTML = parseInt(window.TestSNPCollectDetailDispatchBack.innerHTML) + 1;
		}),
		SNPCollectDetailDispatchUpdate: (function  () {
			window.TestSNPCollectDetailDispatchUpdate.innerHTML = parseInt(window.TestSNPCollectDetailDispatchUpdate.innerHTML) + 1;
		}),
		SNPCollectDetailDispatchClone: (function  () {
			window.TestSNPCollectDetailDispatchClone.innerHTML = parseInt(window.TestSNPCollectDetailDispatchClone.innerHTML) + 1;
		}),
		SNPCollectDetailDispatchDiscard: (function  () {
			window.TestSNPCollectDetailDispatchDiscard.innerHTML = parseInt(window.TestSNPCollectDetailDispatchDiscard.innerHTML) + 1;
		}),
		SNPCollectDetailDispatchPreventEscapeDefault: (function  (inputData) {
			window.TestSNPCollectDetailDispatchPreventEscapeDefault.innerHTML = parseInt(window.TestSNPCollectDetailDispatchPreventEscapeDefault.innerHTML) + 1;
			window.TestSNPCollectDetailDispatchPreventEscapeDefaultData.innerHTML = inputData;
		}),
		_DebugLauncher: true,
	}, Object.fromEntries(Array.from((new window.URLSearchParams(window.location.search)).entries()).map(function (e) {
		if (['SNPCollectDetailItem'].includes(e[0])) {
			e[1] = JSON.parse(e[1]);
		}

		if (e[0] === 'SNPCollectDetailItem') {
			e[1] = OLSKRemoteStorage.OLSKRemoteStoragePostJSONParse(e[1]);
		}

		return e;
	}))),
});

export default SNPCollectDetail;
