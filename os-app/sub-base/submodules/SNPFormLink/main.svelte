<script>
export let SNPCollectFormObject = {};
export let SNPCollectFormDidFill;
export let SNPCollectFormNotValid;
export let SNPCollectFormValid;

import OLSKLink from 'OLSKLink';
import { OLSKLocalized } from 'OLSKInternational';

const mod = {

	// INTERFACE

	InterfaceFieldDidFill () {
		const item = {
			SNPDocumentData: this.value.trim(),
		};
		SNPCollectFormDidFill(item);

		OLSKLink.OLSKLinkValid(item.SNPDocumentData) ? SNPCollectFormValid(item) : SNPCollectFormNotValid();
	},

};
</script>

<div class="SNPFormLink">

<input class="SNPFormLinkField SNPCollectFormDataField" type="url" required autofocus placeholder="https://example.com" on:input={ mod.InterfaceFieldDidFill } value={ SNPCollectFormObject.SNPDocumentData || ''}>

</div>
