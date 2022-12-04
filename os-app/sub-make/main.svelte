<script>
export let SNPFormNotValid = null;
export let SNPFormValid = null;
export let SNPFormDidSubmit = null;

import { OLSKLocalized } from 'OLSKInternational';
import { OLSK_SPEC_UI } from 'OLSKSpec';
import kjua from 'kjua';

import SNPDocument from '../_shared/SNPDocument/main.js';

const mod = {

	// VALUE

	_ValueStateMap: {},

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
		mod._ValueType = inputData;

		if (!mod._ValueStateMap[inputData]) {
			mod._ValueStateMap[inputData] = {
				SNPMakeStateDocument: mod.DataDocumentTemplate(inputData),
				SNPMakeStateValid: false,
			};
		}

		setTimeout(function () {
			mod.ReactItem(mod._ValueStateMap[mod._ValueType].SNPMakeStateDocument);
		}, mod._SNPMakeCodeValid ? 0 : 50);
	},

	// MESSAGE

	SNPFormNotValid () {
		mod._ValueStateMap[mod._ValueType].SNPMakeStateValid = false;
		
		SNPFormNotValid && SNPFormNotValid();
	},

	SNPFormValid (inputData) {
		mod._ValueStateMap[mod._ValueType].SNPMakeStateValid = true;

		setTimeout(function () {
			mod.ReactItem(inputData);
		}, mod._SNPMakeCodeValid ? 0 : 50);

		SNPFormValid && SNPFormValid(inputData);
	},

	SNPFormDidFill (inputData) {
		mod._ValueStateMap[mod._ValueType].SNPMakeStateDocument = Object.assign(inputData, {
			SNPDocumentType: mod._ValueType,
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
			quiet: 0,
			// fill: 'rgb(255, 128, 0)',
			// back: '#FFF9E5',
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

<SNPFormBase SNPFormBaseObject={ mod._ValueStateMap[mod._ValueType].SNPMakeStateDocument } SNPFormNotValid={ mod.SNPFormNotValid } SNPFormValid={ mod.SNPFormValid } SNPFormDidFill={ mod.SNPFormDidFill } SNPFormDidSubmit={ SNPFormDidSubmit } />

{#if !mod._ValueStateMap[mod._ValueType].SNPMakeStateValid }

<div class="SNPMakeCodeNotValid">{@html OLSKUIAssets._OLSKSharedIconPlaceholder }</div>
	
{/if}

{#if mod._ValueStateMap[mod._ValueType].SNPMakeStateValid }

<div class="SNPMakeCodeValid" bind:this={ mod._SNPMakeCodeValid }></div>
	
{/if}

</div>
