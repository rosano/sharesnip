const mod = {

	SNPFormPhoneDocument (inputData) {
		if (typeof inputData !== 'object' || inputData === null) {
			throw new Error('SNPErrorInputNotValid');
		}

		if (typeof inputData.SNPDocumentPhone !== 'string') {
			throw new Error('SNPErrorInputNotValid');
		}

		return Object.assign(inputData, {
			SNPDocumentData: uDataPhone(inputData.SNPDocumentPhone),
		});
	},

};

export default mod;
