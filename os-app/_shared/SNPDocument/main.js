import { factory } from 'ulid';
const uniqueID = factory();
import OLSKRemoteStorage from 'OLSKRemoteStorage';
import OLSKWash from 'OLSKWash';

const mod = {

	SNPDocumentErrors (inputData, options = {}) {
		if (typeof inputData !== 'object' || inputData === null) {
			throw new Error('SNPErrorInputNotValid');
		}

		const errors = {};

		if (typeof inputData.SNPDocumentID !== 'string') {
			errors.SNPDocumentID = [
				'SNPErrorNotString',
			];
		} else if (!inputData.SNPDocumentID.trim()) {
			errors.SNPDocumentID = [
				'SNPErrorNotFilled',
			];
		}

		if (!(inputData.SNPDocumentCreationDate instanceof Date) || Number.isNaN(inputData.SNPDocumentCreationDate.getTime())) {
			errors.SNPDocumentCreationDate = [
				'SNPErrorNotDate',
			];
		}

		if (!(inputData.SNPDocumentModificationDate instanceof Date) || Number.isNaN(inputData.SNPDocumentModificationDate.getTime())) {
			errors.SNPDocumentModificationDate = [
				'SNPErrorNotDate',
			];
		}

		if (typeof inputData.SNPDocumentNotes !== 'string') {
			errors.SNPDocumentNotes = [
				'SNPErrorNotString',
			];
		}

		if (typeof inputData.SNPDocumentURL !== 'undefined') {
			if (typeof inputData.SNPDocumentURL !== 'string') {
				errors.SNPDocumentURL = [
					'SNPErrorNotString',
				];
			}
		}

		if (typeof inputData.SNPDocumentName !== 'undefined') {
			if (typeof inputData.SNPDocumentName !== 'string') {
				errors.SNPDocumentName = [
					'SNPErrorNotString',
				];
			}
		}

		if (typeof inputData.SNPDocumentEmbedURL !== 'undefined') {
			if (typeof inputData.SNPDocumentEmbedURL !== 'string') {
				errors.SNPDocumentEmbedURL = [
					'SNPErrorNotString',
				];
			}
		}

		if (typeof inputData.SNPDocumentImageURL !== 'undefined') {
			if (typeof inputData.SNPDocumentImageURL !== 'string') {
				errors.SNPDocumentImageURL = [
					'SNPErrorNotString',
				];
			}
		}

		if (typeof inputData.SNPDocumentDidFetch !== 'undefined') {
			if (typeof inputData.SNPDocumentDidFetch !== 'boolean') {
				errors.SNPDocumentDidFetch = [
					'SNPErrorNotBoolean',
				];
			}
		}

		if (typeof inputData.SNPDocumentArchiveDate !== 'undefined') {
			if (!(inputData.SNPDocumentArchiveDate instanceof Date) || Number.isNaN(inputData.SNPDocumentArchiveDate.getTime())) {
				errors.SNPDocumentArchiveDate = [
					'SNPErrorNotDate',
				];
			}
		}

		if (inputData.SNPDocumentTags !== undefined) {
			if (!Array.isArray(inputData.SNPDocumentTags)) {
				errors.SNPDocumentTags = [
					'SNPErrorNotArray',
				];
			}
		}

		return Object.entries(errors).length ? errors : null;
	},
	
	SNPDocumentDirectory () {
		return 'snp_documents';
	},

	SNPDocumentObjectPath (inputData) {
		return `${ mod.SNPDocumentDirectory() }/${ inputData.SNPDocumentID }`;
	},

	SNPDocumentStub (inputData) {
		return {
			SNPDocumentID: inputData.split('/').pop(),
		};
	},

	_SNPDocumentProcess (inputData) {
		if (typeof inputData !== 'object' || inputData === null) {
			throw new Error('SNPErrorInputNotValid');
		}

		['SNPDocumentURL', 'SNPDocumentEmbedURL'].forEach(function (e) {
			if (!inputData[e]) {
				return;
			}

			Object.assign(inputData, {
				[e]: OLSKWash.OLSKWash(inputData[e]),
			});
		});

		if ((inputData.SNPDocumentEmbedURL || '').match('vimeo')) {
			Object.assign(inputData, {
				SNPDocumentEmbedURL: inputData.SNPDocumentEmbedURL.replace('autoplay=1', 'autoplay=0'),
			});
		}

		if ((inputData.SNPDocumentEmbedURL || '').match('youtube.com')) {
			Object.assign(inputData, {
				SNPDocumentEmbedURL: inputData.SNPDocumentEmbedURL.replace('youtube.com', 'youtube-nocookie.com'),
			});
		}

		if ((inputData.SNPDocumentTags || []).length) {
			Object.assign(inputData, {
				SNPDocumentTags: inputData.SNPDocumentTags.filter(function (e, i, coll) {
					return !!(e || '').trim() && coll.indexOf(e) === i;
				}),
			});
		}

		delete inputData.__SNPDocumentProcessTest;

		return inputData;
	},

};

export default Object.assign(mod, {
	ZDRSchemaKey: 'SNPDocument',
	ZDRSchemaDispatchValidate: mod.SNPDocumentErrors,
	ZDRSchemaPath: mod.SNPDocumentObjectPath,
	ZDRSchemaStub: mod.SNPDocumentStub,
	ZDRSchemaMethods: {
		
		SNPDocumentCreate (inputData) {
			if (typeof inputData !== 'object' || inputData === null) {
				throw new Error('SNPErrorInputNotValid');
			}

			const SNPDocumentCreationDate = new Date();

			return this.App.SNPDocument.ZDRModelWriteObject(mod._SNPDocumentProcess(Object.assign(inputData, Object.assign({
				SNPDocumentID: uniqueID(),
				SNPDocumentCreationDate,
				SNPDocumentModificationDate: SNPDocumentCreationDate,
			}, inputData))));
		},

		SNPDocumentUpdate (inputData) {
			if (typeof inputData !== 'object' || inputData === null) {
				throw new Error('SNPErrorInputNotValid');
			}

			return this.App.SNPDocument.ZDRModelWriteObject(mod._SNPDocumentProcess(Object.assign(inputData, {
				SNPDocumentModificationDate: new Date(),
			})));
		},

		async SNPDocumentList () {
			return Object.values(await this.App.SNPDocument.ZDRModelListObjects()).filter(function (e) {
				return !!e;
			}).map(OLSKRemoteStorage.OLSKRemoteStoragePostJSONParse);;
		},

	},
});
