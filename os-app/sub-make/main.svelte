<script>
import { OLSKLocalized } from 'OLSKInternational';

import SNPDocument from '../_shared/SNPDocument/main.js';

const mod = {

	// VALUE
	
	_ValueObject: {},

	// INTERFACE

	InterfaceTextButtonDidClick () {
		mod._ValueObject.SNPDocumentType = SNPDocument.SNPDocumentTypeNote();
		// SNPCodeMakeDispatchNote();
	},

	InterfaceLinkButtonDidClick () {
		// SNPCodeMakeDispatchLink();
	},

	InterfaceChangeButtonDidClick () {
		mod._ValueObject.SNPDocumentType = null;
	},

};

import SNPCodeFormBase from '../sub-form/main.svelte';
</script>

<div class="SNPCodeMake">

<h1 class="SNPCodeMakeHeading">{ OLSKLocalized('SNPCodeMakeHeadingText') }</h1>

{#if !mod._ValueObject.SNPDocumentType }
<div class="SNPCodeMakeTypes">
		
<button class="SNPCodeMakeTypesNoteButton" on:click={ mod.InterfaceTextButtonDidClick }>{ OLSKLocalized('SNPCodeMakeTypesNoteButtonText') }</button>

<button class="SNPCodeMakeTypesLinkButton" on:click={ mod.InterfaceLinkButtonDidClick }>{ OLSKLocalized('SNPCodeMakeTypesLinkButtonText') }</button>

</div>
{/if}

{#if mod._ValueObject.SNPDocumentType }
	
<button class="SNPCodeMakeChangeButton" on:click={ mod.InterfaceChangeButtonDidClick }>{ OLSKLocalized('SNPCodeMakeChangeButtonText') }</button>

<SNPCodeFormBase SNPCodeFormBaseObject={ mod._ValueObject } />

{/if}

</div>
