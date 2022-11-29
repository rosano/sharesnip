const mod = {

	SNPSettingErrors (inputData, options = {}) {
		if (typeof inputData !== 'object' || inputData === null) {
			throw new Error('SNPErrorInputNotValid');
		}

		const errors = {};

		if (typeof inputData.SNPSettingKey !== 'string') {
			errors.SNPSettingKey = [
				'SNPErrorNotString',
			];
		} else if (!inputData.SNPSettingKey.trim()) {
			errors.SNPSettingKey = [
				'SNPErrorNotFilled',
			];
		}

		if (typeof inputData.SNPSettingValue !== 'string') {
			errors.SNPSettingValue = [
				'SNPErrorNotString',
			];
		}

		return Object.entries(errors).length ? errors : null;
	},

	SNPSettingDirectory () {
		return 'snp_settings';
	},

	SNPSettingPath (inputData) {
		return `${ mod.SNPSettingDirectory() }/${ inputData.SNPSettingKey }`;
	},

	SNPSettingStub (inputData) {
		return {
			SNPSettingKey: inputData.split('/').pop(),
		};
	},

};

export default Object.assign(mod, {
	ZDRSchemaKey: 'SNPSetting',
	ZDRSchemaDispatchValidate: mod.SNPSettingErrors,
	ZDRSchemaPath: mod.SNPSettingPath,
	ZDRSchemaStub: mod.SNPSettingStub,
	ZDRSchemaMethods: {
		
		async SNPSettingList () {
			return Object.values(await this.App.SNPSetting.ZDRModelListObjects());
		},

	},
});
