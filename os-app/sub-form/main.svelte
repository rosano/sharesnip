<script>
export let SNPCodeFormBaseObject;
export let SNPCodeFormDidSubmit;

export const modPublic = {
};

import { OLSKLocalized } from 'OLSKInternational';

import SNPCodeFormBaseLogic from './ui-logic.js';

const mod = {

	_ValueChildClass: SNPCodeFormBaseLogic.SNPCodeFormBaseChildClass(SNPCodeFormBaseObject.SNPDocumentType),

	// INTERFACE

	InterfaceSaveButtonDidClick () {
		SNPCodeFormDidSubmit(Object.assign(mod._ValueChildObject, SNPCodeFormBaseObject))
	},

	// MESSAGE

	SNPCodeFormValid (inputData) {
		mod._ValueChildObject = inputData;

		mod.SNPCodeFormBaseSaveButton.disabled = null;
	},

	SNPCodeFormNotValid () {
		delete mod._ValueChildObject;

		mod.SNPCodeFormBaseSaveButton.disabled = true;
	},

};

import SNPCodeFormNote from './submodules/SNPCodeFormNote/main.svelte';
</script>

<div class="SNPCodeFormBase">

{#if mod._ValueChildClass === 'SNPCodeFormNote' }
	<SNPCodeFormNote SNPCodeFormValid={ mod.SNPCodeFormValid } SNPCodeFormNotValid={ mod.SNPCodeFormNotValid } />
{/if}

<button class="SNPCodeFormBaseSaveButton" disabled bind:this={ mod.SNPCodeFormBaseSaveButton } on:click={ mod.InterfaceSaveButtonDidClick }>{ OLSKLocalized('SNPCodeFormBaseSaveButtonText') }</button>

</div>
