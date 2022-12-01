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
		SNPCodeFormDidSubmit(Object.assign(SNPCodeFormBaseObject, mod._ValueChildObject))
	},

	// MESSAGE

	SNPCodeFormNotValid () {
		delete mod._ValueChildObject;

		mod.SNPCodeFormBaseSaveButton.disabled = true;
	},

	SNPCodeFormValid (inputData) {
		mod._ValueChildObject = inputData;

		mod.SNPCodeFormBaseSaveButton.disabled = null;
	},

};

import SNPCodeFormNote from './submodules/SNPCodeFormNote/main.svelte';
</script>

<div class="SNPCodeFormBase">

{#if mod._ValueChildClass === 'SNPCodeFormNote' }
	<SNPCodeFormNote SNPCodeFormNotValid={ mod.SNPCodeFormNotValid } SNPCodeFormValid={ mod.SNPCodeFormValid } />
{/if}

<button class="SNPCodeFormBaseSaveButton" disabled bind:this={ mod.SNPCodeFormBaseSaveButton } on:click={ mod.InterfaceSaveButtonDidClick }>{ OLSKLocalized('SNPCodeFormBaseSaveButtonText') }</button>

</div>
