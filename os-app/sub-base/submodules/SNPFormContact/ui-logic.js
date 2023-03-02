import vCardsJS from 'vcards-js';

const mod = {

	SNPFormContactDocument (inputData) {
		if (typeof inputData !== 'object' || inputData === null) {
			throw new Error('SNPErrorInputNotValid');
		}

		return Object.assign(inputData, {
			SNPDocumentData: Object.assign(vCardsJS(), {
				firstName: inputData.SNPDocumentContactFirstName,
				lastName: inputData.SNPDocumentContactLastName,
				cellPhone: inputData.SNPDocumentContactPhone,
				email: inputData.SNPDocumentContactEmail,
				url: inputData.SNPDocumentContactSite,
				organization: inputData.SNPDocumentContactOrganization,
			}).getFormattedString(),
		});
	},

};

export default mod;
