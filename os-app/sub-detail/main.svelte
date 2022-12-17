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

const mod = {

	__HOTFIX_ITEM_IDS: [],

	// DATA

	DataCollectDetailRecipes () {
		const outputData = [{
			LCHRecipeSignature: 'SNPDetailLauncherItemDebug',
			LCHRecipeName: OLSKLocalized('OLSKWordingDebugObjectText'),
			LCHRecipeCallback: function SNPDetailLauncherItemDebug () {
				const url = 'https://inspektor.5apps.com/inspect?path=' + encodeURIComponent('sharesnip/snp_documents/') + SNPCollectDetailItem.SNPDocumentID;

				if (OLSK_SPEC_UI()) {
					window.FakeWindowOpen = url;
					return;
				}

				window.open(url);
			},
		}];

		if (OLSK_SPEC_UI()) {
			outputData.push({
				LCHRecipeName: 'SNPCollectDetailLauncherFakeItemProxy',
				LCHRecipeCallback: function SNPCollectDetailLauncherFakeItemProxy () {},
			});
		}

		return outputData;
	},

	// INTERFACE

	InterfaceEditButtonDidClick () {
		mod._SNPFormBaseModal.modPublic.OLSKModalViewShow();
	},

	// MESSAGE

	SNPFormNotValid () {},

	SNPFormValid () {},

	SNPFormDidFill () {},

	SNPFormDidSubmit (inputData) {
		mod._SNPFormBaseModal.modPublic.OLSKModalViewClose();

		SNPCollectDetailDispatchUpdate(inputData);
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
	mod.ReactItem(SNPCollectDetailItem.SNPDocumentID)
}

import OLSKUIAssets from 'OLSKUIAssets';
import OLSKModalView from 'OLSKModalView';
import SNPFormBase from '../sub-base/main.svelte';
import SNPCode from '../sub-code/main.svelte';
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

<p class="SNPCollectDetailData">
	<input class="SNPCollectDetailDataField" placeholder={ OLSKLocalized('SNPCollectDetailDataFieldText') } type="text" disabled bind:value={ SNPCollectDetailItem.SNPDocumentData } />

	{#if SNPCollectDetailItem.SNPDocumentType === 'TYPE_SITE' }
		<a class="SNPCollectDetailDataOpenButton OLSKDecorPress" href={ SNPCollectDetailItem.SNPDocumentData } target="_blank">{ OLSKLocalized('SNPCollectDetailDataOpenButtonText') }</a>
	{/if}
</p>

<SNPCode SNPCodeObject={ SNPCollectDetailItem } />

<p>
	<button class="SNPCollectDetailEditButton" on:click={ mod.InterfaceEditButtonDidClick }>{ OLSKLocalized('OLSKWordingEditText') }</button>
</p>

</div>

</div>
	
</div>

<OLSKModalView OLSKModalViewTitleText={ OLSKLocalized('OLSKWordingEditText') } OLSKModalViewCloseText={ OLSKLocalized('OLSKWordingCancelText') } bind:this={ mod._SNPFormBaseModal }>
	<SNPFormBase SNPFormBaseObject={ SNPCollectDetailItem } SNPFormNotValid={ mod.SNPFormNotValid } SNPFormValid={ mod.SNPFormValid } SNPFormDidFill={ mod.SNPFormDidFill } SNPFormDidSubmit={ mod.SNPFormDidSubmit } />
</OLSKModalView>

{#if _DebugLauncher && OLSK_SPEC_UI() }
	<button class="OLSKAppToolbarLauncherButton" on:click={ () => window.Launchlet.LCHSingletonCreate({ LCHOptionRecipes: mod.DataCollectDetailRecipes() }) }></button>	
{/if}
