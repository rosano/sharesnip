import SNPDocument from '../_shared/SNPDocument/main.js';
import OLSKLink from 'OLSKLink';

const mod = {

	SNPScanDocument (SNPDocumentData) {
		if (typeof SNPDocumentData !== 'string') {
			throw new Error('SNPErrorInputNotValid');
		}

		return {
			SNPDocumentData,
			SNPDocumentType: (function(inputData) {
				if (OLSKLink.OLSKLinkValid(inputData)) {
					return SNPDocument.SNPDocumentTypeLink();
				}
				
				return SNPDocument.SNPDocumentTypeNote();
			})(SNPDocumentData),
		};
	},

};

export default mod;
