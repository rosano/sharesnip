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
		SNPCodeMakeObject.SNPDocumentType = SNPDocument.SNPDocumentTypeLink();
	},

};

import SNPCodeFormBase from '../sub-base/main.svelte';
</script>

<div class="SNPCodeMake">

<div class="SNPCodeMakeTypes">
		
<button class="SNPCodeMakeTypesNoteButton" on:click={ mod.InterfaceTextButtonDidClick }>{ OLSKLocalized('SNPCodeMakeTypesNoteButtonText') }</button>

<button class="SNPCodeMakeTypesLinkButton" on:click={ mod.InterfaceLinkButtonDidClick }>{ OLSKLocalized('SNPCodeMakeTypesLinkButtonText') }</button>

</div>

<SNPCodeFormBase SNPCodeFormBaseObject={ SNPCodeMakeObject } SNPCodeFormDidSubmit={ SNPCodeFormDidSubmit } />

</div>
