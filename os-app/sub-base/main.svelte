<script>
export let SNPFormBaseObject;
export let SNPFormNotValid;
export let SNPFormValid;
export let SNPFormDidFill;
export let SNPFormDidSubmit = null;
export let SNPFormBaseSaveButtonDisabled = true;

export const modPublic = {
};

import { OLSKLocalized } from 'OLSKInternational';

import SNPFormBaseLogic from './ui-logic.js';

const mod = {

	SNPFormBaseSaveButtonDisabled: SNPFormBaseSaveButtonDisabled,

	// INTERFACE

	InterfaceSaveButtonDidClick () {
		SNPFormDidSubmit(Object.assign(SNPFormBaseObject, mod._ValueChildObject))
	},

	// MESSAGE

	SNPFormNotValid () {
		delete mod._ValueChildObject;

		mod.SNPFormBaseSaveButtonDisabled = true;

		SNPFormNotValid();
	},

	SNPFormValid (inputData) {
		mod._ValueChildObject = inputData;

		mod.SNPFormBaseSaveButtonDisabled = false;

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

import SNPFormLink from './submodules/SNPFormLink/main.svelte';
import SNPFormNote from './submodules/SNPFormNote/main.svelte';
import SNPFormEmail from './submodules/SNPFormEmail/main.svelte';
import SNPFormPhone from './submodules/SNPFormPhone/main.svelte';
import SNPFormWifi from './submodules/SNPFormWifi/main.svelte';
</script>

<div class="SNPFormBase OLSKDecorBigForm">

{#if mod._ValueChildClass === 'SNPFormLink' }
	<SNPFormLink SNPFormDidFill={ SNPFormDidFill } SNPFormNotValid={ mod.SNPFormNotValid } SNPFormValid={ mod.SNPFormValid } SNPFormObject={ SNPFormBaseObject } />
{/if}

{#if mod._ValueChildClass === 'SNPFormNote' }
	<SNPFormNote SNPFormDidFill={ SNPFormDidFill } SNPFormNotValid={ mod.SNPFormNotValid } SNPFormValid={ mod.SNPFormValid } SNPFormObject={ SNPFormBaseObject } />
{/if}

{#if mod._ValueChildClass === 'SNPFormEmail' }
	<SNPFormEmail SNPFormDidFill={ SNPFormDidFill } SNPFormNotValid={ mod.SNPFormNotValid } SNPFormValid={ mod.SNPFormValid } SNPFormObject={ SNPFormBaseObject } />
{/if}

{#if mod._ValueChildClass === 'SNPFormPhone' }
	<SNPFormPhone SNPFormDidFill={ SNPFormDidFill } SNPFormNotValid={ mod.SNPFormNotValid } SNPFormValid={ mod.SNPFormValid } SNPFormObject={ SNPFormBaseObject } />
{/if}

{#if mod._ValueChildClass === 'SNPFormWifi' }
	<SNPFormWifi SNPFormDidFill={ SNPFormDidFill } SNPFormNotValid={ mod.SNPFormNotValid } SNPFormValid={ mod.SNPFormValid } SNPFormObject={ SNPFormBaseObject } />
{/if}

{#if SNPFormDidSubmit }
<p>
	<button class="SNPFormBaseSaveButton" disabled={ mod.SNPFormBaseSaveButtonDisabled } on:click={ mod.InterfaceSaveButtonDidClick }>{ OLSKLocalized('SNPFormBaseSaveButtonText') }</button>
</p>
{/if}

</div>

<style>
.SNPFormBase {
	padding: 0;
}
</style>
