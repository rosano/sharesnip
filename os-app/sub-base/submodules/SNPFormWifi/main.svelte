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

	_ValueObject: Object.assign({
		SNPDocumentWifiSecurity: 'WPA',
	}, SNPFormObject),

	ValueSet (key, value) {
		mod._ValueObject[key] = value;
	},

	// INTERFACE

	InterfaceNetworkFieldDidInput () {
		mod.ValueSet('SNPDocumentWifiNetwork', this.value);
		
		mod._MessageInputDidChange();
	},

	InterfacePasswordFieldDidInput () {
		mod.ValueSet('SNPDocumentWifiPassword', this.value);
		
		mod._MessageInputDidChange();
	},

	// MESSAGE

	_MessageInputDidChange () {
		const item = SNPFormWifiLogic.SNPFormWifiDocument(mod._ValueObject);

		SNPFormDidFill(item);

		SNPDocument.SNPDocumentValidateWifi(item.SNPDocumentData) ? SNPFormValid(item) : SNPFormNotValid();
	},

};
</script>

<div class="SNPFormWifi">

<p>
	<input class="SNPFormWifiNetworkField SNPFormDataField" type="text" required autofocus placeholder={ OLSKLocalized('SNPFormWifiNetworkFieldText') } on:input={ mod.InterfaceNetworkFieldDidInput } value={ mod._ValueObject.SNPDocumentWifiNetwork || '' }>
</p>

<p>
	<input class="SNPFormWifiPasswordField" type="text" placeholder={ OLSKLocalized('SNPFormWifiPasswordFieldText') } on:input={ mod.InterfacePasswordFieldDidInput } value={ mod._ValueObject.SNPDocumentWifiPassword || '' }>
</p>

<p>
	<label class="SNPFormWifiSecurityWPAOption">
		<input class="SNPFormWifiSecurityWPAOptionField" type="radio" value="WPA" bind:group={ mod._ValueObject.SNPDocumentWifiSecurity } on:change={ 
			mod._MessageInputDidChange } />
		WPA
	</label>
	<label class="SNPFormWifiSecurityWEPOption">
		<input class="SNPFormWifiSecurityWEPOptionField" type="radio" value="WEP" bind:group={ mod._ValueObject.SNPDocumentWifiSecurity } on:change={ 
			mod._MessageInputDidChange } />
		WEP
	</label>
	<label class="SNPFormWifiSecurityNoneOption">
		<input class="SNPFormWifiSecurityNoneOptionField" type="radio" value="nopass" bind:group={ mod._ValueObject.SNPDocumentWifiSecurity } on:change={ 
			mod._MessageInputDidChange } />
		{ OLSKLocalized('SNPFormWifiSecurityNoneOptionText') }
	</label>
</p>

</div>
