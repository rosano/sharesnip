import SNPDocument from '../_shared/SNPDocument/main.js';

const mod = {

	SNPCodeFormBaseChildClass (inputData) {
		if (!SNPDocument.SNPDocumentTypes().includes(inputData)) {
			throw new Error('SNPErrorInputNotValid');
		}

		return {
			[SNPDocument.SNPDocumentTypeNote()]: 'SNPCodeFormNote',
		}[inputData];
	},

};

export default mod;
