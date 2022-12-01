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

<div class="SNPCodeFormNote">

<input class="SNPCodeFormNoteField SNPCodeFormDataField" type="text" required autofocus placeholder="{ OLSKLocalized('SNPCodeFormNoteFieldText') }" on:input={ mod.InterfaceFieldDidFill } value={ SNPCodeFormObject.SNPDocumentData || ''}>

</div>
