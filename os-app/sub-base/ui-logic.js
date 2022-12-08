import SNPDocument from '../_shared/SNPDocument/main.js';

const mod = {

	SNPFormBaseChildClass (inputData) {
		if (!SNPDocument.SNPDocumentTypes().includes(inputData)) {
			throw new Error('SNPErrorInputNotValid');
		}

		return {
			[SNPDocument.SNPDocumentTypeNote()]: 'SNPFormNote',
			[SNPDocument.SNPDocumentTypeLink()]: 'SNPFormLink',
			[SNPDocument.SNPDocumentTypeEmail()]: 'SNPFormEmail',
			[SNPDocument.SNPDocumentTypePhone()]: 'SNPFormPhone',
			[SNPDocument.SNPDocumentTypeWifi()]: 'SNPFormWifi',
		}[inputData];
	},

};

export default mod;
