<script>
export let SNPFormObject = {};
export let SNPFormDidFill;
export let SNPFormNotValid;
export let SNPFormValid;

import { OLSKLocalized } from 'OLSKInternational';
import OLSKFormWifiLogic from './ui-logic.js';

const mod = {

	// VALUE

	_ValueObject: Object.assign({}, SNPFormObject),

	ValueSet (key, value) {
		mod._ValueObject[key] = value;

		const item = OLSKFormWifiLogic.SNPFormWifiDocument(mod._ValueObject);

		SNPFormDidFill(item);
		SNPFormValid(item);
	},

	// INTERFACE

	InterfaceNetworkFieldDidFill () {
		mod.ValueSet('SNPDocumentWifiNetwork', this.value.trim());
	},

	InterfacePasswordFieldDidFill () {
		mod.ValueSet('SNPDocumentWifiPassword', this.value.trim());
	},

};
</script>

<div class="SNPFormWifi">

<p>
	<input class="SNPFormWifiNetworkField SNPFormDataField" type="text" required autofocus placeholder={ OLSKLocalized('SNPFormWifiNetworkFieldText') } on:input={ mod.InterfaceNetworkFieldDidFill } value={ SNPFormObject.SNPDocumentWifiNetwork || ''}>
</p>

<p>
	<input class="SNPFormWifiPasswordField" type="text" placeholder={ OLSKLocalized('SNPFormWifiPasswordFieldText') } on:input={ mod.InterfacePasswordFieldDidFill } value={ SNPFormObject.SNPDocumentWifiPassword || ''}>
</p>

</div>
