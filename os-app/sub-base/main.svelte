<script>
export let SNPCodeFormBaseObject;
export let SNPCodeFormDidSubmit;

export const modPublic = {
};

import { OLSKLocalized } from 'OLSKInternational';

import SNPCodeFormBaseLogic from './ui-logic.js';

const mod = {

	// INTERFACE

	InterfaceSaveButtonDidClick () {
		SNPCodeFormDidSubmit(Object.assign(SNPCodeFormBaseObject, mod._ValueChildObject))
	},

	// MESSAGE

	SNPCodeFormDidFill () {},

	SNPCodeFormNotValid () {
		delete mod._ValueChildObject;

		mod.SNPCodeFormBaseSaveButton.disabled = true;
	},

	SNPCodeFormValid (inputData) {
		mod._ValueChildObject = inputData;

		mod.SNPCodeFormBaseSaveButton.disabled = null;
	},

	// REACT

	ReactType (inputData) {
		mod._ValueChildClass = SNPCodeFormBaseLogic.SNPCodeFormBaseChildClass(inputData);
	},

};

$: {
	mod.ReactType(SNPCodeFormBaseObject.SNPDocumentType);
}

import SNPCodeFormNote from './submodules/SNPCodeFormNote/main.svelte';
import SNPCodeFormLink from './submodules/SNPCodeFormLink/main.svelte';
</script>

<div class="SNPCodeFormBase">

{#if mod._ValueChildClass === 'SNPCodeFormNote' }
	<SNPCodeFormNote SNPCodeFormDidFill={ mod.SNPCodeFormDidFill } SNPCodeFormNotValid={ mod.SNPCodeFormNotValid } SNPCodeFormValid={ mod.SNPCodeFormValid } />
{/if}

{#if mod._ValueChildClass === 'SNPCodeFormLink' }
	<SNPCodeFormLink SNPCodeFormDidFill={ mod.SNPCodeFormDidFill } SNPCodeFormNotValid={ mod.SNPCodeFormNotValid } SNPCodeFormValid={ mod.SNPCodeFormValid } />
{/if}

<button class="SNPCodeFormBaseSaveButton" disabled bind:this={ mod.SNPCodeFormBaseSaveButton } on:click={ mod.InterfaceSaveButtonDidClick }>{ OLSKLocalized('SNPCodeFormBaseSaveButtonText') }</button>

</div>
