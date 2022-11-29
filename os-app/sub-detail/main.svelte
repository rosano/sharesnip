<script>
export let SNPCodeDetailItem;
export let SNPCodeDetailDispatchBack;
export let SNPCodeDetailDispatchArchive;
export let SNPCodeDetailDispatchUnarchive;
export let SNPCodeDetailDispatchFetch;
export let SNPCodeDetailDispatchUpdate;
export let SNPCodeDetailDispatchDiscard;
export let SNPCodeDetailDispatchQueue;
export let OLSKTaxonomySuggestionItems = [];
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

		if (!SNPCodeDetailItem.$SNPDocumentIsInbox && !SNPCodeDetailItem.SNPDocumentArchiveDate) {
			outputData.push({
				LCHRecipeSignature: 'SNPCodeDetailLauncherItemArchive',
				LCHRecipeName: OLSKLocalized('SNPCodeDetailToolbarArchiveButtonText'),
				LCHRecipeCallback: function SNPCodeDetailLauncherItemArchive () {
					SNPCodeDetailDispatchArchive()
				},
			})
		}

		if (!SNPCodeDetailItem.$SNPDocumentIsInbox && SNPCodeDetailItem.SNPDocumentArchiveDate) {
			outputData.push({
				LCHRecipeSignature: 'SNPCodeDetailLauncherItemUnarchive',
				LCHRecipeName: OLSKLocalized('SNPCodeDetailToolbarUnarchiveButtonText'),
				LCHRecipeCallback: function SNPCodeDetailLauncherItemUnarchive () {
					SNPCodeDetailDispatchUnarchive()
				},
			})
		}

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
import OLSKTaxonomy from 'OLSKTaxonomy';
import { fade } from 'svelte/transition';
</script>

<div class="SNPCodeDetail ROCOStandardView">

