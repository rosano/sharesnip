<script>
export let SNPFormObject = {};
export let SNPFormDidFill;
export let SNPFormNotValid;
export let SNPFormValid;

import { OLSKLocalized } from 'OLSKInternational';
import SNPFormWifiLogic from './ui-logic.js';
import SNPDocument from '../../../_shared/SNPDocument/main.js';

const mod = {

	// VALUE

	_ValueObject: Object.assign({}, SNPFormObject),
	_ValueSecurity: SNPFormObject.SNPDocumentWifiSecurity || 'WPA',

	ValueSet (key, value) {
		mod._ValueObject[key] = value;

		const item = SNPFormWifiLogic.SNPFormWifiDocument(mod._ValueObject);

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

	InterfaceSecurityOptionDidInput () {
		mod.ValueSet('SNPDocumentWifiSecurity', mod._ValueSecurity);
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

<p>
	<label class="SNPFormWifiSecurityWPAOption">
		<input class="SNPFormWifiSecurityWPAOptionField" type="radio" value="WPA" bind:group={ mod._ValueSecurity } on:input={ mod.InterfaceSecurityOptionDidInput } />
		WPA
	</label>
	<label class="SNPFormWifiSecurityWEPOption">
		<input class="SNPFormWifiSecurityWEPOptionField" type="radio" value="WEP" bind:group={ mod._ValueSecurity } on:input={ mod.InterfaceSecurityOptionDidInput } />
		WEP
	</label>
	<label class="SNPFormWifiSecurityNoneOption">
		<input class="SNPFormWifiSecurityNoneOptionField" type="radio" value="nopass" bind:group={ mod._ValueSecurity } on:input={ mod.InterfaceSecurityOptionDidInput } />
		{ OLSKLocalized('SNPFormWifiSecurityNoneOptionText') }
	</label>
</p>

</div>
