<script>
export let SNPPlayDetailItem;
export let SNPPlayDetailDispatchBack;
export let SNPPlayDetailDispatchArchive;
export let SNPPlayDetailDispatchUnarchive;
export let SNPPlayDetailDispatchFetch;
export let SNPPlayDetailDispatchUpdate;
export let SNPPlayDetailDispatchDiscard;
export let SNPPlayDetailDispatchQueue;
export let OLSKTaxonomySuggestionItems = [];
export let _DebugLauncher = false;

export const modPublic = {

	SNPPlayDetailRecipes () {
		return mod.DataPlayDetailRecipes();
	},

};

import { OLSKLocalized } from 'OLSKInternational';
import { OLSK_SPEC_UI } from 'OLSKSpec';

const mod = {

	__HOTFIX_ITEM_IDS: [],

	// DATA

	DataPlayDetailRecipes () {
		const outputData = [];

		if (!SNPPlayDetailItem.$SNPDocumentIsInbox && !SNPPlayDetailItem.SNPDocumentArchiveDate) {
			outputData.push({
				LCHRecipeSignature: 'SNPPlayDetailLauncherItemArchive',
				LCHRecipeName: OLSKLocalized('SNPPlayDetailToolbarArchiveButtonText'),
				LCHRecipeCallback: function SNPPlayDetailLauncherItemArchive () {
					SNPPlayDetailDispatchArchive()
				},
			})
		}

		if (!SNPPlayDetailItem.$SNPDocumentIsInbox && SNPPlayDetailItem.SNPDocumentArchiveDate) {
			outputData.push({
				LCHRecipeSignature: 'SNPPlayDetailLauncherItemUnarchive',
				LCHRecipeName: OLSKLocalized('SNPPlayDetailToolbarUnarchiveButtonText'),
				LCHRecipeCallback: function SNPPlayDetailLauncherItemUnarchive () {
					SNPPlayDetailDispatchUnarchive()
				},
			})
		}

		if (OLSK_SPEC_UI()) {
			outputData.push({
				LCHRecipeName: 'SNPPlayDetailLauncherFakeItemProxy',
				LCHRecipeCallback: function SNPPlayDetailLauncherFakeItemProxy () {},
			});
		}

		return outputData;
	},

	// MESSAGE

	OLSKTaxonomyDispatchUpdate (inputData) {
		SNPPlayDetailItem.SNPDocumentTags = inputData;

		SNPPlayDetailDispatchUpdate();
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
	mod.ReactItem(SNPPlayDetailItem.SNPDocumentID)
}

import OLSKUIAssets from 'OLSKUIAssets';
import OLSKTaxonomy from 'OLSKTaxonomy';
import { fade } from 'svelte/transition';
</script>

<div class="SNPPlayDetail ROCOStandardView">

<header class="SNPPlayDetailToolbar OLSKToolbar OLSKToolbarJustify OLSKMobileViewHeader OLSKCommonEdgeBottom ROCOStandardViewHead">
	<div class="OLSKToolbarElementGroup">
		<button class="SNPPlayDetailToolbarBackButton OLSKDecorButtonNoStyle OLSKDecorTappable OLSKToolbarButton OLSKVisibilityMobile OLSKVisibilityDesktopScreenreader" title={ OLSKLocalized('SNPPlayDetailToolbarBackButtonText') } on:click={ SNPPlayDetailDispatchBack }>
			<div class="SNPPlayDetailToolbarBackButtonImage">{@html OLSKUIAssets._OLSKSharedBack }</div>
		</button>
	</div>

	{#if SNPPlayDetailItem.$SNPDocumentIsInbox }

	<div class="OLSKToolbarElementGroup">
		<button class="SNPPlayDetailToolbarQueueButton OLSKDecorButtonNoStyle OLSKDecorTappable OLSKToolbarButton" title={ OLSKLocalized('SNPPlayDetailToolbarQueueButtonText') } on:click={ SNPPlayDetailDispatchQueue }>
			<div class="SNPPlayDetailToolbarQueueButtonImage">{@html OLSKUIAssets._OLSKSharedClone }</div>
		</button>
	</div>

	{/if}

	{#if !SNPPlayDetailItem.$SNPDocumentIsInbox }

	<div class="OLSKToolbarElementGroup">
		{#if !SNPPlayDetailItem.SNPDocumentArchiveDate }
			<button class="SNPPlayDetailToolbarArchiveButton OLSKDecorButtonNoStyle OLSKDecorTappable OLSKToolbarButton" title={ OLSKLocalized('SNPPlayDetailToolbarArchiveButtonText') } on:click={ SNPPlayDetailDispatchArchive }>
				<div class="SNPPlayDetailToolbarArchiveButtonImage">{@html OLSKUIAssets._OLSKSharedArchive }</div>
			</button>
		{/if}

		{#if SNPPlayDetailItem.SNPDocumentArchiveDate }
			<button class="SNPPlayDetailToolbarUnarchiveButton OLSKDecorButtonNoStyle OLSKDecorTappable OLSKToolbarButton" title={ OLSKLocalized('SNPPlayDetailToolbarUnarchiveButtonText') } on:click={ SNPPlayDetailDispatchUnarchive }>
				<div class="SNPPlayDetailToolbarUnarchiveButtonImage">{@html OLSKUIAssets._OLSKSharedUnarchive }</div>
			</button>
		{/if}

		<button class="SNPPlayDetailToolbarDiscardButton OLSKDecorButtonNoStyle OLSKDecorTappable OLSKToolbarButton" title={ OLSKLocalized('SNPPlayDetailToolbarDiscardButtonText') } on:click={ () => window.confirm(OLSKLocalized('OLSKWordingConfirmText')) && SNPPlayDetailDispatchDiscard() }>
			<div class="SNPPlayDetailToolbarDiscardButtonImage">{@html OLSKUIAssets._OLSKSharedDiscard }</div>
		</button>
	</div>
	
	{/if}
</header>

<div class="ROCOStandardViewBody">

{#if SNPPlayDetailItem.SNPDocumentURL }

{#if SNPPlayDetailItem.SNPDocumentEmbedURL }
	{#key SNPPlayDetailItem.SNPDocumentEmbedURL}
		<div in:fade="{{ delay: OLSK_SPEC_UI() ? 0 : 250, duration: OLSK_SPEC_UI() ? 0 : 300 }}">
			<iframe class="SNPPlayDetailMediaPlayer" width="100%" height="280" src={ SNPPlayDetailItem.SNPDocumentEmbedURL } frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
		</div>
	{/key}
{/if}

<div class="SNPPlayDetailMedia OLSKDecor OLSKDecorBigForm">

	<p class="SNPPlayDetailLink">
		<input class="SNPPlayDetailMediaURLField" placeholder={ OLSKLocalized('SNPPlayDetailMediaURLFieldText') } type="text" disabled bind:value={ SNPPlayDetailItem.SNPDocumentURL } />

		<a class="SNPPlayDetailMediaOpenButton OLSKDecorPress" href={ SNPPlayDetailItem.SNPDocumentURL } target="_blank">{ OLSKLocalized('SNPPlayDetailMediaOpenButtonText') }</a>

		{#if !SNPPlayDetailItem.$SNPDocumentIsInbox }
			<button class="SNPPlayDetailMediaFetchButton" on:click={ SNPPlayDetailDispatchFetch }>{ OLSKLocalized('SNPPlayDetailMediaFetchButtonText') }</button>
		{/if}
	</p>

	<hr role="presentation" />

</div>
{/if}

<div class="SNPPlayDetailForm OLSKDecor OLSKDecorBigForm">

<p>
	<input class="SNPPlayDetailFormNameField" placeholder={ OLSKLocalized('SNPPlayDetailFormNameFieldText') } type="text" bind:value={ SNPPlayDetailItem.SNPDocumentName } on:input={ SNPPlayDetailDispatchUpdate } disabled={ SNPPlayDetailItem.$SNPDocumentIsInbox ? true : null } />
</p>

<p>
	<textarea class="SNPPlayDetailFormNotesField" placeholder="{ OLSKLocalized('SNPPlayDetailFormNotesFieldText') }" bind:value={ SNPPlayDetailItem.SNPDocumentNotes } on:input={ SNPPlayDetailDispatchUpdate } disabled={ SNPPlayDetailItem.$SNPDocumentIsInbox ? true : null }></textarea>
</p>

{#if !SNPPlayDetailItem.$SNPDocumentIsInbox }
<hr role="presentation" />

<p>
	{#each mod.__HOTFIX_ITEM_IDS as item }
		<OLSKTaxonomy
			OLSKTaxonomyItems={ SNPPlayDetailItem.SNPDocumentTags || [] }
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
	<button class="OLSKAppToolbarLauncherButton" on:click={ () => window.Launchlet.LCHSingletonCreate({ LCHOptionRecipes: mod.DataPlayDetailRecipes() }) }></button>	
{/if}

<style>
.SNPPlayDetailLink {
	display: flex;
	width: 90%;

	align-items: center;
}

.SNPPlayDetailLink *:not(.SNPPlayDetailMediaURLField) {
	margin-left: 10px;
}
</style>