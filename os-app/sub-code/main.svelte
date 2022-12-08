<script>
export let SNPCodeObject;

import kjua from 'kjua';
import { OLSK_SPEC_UI } from 'OLSKSpec';

const mod = {

	// REACT

	ReactData() {
		if (!mod._ValueContainer) {
			return;
		}
		
		if (OLSK_SPEC_UI()) {
			return;
		}

		mod._ValueContainer.childNodes.forEach(function (e) {
			mod._ValueContainer.removeChild(e);
		});

		mod._ValueContainer.appendChild(kjua({
			render: 'canvas',
			ecLevel: 'H',
			size: 100,
			rounded: 100,
			quiet: 0,
			text: SNPCodeObject.SNPDocumentData,
		}));
	},

	// LIFECYCLE

	LifecycleModuleDidMount() {
		mod.ReactData();
	},

};

$: {
	mod.ReactData(SNPCodeObject.SNPDocumentData)
}

import { onMount } from 'svelte';
onMount(mod.LifecycleModuleDidMount);
</script>

<div class="SNPCode">

<div bind:this={ mod._ValueContainer }></div>

</div>