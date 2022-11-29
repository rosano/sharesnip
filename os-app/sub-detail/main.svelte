<script>
export let SNPCodeDetailItem;
export let SNPCodeDetailDispatchBack;
export let SNPCodeDetailDispatchUpdate;
export let SNPCodeDetailDispatchClone;
export let SNPCodeDetailDispatchDiscard;
export let _DebugLauncher = false;

export const modPublic = {

	SNPCodeDetailRecipes () {
		return mod.DataCodeDetailRecipes();
	},

};

import { OLSKLocalized } from 'OLSKInternational';
import { OLSK_SPEC_UI } from 'OLSKSpec';

const mod = {

	__HOTFIX_ITEM_IDS: [],

	// DATA

	DataCodeDetailRecipes () {
		const outputData = [];

		if (OLSK_SPEC_UI()) {
			outputData.push({
				LCHRecipeName: 'SNPCodeDetailLauncherFakeItemProxy',
				LCHRecipeCallback: function SNPCodeDetailLauncherFakeItemProxy () {},
			});
		}

		return outputData;
	},

	// MESSAGE

	OLSKTaxonomyDispatchUpdate (inputData) {
		SNPCodeDetailItem.SNPDocumentTags = inputData;

		SNPCodeDetailDispatchUpdate();
	},

	// REACT

	ReactItem (inputData) {
		if (mod.__HOTFIX_ITEM_IDS.includes(inputData)) {
			return;
		}

		mod.__HOTFIX_ITEM_IDS = [];

		setTimeout(function () {
			mod.__HOTFIX_ITEM_IDS = [inputData];
		})
	},

};

$: {
	mod.ReactItem(SNPCodeDetailItem.SNPDocumentID)
}

import OLSKUIAssets from 'OLSKUIAssets';
</script>

<div class="SNPCodeDetail ROCOStandardView">

<header class="SNPCodeDetailToolbar OLSKToolbar OLSKToolbarJustify OLSKMobileViewHeader OLSKCommonEdgeBottom ROCOStandardViewHead">
	<div class="OLSKToolbarElementGroup">
		<button class="SNPCodeDetailToolbarBackButton OLSKDecorButtonNoStyle OLSKDecorTappable OLSKToolbarButton OLSKVisibilityMobile OLSKVisibilityDesktopScreenreader" title={ OLSKLocalized('SNPCodeDetailToolbarBackButtonText') } on:click={ SNPCodeDetailDispatchBack }>
			<div class="SNPCodeDetailToolbarBackButtonImage">{@html OLSKUIAssets._OLSKSharedBack }</div>
		</button>
	</div>

	<div class="OLSKToolbarElementGroup">
		<button class="SNPCodeDetailToolbarCloneButton OLSKDecorButtonNoStyle OLSKDecorTappable OLSKToolbarButton" title={ OLSKLocalized('SNPCodeDetailToolbarCloneButtonText') } on:click={ SNPCodeDetailDispatchClone }>
			<div class="SNPCodeDetailToolbarCloneButtonImage">{@html OLSKUIAssets._OLSKSharedClone }</div>
		</button>

		<button class="SNPCodeDetailToolbarDiscardButton OLSKDecorButtonNoStyle OLSKDecorTappable OLSKToolbarButton" title={ OLSKLocalized('SNPCodeDetailToolbarDiscardButtonText') } on:click={ () => window.confirm(OLSKLocalized('OLSKWordingConfirmText')) && SNPCodeDetailDispatchDiscard() }>
			<div class="SNPCodeDetailToolbarDiscardButtonImage">{@html OLSKUIAssets._OLSKSharedDiscard }</div>
		</button>
	</div>
</header>

<div class="ROCOStandardViewBody">

<div class="SNPCodeDetailForm OLSKDecor OLSKDecorBigForm">

<p>
	<input class="SNPCodeDetailFormNameField" placeholder={ OLSKLocalized('SNPCodeDetailFormNameFieldText') } type="text" bind:value={ SNPCodeDetailItem.SNPDocumentName } on:input={ SNPCodeDetailDispatchUpdate } disabled={ SNPCodeDetailItem.$SNPDocumentIsInbox ? true : null } />
</p>

</div>

</div>
	
</div>

{#if _DebugLauncher && OLSK_SPEC_UI() }
	<button class="OLSKAppToolbarLauncherButton" on:click={ () => window.Launchlet.LCHSingletonCreate({ LCHOptionRecipes: mod.DataCodeDetailRecipes() }) }></button>	
{/if}
