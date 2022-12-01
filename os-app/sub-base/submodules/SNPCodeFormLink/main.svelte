<script>
export let SNPCodeFormDidFill;
export let SNPCodeFormNotValid;
export let SNPCodeFormValid;

import OLSKLink from 'OLSKLink';
import { OLSKLocalized } from 'OLSKInternational';

const mod = {

	// INTERFACE

	InterfaceFieldDidFill () {
		const item = {
			SNPDocumentData: this.value.trim(),
		};
		SNPCodeFormDidFill(item);

		OLSKLink.OLSKLinkValid(item.SNPDocumentData) ? SNPCodeFormValid(item) : SNPCodeFormNotValid();
	},

};
</script>

<div class="SNPCodeFormLink">

<input class="SNPCodeFormLinkField SNPCodeFormDataField" type="url" required autofocus placeholder="https://example.com" on:input={ mod.InterfaceFieldDidFill }>

</div>
