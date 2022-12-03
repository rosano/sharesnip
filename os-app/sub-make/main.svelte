<script>
export let SNPCodeFormDidSubmit;

import { OLSKLocalized } from 'OLSKInternational';
import { OLSK_SPEC_UI } from 'OLSKSpec';
import kjua from 'kjua';

import SNPDocument from '../_shared/SNPDocument/main.js';

const mod = {

	// VALUE

	_ValueDocumentsMap: {},
	_ValueIsValid: false,

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

	SNPCodeFormNotValid () {
		mod._ValueIsValid = false;
	},

	SNPCodeFormValid (inputData) {
		mod._ValueIsValid = true;

		setTimeout(function () {
			mod.ReactItem(inputData);
		}, mod._SNPCodeMakeCodeValid ? 0 : 50);
	},

	SNPCodeFormDidFill (inputData) {
		mod._ValueDocumentsMap[mod._ValueObject.SNPDocumentType] = Object.assign(inputData, {
			SNPDocumentType: mod._ValueObject.SNPDocumentType,
		});
	},

	// SETUP

	SetupEverything() {
		mod.CommandSetType(SNPDocument.SNPDocumentTypeLink());
	},

	// REACT

	ReactItem (inputData) {
		if (OLSK_SPEC_UI()) {
			return;
		}

		if (!mod._SNPCodeMakeCodeValid) {
			return;
		}

		mod._SNPCodeMakeCodeValid.childNodes.forEach(function (e) {
			mod._SNPCodeMakeCodeValid.removeChild(e);
		});

		mod._SNPCodeMakeCodeValid.appendChild(kjua({
			render: 'canvas',
			ecLevel: 'H',
			size: 100,
			rounded: 100,
			fill: 'rgb(255, 128, 0)',
			back: '#FFF9E5',
			text: inputData.SNPDocumentData,
		}));
	},

	// LIFECYCLE

	LifecycleModuleDidLoad() {
		mod.SetupEverything();
	},
	
};
	
mod.LifecycleModuleDidLoad();

import SNPCodeFormBase from '../sub-base/main.svelte';
import OLSKUIAssets from 'OLSKUIAssets';
</script>

<div class="SNPCodeMake">

<div class="SNPCodeMakeTypes">
		
<button class="SNPCodeMakeTypesLinkButton" on:click={ mod.InterfaceLinkButtonDidClick }>{ OLSKLocalized('SNPCodeMakeTypesLinkButtonText') }</button>

<button class="SNPCodeMakeTypesNoteButton" on:click={ mod.InterfaceTextButtonDidClick }>{ OLSKLocalized('SNPCodeMakeTypesNoteButtonText') }</button>

</div>

<SNPCodeFormBase SNPCodeFormBaseObject={ mod._ValueObject } SNPCodeFormNotValid={ mod.SNPCodeFormNotValid } SNPCodeFormValid={ mod.SNPCodeFormValid } SNPCodeFormDidFill={ mod.SNPCodeFormDidFill } SNPCodeFormDidSubmit={ SNPCodeFormDidSubmit } />

{#if !mod._ValueIsValid }

<div class="SNPCodeMakeCodeNotValid">{@html OLSKUIAssets._OLSKSharedIconPlaceholder }</div>
	
{/if}

{#if mod._ValueIsValid }

<div class="SNPCodeMakeCodeValid" bind:this={ mod._SNPCodeMakeCodeValid }></div>
	
{/if}

</div>
