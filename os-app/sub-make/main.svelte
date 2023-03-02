<script>
export let SNPFormNotValid = null;
export let SNPFormValid = null;
export let SNPFormDidSubmit = null;

import { OLSKLocalized } from 'OLSKInternational';

import SNPDocument from '../_shared/SNPDocument/main.js';

const mod = {

	// VALUE

	_ValueStateMap: {},
	_ValueScan: false,
	
	SNPFormBaseSaveButtonDisabled: true,

	// DATA

	DataDocumentTemplate (SNPDocumentType) {
		return {
			SNPDocumentType,
			SNPDocumentData: '',
		};
	},

	// INTERFACE

	InterfaceScanButtonDidClick () {
		mod.CommandSetType('SCAN');

		mod._ValueScan = true;
	},

	InterfaceTextButtonDidClick () {
		mod.CommandSetType(SNPDocument.SNPDocumentTypeNote());
	},

	InterfaceSiteButtonDidClick () {
		mod.CommandSetType(SNPDocument.SNPDocumentTypeSite());
	},

	InterfaceEmailButtonDidClick () {
		mod.CommandSetType(SNPDocument.SNPDocumentTypeEmail());
	},

	InterfacePhoneButtonDidClick () {
		mod.CommandSetType(SNPDocument.SNPDocumentTypePhone());
	},

	InterfaceContactButtonDidClick () {
		mod.CommandSetType(SNPDocument.SNPDocumentTypeContact());
	},

	InterfaceWifiButtonDidClick () {
		mod.CommandSetType(SNPDocument.SNPDocumentTypeWifi());
	},

	// COMMAND

	CommandSetType (inputData) {
		mod._ValueScan = false;

		mod._ValueType = inputData;

		if (!mod._ValueStateMap[inputData]) {
			mod._ValueStateMap[inputData] = {
				SNPMakeStateDocument: mod.DataDocumentTemplate(inputData),
				SNPMakeStateValid: false,
			};
		}

		if (!mod._ValueStateMap[inputData].SNPMakeStateValid) {
			SNPFormNotValid && SNPFormNotValid();
		}

		if (mod._ValueStateMap[inputData].SNPMakeStateValid) {
			SNPFormValid && SNPFormValid();
		}
	},

	// MESSAGE

	SNPFormNotValid () {
		mod._ValueStateMap[mod._ValueType].SNPMakeStateValid = false;
		
		SNPFormNotValid && SNPFormNotValid();
	},

	SNPFormValid (inputData) {
		mod._ValueStateMap[mod._ValueType].SNPMakeStateValid = true;

		SNPFormValid && SNPFormValid(inputData);
	},

	SNPFormDidFill (inputData) {
		mod._ValueStateMap[mod._ValueType].SNPMakeStateDocument = Object.assign(inputData, {
			SNPDocumentType: mod._ValueType,
		});
	},

	SNPScanDidSucceed (SNPMakeStateDocument) {
		mod._ValueStateMap[SNPMakeStateDocument.SNPDocumentType] = {
			SNPMakeStateDocument,
		};

		mod.CommandSetType(SNPMakeStateDocument.SNPDocumentType);
		mod.SNPFormValid(SNPMakeStateDocument);

		mod.SNPFormBaseSaveButtonDisabled = null;
	},

	// SETUP

	SetupEverything() {
		mod.CommandSetType(SNPDocument.SNPDocumentTypeNote());
	},

	// LIFECYCLE

	LifecycleModuleDidLoad() {
		mod.SetupEverything();
	},
	
};
	
mod.LifecycleModuleDidLoad();

import SNPScan from '../sub-scan/main.svelte';
import SNPFormBase from '../sub-base/main.svelte';
import SNPCode from '../sub-code/main.svelte';
</script>

<div class="SNPMake OLSKDecor">

<div class="SNPMakeTypes">
		
<button class="SNPMakeScanButton OLSKDecorButtonNoStyle OLSKDecorTappable" class:SNPMakeButtonActive={ mod._ValueScan } on:click={ mod.InterfaceScanButtonDidClick }>{ OLSKLocalized('SNPMakeScanButtonText') }</button>

