<script>
export let SNPFormBaseObject;
export let SNPCollectFormNotValid;
export let SNPCollectFormValid;
export let SNPCollectFormDidFill;
export let SNPCollectFormDidSubmit;

export const modPublic = {
};

import { OLSKLocalized } from 'OLSKInternational';

import SNPFormBaseLogic from './ui-logic.js';

const mod = {

	// INTERFACE

	InterfaceSaveButtonDidClick () {
		SNPCollectFormDidSubmit(Object.assign(SNPFormBaseObject, mod._ValueChildObject))
	},

	// MESSAGE

	SNPCollectFormNotValid () {
		delete mod._ValueChildObject;

		mod.SNPFormBaseSaveButton.disabled = true;

		SNPCollectFormNotValid();
	},

	SNPCollectFormValid (inputData) {
		mod._ValueChildObject = inputData;

		mod.SNPFormBaseSaveButton.disabled = null;

		SNPCollectFormValid(inputData);
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
	<SNPFormNote SNPCollectFormDidFill={ SNPCollectFormDidFill } SNPCollectFormNotValid={ mod.SNPCollectFormNotValid } SNPCollectFormValid={ mod.SNPCollectFormValid } SNPCollectFormObject={ SNPFormBaseObject } />
{/if}

{#if mod._ValueChildClass === 'SNPFormLink' }
	<SNPFormLink SNPCollectFormDidFill={ SNPCollectFormDidFill } SNPCollectFormNotValid={ mod.SNPCollectFormNotValid } SNPCollectFormValid={ mod.SNPCollectFormValid } SNPCollectFormObject={ SNPFormBaseObject } />
{/if}

<button class="SNPFormBaseSaveButton" disabled bind:this={ mod.SNPFormBaseSaveButton } on:click={ mod.InterfaceSaveButtonDidClick }>{ OLSKLocalized('SNPFormBaseSaveButtonText') }</button>

</div>
