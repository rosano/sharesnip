<script>
export let SNPCodeMakeObject;
export let SNPCodeFormDidSubmit;

import { OLSKLocalized } from 'OLSKInternational';

import SNPDocument from '../_shared/SNPDocument/main.js';

const mod = {

	// VALUE

	_ValueDocumentsMap: {},

	// DATA

	DataDocumentTemplate (SNPDocumentType) {
		return {
			SNPDocumentType,
			SNPDocumentData: '',
		};
	},

	// INTERFACE

	InterfaceTextButtonDidClick () {
		mod.CommandSetType(SNPDocument.SNPDocumentTypeNote());
	},

	InterfaceLinkButtonDidClick () {
		mod.CommandSetType(SNPDocument.SNPDocumentTypeLink());
	},

	// COMMAND

	CommandSetType (inputData) {
		mod._ValueObject = mod._ValueDocumentsMap[inputData] || mod.DataDocumentTemplate(inputData);
	},

	// MESSAGE

	SNPCodeFormDidFill (inputData) {
		mod._ValueDocumentsMap[mod._ValueObject.SNPDocumentType] = Object.assign(inputData, {
			SNPDocumentType: mod._ValueObject.SNPDocumentType,
		});
	},

	// SETUP

	SetupEverything() {
		mod.CommandSetType(SNPDocument.SNPDocumentTypeLink());
	},

	// LIFECYCLE

	LifecycleModuleDidLoad() {
		mod.SetupEverything();
	},
	
};
	
mod.LifecycleModuleDidLoad();

import SNPCodeFormBase from '../sub-base/main.svelte';
</script>

<div class="SNPCodeMake">

<div class="SNPCodeMakeTypes">
		
<button class="SNPCodeMakeTypesLinkButton" on:click={ mod.InterfaceLinkButtonDidClick }>{ OLSKLocalized('SNPCodeMakeTypesLinkButtonText') }</button>

<button class="SNPCodeMakeTypesNoteButton" on:click={ mod.InterfaceTextButtonDidClick }>{ OLSKLocalized('SNPCodeMakeTypesNoteButtonText') }</button>

</div>

<SNPCodeFormBase SNPCodeFormBaseObject={ mod._ValueObject } SNPCodeFormDidFill={ mod.SNPCodeFormDidFill } SNPCodeFormDidSubmit={ SNPCodeFormDidSubmit } />

</div>
