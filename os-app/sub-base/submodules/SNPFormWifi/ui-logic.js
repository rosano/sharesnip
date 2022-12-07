const mod = {

	SNPFormWifiDocument (inputData) {
		if (typeof inputData !== 'object' || inputData === null) {
			throw new Error('SNPErrorInputNotValid');
		}

		if (typeof inputData.SNPDocumentWifiNetwork !== 'string') {
			throw new Error('SNPErrorInputNotValid');
		}

		return Object.assign(inputData, {
			SNPDocumentData: `WIFI:T:${ inputData.SNPDocumentWifiSecurity };S:${ inputData.SNPDocumentWifiNetwork };P:${ inputData.SNPDocumentWifiPassword };H:${ inputData.SNPDocumentWifiHidden };;`,
		});
	},

};

export default mod;
