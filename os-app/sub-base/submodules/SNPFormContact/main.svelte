<script>
export let SNPFormObject = {};
export let SNPFormDidFill;
export let SNPFormNotValid;
export let SNPFormValid;

import { OLSKLocalized } from 'OLSKInternational';
import SNPFormContactLogic from './ui-logic.js';
import SNPDocument from '../../../_shared/SNPDocument/main.js';

const mod = {

	// VALUE

	_ValueObject: Object.assign({}, SNPFormObject),

	ValueSet (key, value) {
		mod._ValueObject[key] = value;
	},

	// INTERFACE

	InterfaceFirstNameFieldDidInput () {
		mod.ValueSet('SNPDocumentContactFirstName', this.value);
		
		mod._MessageInputDidChange();
	},

	InterfaceLastNameFieldDidInput () {
		mod.ValueSet('SNPDocumentContactLastName', this.value);
		
		mod._MessageInputDidChange();
	},

	InterfacePhoneFieldDidInput () {
		mod.ValueSet('SNPDocumentContactPhone', this.value);
		
		mod._MessageInputDidChange();
	},

	InterfaceEmailFieldDidInput () {
		mod.ValueSet('SNPDocumentContactEmail', this.value);
		
		mod._MessageInputDidChange();
	},

	InterfaceSiteFieldDidInput () {
		mod.ValueSet('SNPDocumentContactSite', this.value);
		
		mod._MessageInputDidChange();
	},

	InterfaceOrganizationFieldDidInput () {
		mod.ValueSet('SNPDocumentContactOrganization', this.value);
		
		mod._MessageInputDidChange();
	},

	// MESSAGE

	_MessageInputDidChange () {
		const item = SNPFormContactLogic.SNPFormContactDocument(mod._ValueObject);

		SNPFormDidFill(item);

		SNPDocument.SNPDocumentValidateContact(item.SNPDocumentData) ? SNPFormValid(item) : SNPFormNotValid();
	},

};
</script>

<div class="SNPFormContact">

<p>
	<input class="SNPFormContactFirstNameField SNPFormDataField" type="text" autofocus placeholder={ OLSKLocalized('SNPFormContactFirstNameFieldText') } on:input={ mod.InterfaceFirstNameFieldDidInput } value={ mod._ValueObject.SNPDocumentContactFirstName || '' }>
</p>

<p>
	<input class="SNPFormContactLastNameField" type="text" placeholder={ OLSKLocalized('SNPFormContactLastNameFieldText') } on:input={ mod.InterfaceLastNameFieldDidInput } value={ mod._ValueObject.SNPDocumentContactLastName || '' }>
</p>

<p>
	<input class="SNPFormContactPhoneField" type="tel" placeholder={ OLSKLocalized('SNPFormContactPhoneFieldText') } on:input={ mod.InterfacePhoneFieldDidInput } value={ mod._ValueObject.SNPDocumentContactPhone || '' }>
</p>

<p>
	<input class="SNPFormContactEmailField" type="email" placeholder={ OLSKLocalized('SNPFormContactEmailFieldText') } on:input={ mod.InterfaceEmailFieldDidInput } value={ mod._ValueObject.SNPDocumentContactEmail || '' }>
</p>

<p>
	<input class="SNPFormContactSiteField" type="url" placeholder={ OLSKLocalized('SNPFormContactSiteFieldText') } on:input={ mod.InterfaceSiteFieldDidInput } value={ mod._ValueObject.SNPDocumentContactSite || '' }>
</p>

<p>
	<input class="SNPFormContactOrganizationField" type="text" placeholder={ OLSKLocalized('SNPFormContactOrganizationFieldText') } on:input={ mod.InterfaceOrganizationFieldDidInput } value={ mod._ValueObject.SNPDocumentContactOrganization || '' }>
</p>

</div>
