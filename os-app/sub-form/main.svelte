<script>
export let SNPCodeFormBaseObject;

export const modPublic = {
};

import { OLSKLocalized } from 'OLSKInternational';

import SNPCodeFormBaseLogic from './ui-logic.js';

const mod = {

	_ValueChildClass: SNPCodeFormBaseLogic.SNPCodeFormBaseChildClass(SNPCodeFormBaseObject.SNPDocumentType),

	// MESSAGE

	SNPCodeFormValid () {
		mod.SNPCodeFormBaseSaveButton.disabled = null;
	},

	SNPCodeFormNotValid () {
		mod.SNPCodeFormBaseSaveButton.disabled = true;
	},

};

import SNPCodeFormNote from './submodules/SNPCodeFormNote/main.svelte';
</script>

<div class="SNPCodeFormBase">

{#if mod._ValueChildClass === 'SNPCodeFormNote' }
	<SNPCodeFormNote SNPCodeFormValid={ mod.SNPCodeFormValid } SNPCodeFormNotValid={ mod.SNPCodeFormNotValid } />
{/if}

<button class="SNPCodeFormBaseSaveButton" disabled bind:this={ mod.SNPCodeFormBaseSaveButton }>{ OLSKLocalized('SNPCodeFormBaseSaveButtonText') }</button>

</div>
