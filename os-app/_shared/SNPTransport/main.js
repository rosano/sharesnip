import OLSKRemoteStorage from 'OLSKRemoteStorage';

export default {
	ZDRSchemaKey: 'SNPTransport',
	ZDRSchemaDispatchValidate: (function () {}),
	ZDRSchemaPath: (function () {}),
	ZDRSchemaStub: (function () {}),
	ZDRSchemaMethods: {

		async SNPTransportImport (inputData) {
			if (typeof inputData !== 'object' || inputData === null) {
				throw new Error('SNPErrorInputNotValid');
			}

			const _this = this;

			return Object.fromEntries(await Promise.all(Object.entries(inputData).map(async function ([key, value]) {
				if (!Array.isArray(value)) {
					throw new Error('SNPErrorInputNotValid');
				}

				return [key, await ({
					SNPDocument: (function () {
						return Promise.all(value.map(function (e) {
							return _this.App.SNPDocument.SNPDocumentCreate(e).catch(function () {
								throw new Error('SNPErrorInputNotValid');
							});
						}));
					}),
					SNPSetting: (function () {
						return Promise.all(value.map(function (e) {
							return _this.App.SNPSetting.ZDRModelWriteObject(e).catch(function () {
								throw new Error('SNPErrorInputNotValid');
							});
						}));
					}),
				}[key]())];
			})));
		},

		SNPTransportExport (inputData) {
			if (typeof inputData !== 'object' || inputData === null) {
				throw new Error('SNPErrorInputNotValid');
			}

			return Object.entries(inputData).reduce(function (coll, [key, value]) {
				if (!Array.isArray(value)) {
					throw new Error('SNPErrorInputNotValid');
				}

				if (!value.length) {
					return coll;
				}
				
				return Object.assign(coll, {
					[key]: value.filter(function (e) {
						return !e.$SNPDocumentIsInbox;
					}).map(OLSKRemoteStorage.OLSKRemoteStorageSafeCopy),
				});
			}, {});
		},

	},
};
