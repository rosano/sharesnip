import SNPDocument from '../_shared/SNPDocument/main.js';

const mod = {

	SNPFormBaseChildClass (inputData) {
		if (!SNPDocument.SNPDocumentTypes().includes(inputData)) {
			throw new Error('SNPErrorInputNotValid');
		}

		return {
			[SNPDocument.SNPDocumentTypeLink()]: 'SNPFormLink',
			[SNPDocument.SNPDocumentTypeNote()]: 'SNPFormNote',
			[SNPDocument.SNPDocumentTypePhone()]: 'SNPFormPhone',
		}[inputData];
	},

};

export default mod;
