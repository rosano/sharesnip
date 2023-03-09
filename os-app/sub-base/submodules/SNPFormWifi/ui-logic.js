const mod = {

	SNPFormWifiDocument (inputData) {
		if (typeof inputData !== 'object' || inputData === null) {
			throw new Error('SNPErrorInputNotValid');
		}

		return Object.assign(inputData, {
			SNPDocumentData: `WIFI:T:${ inputData.SNPDocumentWifiSecurity || 'WPA' };S:${ inputData.SNPDocumentWifiNetwork || '' };P:${ inputData.SNPDocumentWifiPassword || '' };H:${ inputData.SNPDocumentWifiHidden ? true : ''  };;`,
		});
	},

};

export default mod;
