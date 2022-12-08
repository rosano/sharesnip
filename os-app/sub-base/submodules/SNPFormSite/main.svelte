<script>
export let SNPFormObject = {};
export let SNPFormDidFill;
export let SNPFormNotValid;
export let SNPFormValid;

import OLSKLink from 'OLSKLink';
import { OLSKLocalized } from 'OLSKInternational';

const mod = {

	// INTERFACE

	InterfaceFieldDidFill () {
		const item = {
			SNPDocumentData: this.value.trim(),
		};
		SNPFormDidFill(item);

		OLSKLink.OLSKLinkValid(item.SNPDocumentData) ? SNPFormValid(item) : SNPFormNotValid();
	},

};
</script>

<div class="SNPFormSite">

<p>
	<input class="SNPFormSiteField SNPFormDataField" type="url" required autofocus placeholder="https://example.com" on:input={ mod.InterfaceFieldDidFill } value={ SNPFormObject.SNPDocumentData || ''}>
</p>

</div>