<button class="SNPMakeTypesNoteButton OLSKDecorButtonNoStyle OLSKDecorTappable" class:SNPMakeButtonActive={ !mod._ValueScan && mod._ValueType === SNPDocument.SNPDocumentTypeNote() } on:click={ mod.InterfaceTextButtonDidClick }>{ OLSKLocalized('SNPMakeTypesNoteButtonText') }</button>

<button class="SNPMakeTypesSiteButton OLSKDecorButtonNoStyle OLSKDecorTappable" class:SNPMakeButtonActive={ !mod._ValueScan && mod._ValueType === SNPDocument.SNPDocumentTypeSite() } on:click={ mod.InterfaceSiteButtonDidClick }>{ OLSKLocalized('SNPMakeTypesSiteButtonText') }</button>

<button class="SNPMakeTypesEmailButton OLSKDecorButtonNoStyle OLSKDecorTappable" class:SNPMakeButtonActive={ !mod._ValueScan && mod._ValueType === SNPDocument.SNPDocumentTypeEmail() } on:click={ mod.InterfaceEmailButtonDidClick }>{ OLSKLocalized('SNPMakeTypesEmailButtonText') }</button>

<button class="SNPMakeTypesPhoneButton OLSKDecorButtonNoStyle OLSKDecorTappable" class:SNPMakeButtonActive={ !mod._ValueScan && mod._ValueType === SNPDocument.SNPDocumentTypePhone() } on:click={ mod.InterfacePhoneButtonDidClick }>{ OLSKLocalized('SNPMakeTypesPhoneButtonText') }</button>

<button class="SNPMakeTypesContactButton OLSKDecorButtonNoStyle OLSKDecorTappable" class:SNPMakeButtonActive={ !mod._ValueScan && mod._ValueType === SNPDocument.SNPDocumentTypeContact() } on:click={ mod.InterfaceContactButtonDidClick }>{ OLSKLocalized('SNPMakeTypesContactButtonText') }</button>

<button class="SNPMakeTypesWifiButton OLSKDecorButtonNoStyle OLSKDecorTappable" class:SNPMakeButtonActive={ !mod._ValueScan && mod._ValueType === SNPDocument.SNPDocumentTypeWifi() } on:click={ mod.InterfaceWifiButtonDidClick }>Wi-Fi</button>

</div>

{#if mod._ValueScan }

<SNPScan SNPScanDidSucceed={ mod.SNPScanDidSucceed } />
	
{/if}

{#if !mod._ValueScan }

<SNPFormBase SNPFormBaseObject={ mod._ValueStateMap[mod._ValueType].SNPMakeStateDocument } SNPFormNotValid={ mod.SNPFormNotValid } SNPFormValid={ mod.SNPFormValid } SNPFormDidFill={ mod.SNPFormDidFill } SNPFormDidSubmit={ SNPFormDidSubmit } SNPFormBaseSaveButtonDisabled={ mod.SNPFormBaseSaveButtonDisabled } />

	{#if !mod._ValueStateMap[mod._ValueType].SNPMakeStateValid }

	<div class="SNPMakeDataNotValid"></div>
		
	{/if}

	{#if mod._ValueStateMap[mod._ValueType].SNPMakeStateValid }

	<SNPCode SNPCodeObject={ mod._ValueStateMap[mod._ValueType].SNPMakeStateDocument } />
		
	{/if}
	
{/if}

</div>

<style>
.SNPMakeTypes button {
	margin-bottom: 5px;
	
	opacity: 90%;
}

.SNPMakeButtonActive {
	font-weight: bold;
}

.SNPMakeTypes {
	margin-bottom: 10px;
}

.SNPMake :global(.SNPFormBase) {
	padding: 0;
}

.SNPMakeDataNotValid {
	display: block;
	width: 150px;
	height: 150px;
	border: 3px solid black;
	border-style: dotted;
}
</style>
