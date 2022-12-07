<script>
export let SNPFormObject = {};
export let SNPFormDidFill;
export let SNPFormNotValid;
export let SNPFormValid;

import { OLSKLocalized } from 'OLSKInternational';
import OLSKLink from 'OLSKLink';
import OLSKFormEmailLogic from './ui-logic.js';

const mod = {

	// INTERFACE

	InterfaceFieldDidFill () {
		const SNPDocumentEmail = this.value.trim()
		const item = OLSKFormEmailLogic.SNPFormEmailDocument({
			SNPDocumentEmail,
		});
		SNPFormDidFill(item);

		OLSKLink.OLSKEmailValid(SNPDocumentEmail) ? SNPFormValid(item) : SNPFormNotValid();
	},

};
</script>

<div class="SNPFormEmail">

<p>
	<input class="SNPFormEmailField SNPFormDataField" type="email" required autofocus placeholder="hello@example.com" on:input={ mod.InterfaceFieldDidFill } value={ SNPFormObject.SNPDocumentEmail || ''}>
</p>

</div>
