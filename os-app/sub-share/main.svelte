<script>
export let SNPCollectShareItems;

import { OLSKLocalized } from 'OLSKInternational';

import SNPCollectLogic from '../open-collect/ui-logic.js';
import OLSKString from 'OLSKString';
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
		mod._ValueLink = window.location.origin + window.OLSKCanonical('SNPCollectRoute') + '/#';
	},

	// REACT

	ReactItems (inputData) {
		mod.ControlUpdateLink(inputData);
	},

	// LIFECYCLE

	LifecycleModuleDidMount () {
		new Clipboard('.SNPCollectShareCopyButton');
	},

};

import { onMount } from 'svelte';
onMount(mod.LifecycleModuleDidMount);

$: {
	mod.ReactItems(SNPCollectShareItems);
}

import Clipboard from 'clipboard';
import SNPCollectListItem from '../sub-item/main.svelte';
</script>

<div class="SNPCollectShare">

<div class="SNPCollectShareList">
</div>

<div class="SNPCollectShareToolbar OLSKToolbar OLSKToolbarJustify OLSKCommonEdgeTop OLSKDecor OLSKDecorFixedHeader">
	<div class="OLSKToolbarElementGroup">
		<input class="SNPCollectShareLinkField" placeholder={ OLSKLocalized('SNPCollectShareLinkFieldText') } type="text" bind:value={ mod._ValueLink } onClick="this.select()" />

		<button class="SNPCollectShareCopyButton" data-clipboard-target=".SNPCollectShareLinkField">{ OLSKLocalized('SNPCollectShareCopyButtonText') }</button>
	</div>
</div>

</div>

<style>
.SNPCollectShare {
	background: var(--OLSKCommonBackground);
	height: 100%;

	display: flex;
	flex-direction: column;
}

.SNPCollectShare :global(.content) {
	margin: unset;
}

.SNPCollectShare :global(.item) {
	background: var(--OLSKCommonBackground);
	border: unset;

	border-bottom: var(--OLSKCommonEdgeBorder);
}

.SNPCollectShare :global(.item svg *) {
	stroke: unset;
}

.SNPCollectShare :global(.item svg > path) {
	fill: var(--OLSKCommonForeground);
}

.SNPCollectShare :global(.item svg > path:first-child) {
	display: none;
}

.SNPCollectShareList {
	padding-bottom: 65px;

	flex-grow: 1;
}

.SNPCollectShareToolbar {
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

.SNPCollectShareLinkField {
	flex-grow: 1;
	max-width: 400px;
	margin-right: 10px;
}
</style>
