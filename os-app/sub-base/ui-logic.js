import SNPDocument from '../_shared/SNPDocument/main.js';

const mod = {

	SNPFormBaseChildClass (inputData) {
		if (!SNPDocument.SNPDocumentTypes().includes(inputData)) {
			throw new Error('SNPErrorInputNotValid');
		}

		return {
			[SNPDocument.SNPDocumentTypeLink()]: 'SNPFormLink',
			[SNPDocument.SNPDocumentTypeNote()]: 'SNPFormNote',
			[SNPDocument.SNPDocumentTypeEmail()]: 'SNPFormEmail',
			[SNPDocument.SNPDocumentTypePhone()]: 'SNPFormPhone',
			[SNPDocument.SNPDocumentTypeWifi()]: 'SNPFormWifi',
		}[inputData];
	},

};

export default mod;
