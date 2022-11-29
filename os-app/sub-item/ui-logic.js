import OLSKString from 'OLSKString';

const mod = {

	SNPPlayListItemHumanURL (inputData) {
		if (typeof inputData !== 'string') {
			throw new Error('SNPErrorInputNotValid');
		}

		return OLSKString.OLSKStringSnippet(inputData.replace(/https?:\/\/(www\.)?/, ''));
	},

};

export default mod;
