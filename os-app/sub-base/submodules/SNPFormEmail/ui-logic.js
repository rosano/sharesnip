const mod = {

	SNPFormEmailDocument (inputData) {
		if (typeof inputData !== 'object' || inputData === null) {
			throw new Error('SNPErrorInputNotValid');
		}

		if (typeof inputData.SNPDocumentEmail !== 'string') {
			throw new Error('SNPErrorInputNotValid');
		}

		return Object.assign(inputData, {
			SNPDocumentData: 'mailto:' + inputData.SNPDocumentEmail,
		});
	},

};

export default mod;
