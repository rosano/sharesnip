<script>
export let SNPCodeFormObject = {};
export let SNPCodeFormDidFill;
export let SNPCodeFormNotValid;
export let SNPCodeFormValid;

import { OLSKLocalized } from 'OLSKInternational';

const mod = {

	// INTERFACE

	InterfaceFieldDidFill () {
		const item = {
			SNPDocumentData: this.value.trim(),
		};
		SNPCodeFormDidFill(item);
		item.SNPDocumentData ? SNPCodeFormValid(item) : SNPCodeFormNotValid();
	},

};
</script>

<div class="SNPFormNote">

<input class="SNPFormNoteField SNPCodeFormDataField" type="text" required autofocus placeholder="{ OLSKLocalized('SNPFormNoteFieldText') }" on:input={ mod.InterfaceFieldDidFill } value={ SNPCodeFormObject.SNPDocumentData || ''}>

</div>
