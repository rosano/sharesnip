<script>
export let SNPCollectDetailItem;
export let SNPCollectDetailDispatchBack;
export let SNPCollectDetailDispatchUpdate;
export let SNPCollectDetailDispatchClone;
export let SNPCollectDetailDispatchDiscard;
export let _DebugLauncher = false;

export const modPublic = {

	SNPCollectDetailRecipes () {
		return mod.DataCollectDetailRecipes();
	},

};

import { OLSKLocalized } from 'OLSKInternational';
import { OLSK_SPEC_UI } from 'OLSKSpec';
import kjua from 'kjua';

const mod = {

	__HOTFIX_ITEM_IDS: [],

	// DATA

	DataCollectDetailRecipes () {
		const outputData = [];

		if (OLSK_SPEC_UI()) {
			outputData.push({
				LCHRecipeName: 'SNPCollectDetailLauncherFakeItemProxy',
				LCHRecipeCallback: function SNPCollectDetailLauncherFakeItemProxy () {},
			});
		}

		return outputData;
	},

	// REACT

	ReactItem (inputData) {
		mod.ReactCode();

		if (mod.__HOTFIX_ITEM_IDS.includes(inputData)) {
			return;
		}

		mod.__HOTFIX_ITEM_IDS = [];

		setTimeout(function () {
			mod.__HOTFIX_ITEM_IDS = [inputData];
		})
	},

	ReactCode () {
		if (OLSK_SPEC_UI()) {
			return;
		}

		if (!mod._SNPCollectDetailQR) {
			return;
		}

		mod._SNPCollectDetailQR.childNodes.forEach(function (e) {
			mod._SNPCollectDetailQR.removeChild(e);
		});

		mod._SNPCollectDetailQR.appendChild(kjua({
			render: 'canvas',
			ecLevel: 'H',
			size: 420,
			rounded: 100,
			quiet: 0,
			fill: 'rgb(255, 128, 0)',
			back: '#FFF9E5',
			text: SNPCollectDetailItem.SNPDocumentData,
		}));
	},

};

$: {
	mod.ReactItem(SNPCollectDetailItem.SNPDocumentID)
}

import OLSKUIAssets from 'OLSKUIAssets';
</script>

<div class="SNPCollectDetail ROCOStandardView">

<header class="SNPCollectDetailToolbar OLSKToolbar OLSKToolbarJustify OLSKMobileViewHeader OLSKCommonEdgeBottom ROCOStandardViewHead">
	<div class="OLSKToolbarElementGroup">
		<button class="SNPCollectDetailToolbarBackButton OLSKDecorButtonNoStyle OLSKDecorTappable OLSKToolbarButton OLSKVisibilityMobile OLSKVisibilityDesktopScreenreader" title={ OLSKLocalized('SNPCollectDetailToolbarBackButtonText') } on:click={ SNPCollectDetailDispatchBack }>
			<div class="SNPCollectDetailToolbarBackButtonImage">{@html OLSKUIAssets._OLSKSharedBack }</div>
		</button>
	</div>

	<div class="OLSKToolbarElementGroup">
		<button class="SNPCollectDetailToolbarCloneButton OLSKDecorButtonNoStyle OLSKDecorTappable OLSKToolbarButton" title={ OLSKLocalized('SNPCollectDetailToolbarCloneButtonText') } on:click={ SNPCollectDetailDispatchClone }>
			<div class="SNPCollectDetailToolbarCloneButtonImage">{@html OLSKUIAssets._OLSKSharedClone }</div>
		</button>

		<button class="SNPCollectDetailToolbarDiscardButton OLSKDecorButtonNoStyle OLSKDecorTappable OLSKToolbarButton" title={ OLSKLocalized('SNPCollectDetailToolbarDiscardButtonText') } on:click={ () => window.confirm(OLSKLocalized('OLSKWordingConfirmText')) && SNPCollectDetailDispatchDiscard() }>
			<div class="SNPCollectDetailToolbarDiscardButtonImage">{@html OLSKUIAssets._OLSKSharedDiscard }</div>
		</button>
	</div>
</header>

<div class="ROCOStandardViewBody">

<div class="SNPCollectDetailForm OLSKDecor OLSKDecorBigForm">

<p>
	<input class="SNPCollectDetailFormNameField" placeholder={ OLSKLocalized('SNPCollectDetailFormNameFieldText') } type="text" bind:value={ SNPCollectDetailItem.SNPDocumentName } on:input={ SNPCollectDetailDispatchUpdate } disabled={ SNPCollectDetailItem.$SNPDocumentIsInbox ? true : null } />
</p>

<div class="SNPCollectDetailQR" bind:this={ mod._SNPCollectDetailQR }></div>

</div>

</div>
	
</div>

{#if _DebugLauncher && OLSK_SPEC_UI() }
	<button class="OLSKAppToolbarLauncherButton" on:click={ () => window.Launchlet.LCHSingletonCreate({ LCHOptionRecipes: mod.DataCollectDetailRecipes() }) }></button>	
{/if}

<style type="text/css">
@media (max-width: 450px) {
	.SNPCollectDetailQR {
		width: 100%;
	}

	.SNPCollectDetailQR :global(*) {
		height: unset !important;
		width: 100% !important;
	}
}
</style>
