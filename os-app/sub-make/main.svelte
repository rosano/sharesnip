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
		}, mod._SNPMakeCodeValid ? 0 : 50);
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

		if (!mod._SNPMakeCodeValid) {
			return;
		}

		mod._SNPMakeCodeValid.childNodes.forEach(function (e) {
			mod._SNPMakeCodeValid.removeChild(e);
		});

		mod._SNPMakeCodeValid.appendChild(kjua({
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

import SNPFormBase from '../sub-base/main.svelte';
import OLSKUIAssets from 'OLSKUIAssets';
</script>

<div class="SNPMake">

<div class="SNPMakeTypes">
		
<button class="SNPMakeTypesLinkButton" on:click={ mod.InterfaceLinkButtonDidClick }>{ OLSKLocalized('SNPMakeTypesLinkButtonText') }</button>

<button class="SNPMakeTypesNoteButton" on:click={ mod.InterfaceTextButtonDidClick }>{ OLSKLocalized('SNPMakeTypesNoteButtonText') }</button>

</div>

<SNPFormBase SNPFormBaseObject={ mod._ValueObject } SNPCodeFormNotValid={ mod.SNPCodeFormNotValid } SNPCodeFormValid={ mod.SNPCodeFormValid } SNPCodeFormDidFill={ mod.SNPCodeFormDidFill } SNPCodeFormDidSubmit={ SNPCodeFormDidSubmit } />

{#if !mod._ValueIsValid }

<div class="SNPMakeCodeNotValid">{@html OLSKUIAssets._OLSKSharedIconPlaceholder }</div>
	
{/if}

{#if mod._ValueIsValid }

<div class="SNPMakeCodeValid" bind:this={ mod._SNPMakeCodeValid }></div>
	
{/if}

</div>
