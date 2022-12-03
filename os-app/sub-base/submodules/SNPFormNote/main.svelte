<script>
export let SNPCollectFormObject = {};
export let SNPCollectFormDidFill;
export let SNPCollectFormNotValid;
export let SNPCollectFormValid;

import { OLSKLocalized } from 'OLSKInternational';

const mod = {

	// INTERFACE

	InterfaceFieldDidFill () {
		const item = {
			SNPDocumentData: this.value.trim(),
		};
		SNPCollectFormDidFill(item);
		item.SNPDocumentData ? SNPCollectFormValid(item) : SNPCollectFormNotValid();
	},

};
</script>

<div class="SNPFormNote">

<input class="SNPFormNoteField SNPCollectFormDataField" type="text" required autofocus placeholder="{ OLSKLocalized('SNPFormNoteFieldText') }" on:input={ mod.InterfaceFieldDidFill } value={ SNPCollectFormObject.SNPDocumentData || ''}>

</div>
