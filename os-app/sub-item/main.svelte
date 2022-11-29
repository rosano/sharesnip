<script>
export let SNPPlayListItemObject;

import OLSKString from 'OLSKString';
import SNPPlayListItemLogic from './ui-logic.js';
</script>

<div class="SNPPlayListItem OLSKCommonCard" class:SNPPlayListItemArchived={ SNPPlayListItemObject.SNPDocumentArchiveDate }>

{#if SNPPlayListItemObject.SNPDocumentImageURL }
	<img class="SNPPlayListItemImage" src={ SNPPlayListItemObject.SNPDocumentImageURL } role="presentation" />
{/if}

<section>
	<span class="SNPPlayListItemTitle">{ OLSKString.OLSKStringSnippet(SNPPlayListItemObject.SNPDocumentName || SNPPlayListItemLogic.SNPPlayListItemHumanURL(SNPPlayListItemObject.SNPDocumentURL || '')) }</span>

	<span class="SNPPlayListItemSnippet">{ OLSKString.OLSKStringSnippet(SNPPlayListItemObject.SNPDocumentNotes) }</span>

	<span class="SNPPlayListItemTags">{ (SNPPlayListItemObject.SNPDocumentTags || []).join(', ') }</span>
</section>

</div>

<style>
.SNPPlayListItem {
	min-height: 46px;
	padding: 10px;

	color: var(--OLSKCommonForeground);
}

.SNPPlayListItemArchived {
	border-left: 10px solid var(--OLSKCommonForeground);
	opacity: 0.8;
}

.SNPPlayListItemTitle {
	font-weight: bold;
}

.SNPPlayListItemSnippet {
	display: block;
	
	margin-top: 5px;

	opacity: 0.5;
}

.SNPPlayListItemTags {
	opacity: 0.4;
}
</style>
