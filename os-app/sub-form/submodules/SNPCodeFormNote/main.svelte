<script>
export let SNPCodeFormValid;
export let SNPCodeFormNotValid;

import { OLSKLocalized } from 'OLSKInternational';

const mod = {

	// INTERFACE

	InterfaceFieldDidFill () {
		const value = this.value.trim()
		value ? SNPCodeFormValid() : SNPCodeFormNotValid();
	},

};
</script>

<div class="SNPCodeFormNote">

<input class="SNPCodeFormNoteField SNPCodeFormDataField" type="text" required placeholder="{ OLSKLocalized('SNPCodeFormNoteFieldText') }" on:input={ mod.InterfaceFieldDidFill }>

</div>
