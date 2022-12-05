import SNPDocument from '../_shared/SNPDocument/main.js';

const mod = {

	SNPScanDocument (SNPDocumentData) {
		if (typeof SNPDocumentData !== 'string') {
			throw new Error('SNPErrorInputNotValid');
		}

		return {
			SNPDocumentData,
			SNPDocumentType: SNPDocument.SNPDocumentTypeNote(),
		};
	},

};

export default mod;
