<script>
export let SNPFormBaseObject;
export let SNPFormNotValid;
export let SNPFormValid;
export let SNPFormDidFill;
export let SNPFormDidSubmit = null;

export const modPublic = {
};

import { OLSKLocalized } from 'OLSKInternational';

import SNPFormBaseLogic from './ui-logic.js';

const mod = {

	// INTERFACE

	InterfaceSaveButtonDidClick () {
		SNPFormDidSubmit(Object.assign(SNPFormBaseObject, mod._ValueChildObject))
	},

	// MESSAGE

	SNPFormNotValid () {
		delete mod._ValueChildObject;

		mod.SNPFormBaseSaveButton.disabled = true;

		SNPFormNotValid();
	},

	SNPFormValid (inputData) {
		mod._ValueChildObject = inputData;

		mod.SNPFormBaseSaveButton.disabled = null;

		SNPFormValid(inputData);
	},

	// REACT

	ReactType (inputData) {
		mod._ValueChildClass = SNPFormBaseLogic.SNPFormBaseChildClass(inputData);
	},

};

$: {
	mod.ReactType(SNPFormBaseObject.SNPDocumentType);
}

import SNPFormNote from './submodules/SNPFormNote/main.svelte';
import SNPFormLink from './submodules/SNPFormLink/main.svelte';
</script>

<div class="SNPFormBase">

{#if mod._ValueChildClass === 'SNPFormNote' }
	<SNPFormNote SNPFormDidFill={ SNPFormDidFill } SNPFormNotValid={ mod.SNPFormNotValid } SNPFormValid={ mod.SNPFormValid } SNPFormObject={ SNPFormBaseObject } />
{/if}

{#if mod._ValueChildClass === 'SNPFormLink' }
	<SNPFormLink SNPFormDidFill={ SNPFormDidFill } SNPFormNotValid={ mod.SNPFormNotValid } SNPFormValid={ mod.SNPFormValid } SNPFormObject={ SNPFormBaseObject } />
{/if}

{#if SNPFormDidSubmit }
	
<button class="SNPFormBaseSaveButton" disabled bind:this={ mod.SNPFormBaseSaveButton } on:click={ mod.InterfaceSaveButtonDidClick }>{ OLSKLocalized('SNPFormBaseSaveButtonText') }</button>

{/if}

</div>
