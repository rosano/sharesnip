<script>
export let SNPPlayListItemObject;
</script>

<div class="SNPPlayListItem">

<span class="SNPPlayListItemTitle">{ SNPPlayListItemObject.SNPDocumentName }</span>

</div>

<style>
.SNPPlayListItem {
	min-height: 46px;
	padding: 10px;

	color: var(--OLSKCommonForeground);
}

.SNPPlayListItemTitle {
	font-weight: bold;
}
</style>
