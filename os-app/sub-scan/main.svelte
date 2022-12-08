<script>
export let SNPScanDidSucceed;
export let DebugFakeReadErrorMessage = '';
export let DebugFakeParseContent = '';
export let DebugFakeParseErrorMessage = '';

import { OLSKLocalized } from 'OLSKInternational';
import { OLSKFormatted } from 'OLSKString';
import { OLSK_SPEC_UI } from 'OLSKSpec';

import SNPDocument from '../_shared/SNPDocument/main.js';

const mod = {

	// VALUE

	_ValueScanning: false,

	// INTERFACE

	InterfaceScanStartButtonDidClick () {
		mod.CommandScanStart();
	},

	InterfaceScanStopButtonDidClick () {
		mod.CommandScanStop();
	},

	InterfaceFileInputDidChange (event) {
		if (event.target.files.length == 0) {
		  return;
		}

		mod.CommandScanFile(event.target.files[0]);
	},

	// COMMAND

	CommandScanStart () {
		mod._ValueScanning = true;

		if (OLSK_SPEC_UI()) {
			return;
		}

		Html5Qrcode.getCameras().then(function (devices) {
		  if (!devices || !devices.length) {
		  	return mod.MessageReadError(OLSKLocalized('SNPGenerateReadErrorNoCamerasText'));
		  }

		  return mod._ValueScanReader.start({
		  	facingMode: 'environment',
		  }, {}, mod.MessageReadDidParse).catch(mod.MessageParseError);
		}).catch(mod.MessageReadError);
	},

	async CommandScanStop () {
		mod._ValueScanning = false;
		
		if (OLSK_SPEC_UI()) {
			return;
		}

		if (mod._ValueScanReader.isScanning) {
			await mod._ValueScanReader.stop()
		}
		mod._ValueScanReader.clear();
	},

	CommandScanFile (imageFile) {
		mod._ValueScanReader.scanFile(imageFile, true).then(mod.MessageReadDidParse).catch(mod.MessageParseError);
	},

	// MESSAGE

	MessageReadError (error) {
		mod._ValueReadError = error.message;
	},

	MessageReadDidParse (decodedText, decodedResult) {
		SNPScanDidSucceed(SNPDocument.SNPDocumentExplode(decodedText));

		if (OLSK_SPEC_UI()) {
			return;
		}

		mod.CommandScanStop();
	},

	MessageParseError (error) {
		mod._ValueParseError = error.message;

		if (OLSK_SPEC_UI()) {
			return;
		}

		mod._ValueScanReader.clear();
	},

	// SETUP

	SetupEverything () {
		if (OLSK_SPEC_UI()) {
			return;
		}

		mod._ValueScanReader = new Html5Qrcode('SNPScanReader');
	},

	// LIFECYCLE

	LifecycleModuleDidLoad() {
		mod.SetupEverything();
	},

};

import { onMount } from 'svelte';
onMount(mod.LifecycleModuleDidLoad);
</script>

<div class="SNPScan">

<div class="SNPScanReader" id="SNPScanReader" style="width: 300px"></div>

{#if !mod._ValueScanning }
	<button class="SNPScanStartButton" on:click={ mod.InterfaceScanStartButtonDidClick }>{ OLSKLocalized('SNPScanStartButtonText') }</button>
	<input class="SNPScanFileInput" type="file" accept="image/*" on:change={ mod.InterfaceFileInputDidChange } />
{/if}

{#if mod._ValueScanning }
	<button class="SNPScanStopButton" on:click={ mod.InterfaceScanStopButtonDidClick }>{ OLSKLocalized('SNPScanStopButtonText') }</button>
{/if}

{#if OLSK_SPEC_UI() }

<button id="TestMessageReadErrorButton" on:click={ () => mod.MessageReadError(new Error(DebugFakeReadErrorMessage || Math.random().toString())) }></button>
<button id="TestMessageReadDidParseButton" on:click={ () => mod.MessageReadDidParse(DebugFakeParseContent || Math.random().toString()) }></button>
<button id="TestMessageParseErrorButton" on:click={ () => mod.MessageParseError(new Error(DebugFakeParseErrorMessage || Math.random().toString())) }></button>
	
{/if}

{#if mod._ValueReadError }

<div class="SNPScanReadError">{ OLSKFormatted(OLSKLocalized('SNPScanReadErrorTextFormat'), mod._ValueReadError) }</div>
	
{/if}

{#if mod._ValueParseError }

<div class="SNPScanParseError">{ OLSKFormatted(OLSKLocalized('SNPScanParseErrorTextFormat'), mod._ValueParseError) }</div>
	
{/if}

</div>
