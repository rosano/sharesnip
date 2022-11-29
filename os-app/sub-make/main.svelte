<script>
export let SNPCodeMakeObject;
export let SNPCodeFormDidSubmit;

import { OLSKLocalized } from 'OLSKInternational';

import SNPDocument from '../_shared/SNPDocument/main.js';

const mod = {

	// INTERFACE

	InterfaceTextButtonDidClick () {
		SNPCodeMakeObject.SNPDocumentType = SNPDocument.SNPDocumentTypeNote();
	},

	InterfaceLinkButtonDidClick () {
	},

	InterfaceChangeButtonDidClick () {
		SNPCodeMakeObject.SNPDocumentType = null;
	},

};

import SNPCodeFormBase from '../sub-form/main.svelte';
</script>

<div class="SNPCodeMake">

<h1 class="SNPCodeMakeHeading">{ OLSKLocalized('SNPCodeMakeHeadingText') }</h1>

{#if !SNPCodeMakeObject.SNPDocumentType }
<div class="SNPCodeMakeTypes">
		
<button class="SNPCodeMakeTypesNoteButton" on:click={ mod.InterfaceTextButtonDidClick }>{ OLSKLocalized('SNPCodeMakeTypesNoteButtonText') }</button>

<button class="SNPCodeMakeTypesLinkButton" on:click={ mod.InterfaceLinkButtonDidClick }>{ OLSKLocalized('SNPCodeMakeTypesLinkButtonText') }</button>

</div>
{/if}

{#if SNPCodeMakeObject.SNPDocumentType }
	
<button class="SNPCodeMakeChangeButton" on:click={ mod.InterfaceChangeButtonDidClick }>{ OLSKLocalized('SNPCodeMakeChangeButtonText') }</button>

<SNPCodeFormBase SNPCodeFormBaseObject={ SNPCodeMakeObject } SNPCodeFormDidSubmit={ SNPCodeFormDidSubmit } />

{/if}

</div>
