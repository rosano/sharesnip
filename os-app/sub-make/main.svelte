<script>
export let SNPCodeMakeDispatchNote;
export let SNPCodeMakeDispatchLink;

import { OLSKLocalized } from 'OLSKInternational';

const mod = {

	// INTERFACE

	InterfaceTextButtonDidClick () {
		SNPCodeMakeDispatchNote();
	},

	InterfaceLinkButtonDidClick () {
		SNPCodeMakeDispatchLink();
	},

};
</script>

<div class="SNPCodeMake">

<h1 class="SNPCodeMakeHeading">{ OLSKLocalized('SNPCodeMakeHeadingText') }</h1>
		
<button class="SNPCodeMakeNoteButton" on:click={ mod.InterfaceTextButtonDidClick }>{ OLSKLocalized('SNPCodeMakeNoteButtonText') }</button>

<button class="SNPCodeMakeLinkButton" on:click={ mod.InterfaceLinkButtonDidClick }>{ OLSKLocalized('SNPCodeMakeLinkButtonText') }</button>

</div>
