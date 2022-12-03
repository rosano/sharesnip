<script>
export let SNPFormBaseObject;
export let SNPCodeFormNotValid;
export let SNPCodeFormValid;
export let SNPCodeFormDidFill;
export let SNPCodeFormDidSubmit;

export const modPublic = {
};

import { OLSKLocalized } from 'OLSKInternational';

import SNPFormBaseLogic from './ui-logic.js';

const mod = {

	// INTERFACE

	InterfaceSaveButtonDidClick () {
		SNPCodeFormDidSubmit(Object.assign(SNPFormBaseObject, mod._ValueChildObject))
	},

	// MESSAGE

	SNPCodeFormNotValid () {
		delete mod._ValueChildObject;

		mod.SNPFormBaseSaveButton.disabled = true;

		SNPCodeFormNotValid();
	},

	SNPCodeFormValid (inputData) {
		mod._ValueChildObject = inputData;

		mod.SNPFormBaseSaveButton.disabled = null;

		SNPCodeFormValid(inputData);
	},

	// REACT

	ReactType (inputData) {
		mod._ValueChildClass = SNPFormBaseLogic.SNPFormBaseChildClass(inputData);
	},

};

$: {
	mod.ReactType(SNPFormBaseObject.SNPDocumentType);
}

import SNPCodeFormNote from './submodules/SNPCodeFormNote/main.svelte';
import SNPCodeFormLink from './submodules/SNPCodeFormLink/main.svelte';
</script>

<div class="SNPFormBase">

{#if mod._ValueChildClass === 'SNPCodeFormNote' }
	<SNPCodeFormNote SNPCodeFormDidFill={ SNPCodeFormDidFill } SNPCodeFormNotValid={ mod.SNPCodeFormNotValid } SNPCodeFormValid={ mod.SNPCodeFormValid } SNPCodeFormObject={ SNPFormBaseObject } />
{/if}

{#if mod._ValueChildClass === 'SNPCodeFormLink' }
	<SNPCodeFormLink SNPCodeFormDidFill={ SNPCodeFormDidFill } SNPCodeFormNotValid={ mod.SNPCodeFormNotValid } SNPCodeFormValid={ mod.SNPCodeFormValid } SNPCodeFormObject={ SNPFormBaseObject } />
{/if}

<button class="SNPFormBaseSaveButton" disabled bind:this={ mod.SNPFormBaseSaveButton } on:click={ mod.InterfaceSaveButtonDidClick }>{ OLSKLocalized('SNPFormBaseSaveButtonText') }</button>

</div>
