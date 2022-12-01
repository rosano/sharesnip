<script>
export let SNPCodeShareItems;

import { OLSKLocalized } from 'OLSKInternational';

import SNPCodeLogic from '../open-collect/ui-logic.js';
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
		mod._ValueLink = window.location.origin + window.OLSKCanonical('SNPCodeRoute') + '/#';
	},

	// REACT

	ReactItems (inputData) {
		mod.ControlUpdateLink(inputData);
	},

	// LIFECYCLE

	LifecycleModuleDidMount () {
		new Clipboard('.SNPCodeShareCopyButton');
	},

};

import { onMount } from 'svelte';
onMount(mod.LifecycleModuleDidMount);

$: {
	mod.ReactItems(SNPCodeShareItems);
}

import Clipboard from 'clipboard';
import SNPCodeListItem from '../sub-item/main.svelte';
</script>

<div class="SNPCodeShare">

<div class="SNPCodeShareList">
</div>

<div class="SNPCodeShareToolbar OLSKToolbar OLSKToolbarJustify OLSKCommonEdgeTop OLSKDecor OLSKDecorFixedHeader">
	<div class="OLSKToolbarElementGroup">
		<input class="SNPCodeShareLinkField" placeholder={ OLSKLocalized('SNPCodeShareLinkFieldText') } type="text" bind:value={ mod._ValueLink } onClick="this.select()" />

		<button class="SNPCodeShareCopyButton" data-clipboard-target=".SNPCodeShareLinkField">{ OLSKLocalized('SNPCodeShareCopyButtonText') }</button>
	</div>
</div>

</div>

<style>
.SNPCodeShare {
	background: var(--OLSKCommonBackground);
	height: 100%;

	display: flex;
	flex-direction: column;
}

.SNPCodeShare :global(.content) {
	margin: unset;
}

.SNPCodeShare :global(.item) {
	background: var(--OLSKCommonBackground);
	border: unset;

	border-bottom: var(--OLSKCommonEdgeBorder);
}

.SNPCodeShare :global(.item svg *) {
	stroke: unset;
}

.SNPCodeShare :global(.item svg > path) {
	fill: var(--OLSKCommonForeground);
}

.SNPCodeShare :global(.item svg > path:first-child) {
	display: none;
}

.SNPCodeShareList {
	padding-bottom: 65px;

	flex-grow: 1;
}

.SNPCodeShareToolbar {
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

.SNPCodeShareLinkField {
	flex-grow: 1;
	max-width: 400px;
	margin-right: 10px;
}
</style>
