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

<div class="SNPFormPhone">

<input class="SNPFormPhoneField SNPFormDataField" type="tel" required autofocus placeholder="+1-234-567-890" on:input={ mod.InterfaceFieldDidFill } value={ SNPFormObject.SNPDocumentData || ''}>

</div>