<header class="SNPCodeDetailToolbar OLSKToolbar OLSKToolbarJustify OLSKMobileViewHeader OLSKCommonEdgeBottom ROCOStandardViewHead">
	<div class="OLSKToolbarElementGroup">
		<button class="SNPCodeDetailToolbarBackButton OLSKDecorButtonNoStyle OLSKDecorTappable OLSKToolbarButton OLSKVisibilityMobile OLSKVisibilityDesktopScreenreader" title={ OLSKLocalized('SNPCodeDetailToolbarBackButtonText') } on:click={ SNPCodeDetailDispatchBack }>
			<div class="SNPCodeDetailToolbarBackButtonImage">{@html OLSKUIAssets._OLSKSharedBack }</div>
		</button>
	</div>

	{#if SNPCodeDetailItem.$SNPDocumentIsInbox }

	<div class="OLSKToolbarElementGroup">
		<button class="SNPCodeDetailToolbarQueueButton OLSKDecorButtonNoStyle OLSKDecorTappable OLSKToolbarButton" title={ OLSKLocalized('SNPCodeDetailToolbarQueueButtonText') } on:click={ SNPCodeDetailDispatchQueue }>
			<div class="SNPCodeDetailToolbarQueueButtonImage">{@html OLSKUIAssets._OLSKSharedClone }</div>
		</button>
	</div>

	{/if}

	{#if !SNPCodeDetailItem.$SNPDocumentIsInbox }

	<div class="OLSKToolbarElementGroup">
		{#if !SNPCodeDetailItem.SNPDocumentArchiveDate }
			<button class="SNPCodeDetailToolbarArchiveButton OLSKDecorButtonNoStyle OLSKDecorTappable OLSKToolbarButton" title={ OLSKLocalized('SNPCodeDetailToolbarArchiveButtonText') } on:click={ SNPCodeDetailDispatchArchive }>
				<div class="SNPCodeDetailToolbarArchiveButtonImage">{@html OLSKUIAssets._OLSKSharedArchive }</div>
			</button>
		{/if}

		{#if SNPCodeDetailItem.SNPDocumentArchiveDate }
			<button class="SNPCodeDetailToolbarUnarchiveButton OLSKDecorButtonNoStyle OLSKDecorTappable OLSKToolbarButton" title={ OLSKLocalized('SNPCodeDetailToolbarUnarchiveButtonText') } on:click={ SNPCodeDetailDispatchUnarchive }>
				<div class="SNPCodeDetailToolbarUnarchiveButtonImage">{@html OLSKUIAssets._OLSKSharedUnarchive }</div>
			</button>
		{/if}

		<button class="SNPCodeDetailToolbarDiscardButton OLSKDecorButtonNoStyle OLSKDecorTappable OLSKToolbarButton" title={ OLSKLocalized('SNPCodeDetailToolbarDiscardButtonText') } on:click={ () => window.confirm(OLSKLocalized('OLSKWordingConfirmText')) && SNPCodeDetailDispatchDiscard() }>
			<div class="SNPCodeDetailToolbarDiscardButtonImage">{@html OLSKUIAssets._OLSKSharedDiscard }</div>
		</button>
	</div>
	
	{/if}
</header>

<div class="ROCOStandardViewBody">

{#if SNPCodeDetailItem.SNPDocumentURL }

{#if SNPCodeDetailItem.SNPDocumentEmbedURL }
	{#key SNPCodeDetailItem.SNPDocumentEmbedURL}
		<div in:fade="{{ delay: OLSK_SPEC_UI() ? 0 : 250, duration: OLSK_SPEC_UI() ? 0 : 300 }}">
			<iframe class="SNPCodeDetailMediaPlayer" width="100%" height="280" src={ SNPCodeDetailItem.SNPDocumentEmbedURL } frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
		</div>
	{/key}
{/if}

<div class="SNPCodeDetailMedia OLSKDecor OLSKDecorBigForm">

	<p class="SNPCodeDetailLink">
		<input class="SNPCodeDetailMediaURLField" placeholder={ OLSKLocalized('SNPCodeDetailMediaURLFieldText') } type="text" disabled bind:value={ SNPCodeDetailItem.SNPDocumentURL } />

		<a class="SNPCodeDetailMediaOpenButton OLSKDecorPress" href={ SNPCodeDetailItem.SNPDocumentURL } target="_blank">{ OLSKLocalized('SNPCodeDetailMediaOpenButtonText') }</a>

		{#if !SNPCodeDetailItem.$SNPDocumentIsInbox }
			<button class="SNPCodeDetailMediaFetchButton" on:click={ SNPCodeDetailDispatchFetch }>{ OLSKLocalized('SNPCodeDetailMediaFetchButtonText') }</button>
		{/if}
	</p>

	<hr role="presentation" />

</div>
{/if}

<div class="SNPCodeDetailForm OLSKDecor OLSKDecorBigForm">

<p>
	<input class="SNPCodeDetailFormNameField" placeholder={ OLSKLocalized('SNPCodeDetailFormNameFieldText') } type="text" bind:value={ SNPCodeDetailItem.SNPDocumentName } on:input={ SNPCodeDetailDispatchUpdate } disabled={ SNPCodeDetailItem.$SNPDocumentIsInbox ? true : null } />
</p>

<p>
	<textarea class="SNPCodeDetailFormNotesField" placeholder="{ OLSKLocalized('SNPCodeDetailFormNotesFieldText') }" bind:value={ SNPCodeDetailItem.SNPDocumentNotes } on:input={ SNPCodeDetailDispatchUpdate } disabled={ SNPCodeDetailItem.$SNPDocumentIsInbox ? true : null }></textarea>
</p>

{#if !SNPCodeDetailItem.$SNPDocumentIsInbox }
<hr role="presentation" />

<p>
	{#each mod.__HOTFIX_ITEM_IDS as item }
		<OLSKTaxonomy
			OLSKTaxonomyItems={ SNPCodeDetailItem.SNPDocumentTags || [] }
			OLSKTaxonomySuggestionItems={ OLSKTaxonomySuggestionItems }
			OLSKTaxonomyDispatchUpdate={ mod.OLSKTaxonomyDispatchUpdate }
			/>
	{/each}
</p>
{/if}

</div>

</div>
	
</div>

{#if _DebugLauncher && OLSK_SPEC_UI() }
	<button class="OLSKAppToolbarLauncherButton" on:click={ () => window.Launchlet.LCHSingletonCreate({ LCHOptionRecipes: mod.DataCodeDetailRecipes() }) }></button>	
{/if}

<style>
.SNPCodeDetailLink {
	display: flex;
	width: 90%;

	align-items: center;
}

.SNPCodeDetailLink *:not(.SNPCodeDetailMediaURLField) {
	margin-left: 10px;
}
</style>