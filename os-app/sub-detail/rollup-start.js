import RollupStart from './main.svelte';

import OLSKRemoteStorage from 'OLSKRemoteStorage';

const SNPPlayDetail = new RollupStart({
	target: document.body,
	props: Object.assign({
		SNPPlayDetailDispatchBack: (function  () {
			window.TestSNPPlayDetailDispatchBack.innerHTML = parseInt(window.TestSNPPlayDetailDispatchBack.innerHTML) + 1;
		}),
		SNPPlayDetailDispatchUpdate: (function  () {
			window.TestSNPPlayDetailDispatchUpdate.innerHTML = parseInt(window.TestSNPPlayDetailDispatchUpdate.innerHTML) + 1;
		}),
		SNPPlayDetailDispatchQueue: (function  () {
			window.TestSNPPlayDetailDispatchQueue.innerHTML = parseInt(window.TestSNPPlayDetailDispatchQueue.innerHTML) + 1;
		}),
		SNPPlayDetailDispatchDiscard: (function  () {
			window.TestSNPPlayDetailDispatchDiscard.innerHTML = parseInt(window.TestSNPPlayDetailDispatchDiscard.innerHTML) + 1;
		}),
		_DebugLauncher: true,
	}, Object.fromEntries(Array.from((new window.URLSearchParams(window.location.search)).entries()).map(function (e) {
		if (['SNPPlayDetailItem'].includes(e[0])) {
			e[1] = JSON.parse(e[1]);
		}

		if (e[0] === 'SNPPlayDetailItem') {
			e[1] = OLSKRemoteStorage.OLSKRemoteStoragePostJSONParse(e[1]);
		}

		return e;
	}))),
});

export default SNPPlayDetail;
