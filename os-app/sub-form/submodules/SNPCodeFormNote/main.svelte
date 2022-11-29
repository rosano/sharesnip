<script>
export let SNPCodeFormValid;
export let SNPCodeFormNotValid;

import { OLSKLocalized } from 'OLSKInternational';

const mod = {

	// INTERFACE

	InterfaceFieldDidFill () {
		const SNPDocumentData = this.value.trim()
		SNPDocumentData ? SNPCodeFormValid({
			SNPDocumentData,
		}) : SNPCodeFormNotValid();
	},

};
</script>

<div class="SNPCodeFormNote">

<input class="SNPCodeFormNoteField SNPCodeFormDataField" type="text" required autofocus placeholder="{ OLSKLocalized('SNPCodeFormNoteFieldText') }" on:input={ mod.InterfaceFieldDidFill }>

</div>
