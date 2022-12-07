import { factory } from 'ulid';
const uniqueID = factory();
import OLSKRemoteStorage from 'OLSKRemoteStorage';
import OLSKLink from 'OLSKLink';

const mod = {

	SNPDocumentTypeLink () {
		return 'TYPE_LINK';
	},

	SNPDocumentTypeNote () {
		return 'TYPE_NOTE';
	},

	SNPDocumentTypePhone () {
		return 'TYPE_PHONE';
	},

	SNPDocumentTypeEmail () {
		return 'TYPE_EMAIL';
	},

	SNPDocumentTypeWifi () {
		return 'TYPE_WIFI';
	},

	SNPDocumentTypeContact () {
		return 'TYPE_CONTACT';
	},

	SNPDocumentTypes () {
		return [
			mod.SNPDocumentTypeLink(),
			mod.SNPDocumentTypeNote(),
			mod.SNPDocumentTypePhone(),
			mod.SNPDocumentTypeEmail(),
			mod.SNPDocumentTypeWifi(),
			mod.SNPDocumentTypeContact(),
		];
	},

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

		if (!mod.SNPDocumentTypes().includes(inputData.SNPDocumentType)) {
			errors.SNPDocumentType = [
				'SNPErrorNotValid',
			];
		}

		if (typeof inputData.SNPDocumentData !== 'string') {
			errors.SNPDocumentData = [
				'SNPErrorNotString',
			];
		} else if (!inputData.SNPDocumentData.trim()) {
			errors.SNPDocumentData = [
				'SNPErrorNotFilled',
			];
		}

		if (typeof inputData.SNPDocumentName !== 'string') {
			errors.SNPDocumentName = [
				'SNPErrorNotString',
			];
		}

		return Object.entries(errors).length ? errors : null;
	},

	SNPDocumentValidatePhone (inputData) {
		if (typeof inputData !== 'string') {
			throw new Error('SNPErrorInputNotValid');
		}

		return !!inputData.match(/^tel:/);
	},

	SNPDocumentValidateEmail (inputData) {
		if (typeof inputData !== 'string') {
			throw new Error('SNPErrorInputNotValid');
		}

		if (!!inputData.match(/^mailto:/)) {
			return true;
		}

		return !!OLSKLink.OLSKEmailValid(inputData);
	},

	SNPDocumentExplodePhone (SNPDocumentData) {
		if (typeof SNPDocumentData !== 'string') {
			throw new Error('SNPErrorInputNotValid');
		}

		return {
			SNPDocumentData,
			SNPDocumentType: mod.SNPDocumentTypePhone(),
			SNPDocumentPhone: SNPDocumentData.split(/^tel:/).filter(function (e) {
				return e.length;
			}).shift(),
		};
	},

	SNPDocumentExplodeEmail (SNPDocumentData) {
		if (typeof SNPDocumentData !== 'string') {
			throw new Error('SNPErrorInputNotValid');
		}

		return {
			SNPDocumentData,
			SNPDocumentType: mod.SNPDocumentTypeEmail(),
			SNPDocumentEmail: SNPDocumentData.split(/^mailto:/).filter(function (e) {
				return e.length;
			}).shift(),
		};
	},

	SNPDocumentValidateLink: OLSKLink.OLSKLinkValid,

	SNPDocumentExplode (SNPDocumentData) {
		if (typeof SNPDocumentData !== 'string') {
			throw new Error('SNPErrorInputNotValid');
		}

		if (mod.SNPDocumentValidatePhone(SNPDocumentData)) {
			return mod.SNPDocumentExplodePhone(SNPDocumentData);
		}

		return {
			SNPDocumentData,
			SNPDocumentType: (function(inputData) {
				if (mod.SNPDocumentValidateLink(inputData)) {
					return mod.SNPDocumentTypeLink();
				}
				
				
				return mod.SNPDocumentTypeNote();
			})(SNPDocumentData),
		};
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
