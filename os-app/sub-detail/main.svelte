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
import kjua from 'kjua';

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

		if (!mod._SNPCodeDetailQR) {
			return;
		}

		mod._SNPCodeDetailQR.childNodes.forEach(function (e) {
			mod._SNPCodeDetailQR.removeChild(e);
		});

		mod._SNPCodeDetailQR.appendChild(kjua({
			render: 'canvas',
			crisp: true,
			ecLevel: 'H',
			size: 420,
			rounded: 100,
			quiet: 1,
			fill: 'rgb(255, 128, 0)',
			back: '#FFF9E5',
			text: SNPCodeDetailItem.SNPDocumentData,
		}));
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

<div class="SNPCodeDetailQR" bind:this={ mod._SNPCodeDetailQR }></div>

</div>

</div>
	
</div>

{#if _DebugLauncher && OLSK_SPEC_UI() }
	<button class="OLSKAppToolbarLauncherButton" on:click={ () => window.Launchlet.LCHSingletonCreate({ LCHOptionRecipes: mod.DataCodeDetailRecipes() }) }></button>	
{/if}

<style type="text/css">
@media (max-width: 450px) {
	.SNPCodeDetailQR {
		width: 100%;
	}

	.SNPCodeDetailQR :global(*) {
		height: unset !important;
		width: 100% !important;
	}
}
</style>
