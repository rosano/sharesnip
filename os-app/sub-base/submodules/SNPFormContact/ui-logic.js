import vCardsJS from 'vcards-js';

const mod = {

	SNPFormContactDocument (inputData) {
		if (typeof inputData !== 'object' || inputData === null) {
			throw new Error('SNPErrorInputNotValid');
		}

		return Object.assign(inputData, {
			SNPDocumentData: Object.assign(vCardsJS(), Object.fromEntries(Object.entries(inputData).map(function ([key, value]) {
				return [{
					SNPDocumentContactFirstName: 'firstName',
					SNPDocumentContactLastName: 'lastName',
					SNPDocumentContactPhone: 'cellPhone',
					SNPDocumentContactEmail: 'email',
					SNPDocumentContactSite: 'url',
					SNPDocumentContactOrganization: 'organization',
				}[key], value];
			}))).getFormattedString(),
		});
	},

};

export default mod;
