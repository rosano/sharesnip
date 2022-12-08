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

	InterfaceLinkButtonDidClick () {
		mod.CommandSetType(SNPDocument.SNPDocumentTypeLink());
	},

	InterfaceTextButtonDidClick () {
		mod.CommandSetType(SNPDocument.SNPDocumentTypeNote());
	},

	InterfacePhoneButtonDidClick () {
		mod.CommandSetType(SNPDocument.SNPDocumentTypePhone());
	},

	InterfaceEmailButtonDidClick () {
		mod.CommandSetType(SNPDocument.SNPDocumentTypeEmail());
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

			SNPFormNotValid && SNPFormNotValid();
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
		mod.CommandSetType(SNPDocument.SNPDocumentTypeLink());
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
import OLSKUIAssets from 'OLSKUIAssets';
</script>

<div class="SNPMake OLSKDecor">

<div class="SNPMakeTypes">
		
<button class="SNPMakeScanButton OLSKDecorButtonNoStyle OLSKDecorTappable" class:SNPMakeButtonActive={ mod._ValueScan } on:click={ mod.InterfaceScanButtonDidClick }>{ OLSKLocalized('SNPMakeScanButtonText') }</button>

<button class="SNPMakeTypesLinkButton OLSKDecorButtonNoStyle OLSKDecorTappable" class:SNPMakeButtonActive={ !mod._ValueScan && mod._ValueType === SNPDocument.SNPDocumentTypeLink() } on:click={ mod.InterfaceLinkButtonDidClick }>{ OLSKLocalized('SNPMakeTypesLinkButtonText') }</button>

<button class="SNPMakeTypesNoteButton OLSKDecorButtonNoStyle OLSKDecorTappable" class:SNPMakeButtonActive={ !mod._ValueScan && mod._ValueType === SNPDocument.SNPDocumentTypeNote() } on:click={ mod.InterfaceTextButtonDidClick }>{ OLSKLocalized('SNPMakeTypesNoteButtonText') }</button>

<button class="SNPMakeTypesPhoneButton OLSKDecorButtonNoStyle OLSKDecorTappable" class:SNPMakeButtonActive={ !mod._ValueScan && mod._ValueType === SNPDocument.SNPDocumentTypePhone() } on:click={ mod.InterfacePhoneButtonDidClick }>{ OLSKLocalized('SNPMakeTypesPhoneButtonText') }</button>

<button class="SNPMakeTypesEmailButton OLSKDecorButtonNoStyle OLSKDecorTappable" class:SNPMakeButtonActive={ !mod._ValueScan && mod._ValueType === SNPDocument.SNPDocumentTypeEmail() } on:click={ mod.InterfaceEmailButtonDidClick }>{ OLSKLocalized('SNPMakeTypesEmailButtonText') }</button>

<button class="SNPMakeTypesWifiButton OLSKDecorButtonNoStyle OLSKDecorTappable" class:SNPMakeButtonActive={ !mod._ValueScan && mod._ValueType === SNPDocument.SNPDocumentTypeWifi() } on:click={ mod.InterfaceWifiButtonDidClick }>Wi-Fi</button>

</div>

{#if mod._ValueScan }

<SNPScan SNPScanDidSucceed={ mod.SNPScanDidSucceed } />
	
{/if}

{#if !mod._ValueScan }

<SNPFormBase SNPFormBaseObject={ mod._ValueStateMap[mod._ValueType].SNPMakeStateDocument } SNPFormNotValid={ mod.SNPFormNotValid } SNPFormValid={ mod.SNPFormValid } SNPFormDidFill={ mod.SNPFormDidFill } SNPFormDidSubmit={ SNPFormDidSubmit } SNPFormBaseSaveButtonDisabled={ mod.SNPFormBaseSaveButtonDisabled } />
	
{/if}

{#if !mod._ValueStateMap[mod._ValueType].SNPMakeStateValid }

<div class="SNPMakeDataNotValid">{@html OLSKUIAssets._OLSKSharedIconPlaceholder }</div>
	
{/if}

{#if mod._ValueStateMap[mod._ValueType].SNPMakeStateValid }

<SNPCode SNPCodeObject={ mod._ValueStateMap[mod._ValueType].SNPMakeStateDocument } />
	
{/if}

</div>

<style>
.SNPMake {
	width: 100%;
}

.SNPMakeTypes button {
	opacity: 90%;
	text-decoration: underline;
}

.SNPMakeButtonActive {
	font-weight: bold;
	text-decoration: none !important;
}

.SNPMakeTypes {
	margin-bottom: 10px;
}
</style>
