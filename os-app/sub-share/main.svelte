<script>
export let SNPPlayShareItems;

import { OLSKLocalized } from 'OLSKInternational';

import SNPPlayLogic from '../open-play/ui-logic.js';
import OLSKString from 'OLSKString';
import OLSKHash from 'OLSKHash';
import OLSKObject from 'OLSKObject';

const mod = {

	// VALUE

	_ValueLink: '',

	// INTERFACE

	InterfaceCopyButtonDidClick () {
		return Launchlet.LCHTasksRun([{
			LCHRecipeCallback () {
				return this.api.LCHCopyToClipboard(Math.random().toString());
			},
			LCHRecipeURLFilter: '*',
		  LCHRecipeIsAutomatic: true,
		}]);
	},

	// CONTROL

	ControlUpdateLink (inputData) {
		mod._ValueLink = window.location.origin + window.OLSKCanonical('SNPCodeRoute') + '/#' + OLSKHash.OLSKHashString({
			[SNPPlayLogic.SNPPlayInboxAnchor()]: OLSKString.OLSKStringEncode(JSON.stringify(inputData.map(function (e) {
				return OLSKObject.OLSKObjectRemap(e, SNPPlayLogic.SNPPlayRemap(e));
			}))),
		});
	},

	// REACT

	ReactItems (inputData) {
		mod.ControlUpdateLink(inputData);
	},

	// LIFECYCLE

	LifecycleModuleDidMount () {
		new Clipboard('.SNPPlayShareCopyButton');
	},

};

import { onMount } from 'svelte';
onMount(mod.LifecycleModuleDidMount);

$: {
	mod.ReactItems(SNPPlayShareItems);
}

import Clipboard from 'clipboard';
import DragDrop from "svelte-dragdroplist";
import SNPPlayListItem from '../sub-item/main.svelte';
</script>

<div class="SNPPlayShare">

<div class="SNPPlayShareList">
	<DragDrop bind:data={ SNPPlayShareItems } objectKey={ 'SNPDocumentID' }>
		<div class="OLSKDecorTappable" slot="customView" let:item>
			<SNPPlayListItem SNPPlayListItemObject={ item } />
		</div>
	</DragDrop>
</div>

<div class="SNPPlayShareToolbar OLSKToolbar OLSKToolbarJustify OLSKCommonEdgeTop OLSKDecor OLSKDecorFixedHeader">
	<div class="OLSKToolbarElementGroup">
		<input class="SNPPlayShareLinkField" placeholder={ OLSKLocalized('SNPPlayShareLinkFieldText') } type="text" bind:value={ mod._ValueLink } onClick="this.select()" />

		<button class="SNPPlayShareCopyButton" data-clipboard-target=".SNPPlayShareLinkField">{ OLSKLocalized('SNPPlayShareCopyButtonText') }</button>
	</div>
</div>

</div>

<style>
.SNPPlayShare {
	background: var(--OLSKCommonBackground);
	height: 100%;

	display: flex;
	flex-direction: column;
}

.SNPPlayShare :global(.content) {
	margin: unset;
}

.SNPPlayShare :global(.item) {
	background: var(--OLSKCommonBackground);
	border: unset;

	border-bottom: var(--OLSKCommonEdgeBorder);
}

.SNPPlayShare :global(.item svg *) {
	stroke: unset;
}

.SNPPlayShare :global(.item svg > path) {
	fill: var(--OLSKCommonForeground);
}

.SNPPlayShare :global(.item svg > path:first-child) {
	display: none;
}

.SNPPlayShareList {
	padding-bottom: 65px;

	flex-grow: 1;
}

.SNPPlayShareToolbar {
	width: calc(100vw - 15px);
	top: unset;
	bottom: 0;
	background: var(--OLSKCommonBackground);
	z-index: 50;
	display: flex;
}

.OLSKToolbarElementGroup {
	flex-grow: 1;
	display: flex;
	justify-content: center;
}

.SNPPlayShareLinkField {
	flex-grow: 1;
	max-width: 400px;
	margin-right: 10px;
}
</style>
