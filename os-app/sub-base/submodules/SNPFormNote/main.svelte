<script>
export let SNPFormObject = {};
export let SNPFormDidFill;
export let SNPFormNotValid;
export let SNPFormValid;

import { OLSKLocalized } from 'OLSKInternational';

const mod = {

	// INTERFACE

	InterfaceFieldDidFill () {
		const item = {
			SNPDocumentData: this.value.trim(),
		};
		SNPFormDidFill(item);
		item.SNPDocumentData ? SNPFormValid(item) : SNPFormNotValid();
	},

};
</script>

<div class="SNPFormNote">

<p>
	<textarea class="SNPFormNoteField SNPFormDataField" type="text" required autofocus placeholder="{ OLSKLocalized('SNPFormNoteFieldText') }" on:input={ mod.InterfaceFieldDidFill }>{ SNPFormObject.SNPDocumentData || ''}</textarea>
</p>

</div>

<style>
.SNPFormNoteField {
	min-height: 100px !important;
}
</style>
