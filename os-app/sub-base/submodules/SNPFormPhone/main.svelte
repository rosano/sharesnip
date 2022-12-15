<script>
export let SNPFormObject = {};
export let SNPFormDidFill;
export let SNPFormNotValid;
export let SNPFormValid;

import { OLSKLocalized } from 'OLSKInternational';
import SNPFormPhoneLogic from './ui-logic.js';

const mod = {

	// INTERFACE

	InterfaceFieldDidFill () {
		const SNPDocumentPhone = this.value.trim();
		const item = SNPFormPhoneLogic.SNPFormPhoneDocument({
			SNPDocumentPhone,
		});
		SNPFormDidFill(item);

		item.SNPDocumentPhone.length ? SNPFormValid(item) : SNPFormNotValid();
	},

};
</script>

<div class="SNPFormPhone">

<p>
	<input class="SNPFormPhoneField SNPFormDataField" type="tel" required autofocus placeholder="+1-234-567-890" on:input={ mod.InterfaceFieldDidFill } value={ SNPFormObject.SNPDocumentPhone || ''}>
</p>

</div>
