import { factory } from 'ulid';
const uniqueID = factory();
import OLSKRemoteStorage from 'OLSKRemoteStorage';
import OLSKLink from 'OLSKLink';
import ICAL from 'ical.js';

const mod = {

	SNPDocumentTypeNote () {
		return 'TYPE_NOTE';
	},

	SNPDocumentTypeSite () {
		return 'TYPE_SITE';
	},

	SNPDocumentTypeEmail () {
		return 'TYPE_EMAIL';
	},

	SNPDocumentTypePhone () {
		return 'TYPE_PHONE';
	},

	SNPDocumentTypeWifi () {
		return 'TYPE_WIFI';
	},

	SNPDocumentTypeContact () {
		return 'TYPE_CONTACT';
	},

	SNPDocumentTypes () {
		return [
			mod.SNPDocumentTypeNote(),
			mod.SNPDocumentTypeSite(),
			mod.SNPDocumentTypeEmail(),
			mod.SNPDocumentTypePhone(),
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

	SNPDocumentValidateEmail (inputData) {
		if (typeof inputData !== 'string') {
			throw new Error('SNPErrorInputNotValid');
		}

		if (!!inputData.match(/^mailto:/)) {
			return true;
		}

		return !!OLSKLink.OLSKEmailValid(inputData);
	},

	SNPDocumentValidatePhone (inputData) {
		if (typeof inputData !== 'string') {
			throw new Error('SNPErrorInputNotValid');
		}

		return !!inputData.match(/^tel:/);
	},

	SNPDocumentValidateWifi (inputData) {
		if (typeof inputData !== 'string') {
			throw new Error('SNPErrorInputNotValid');
		}

		if (!inputData.match(/^WIFI:/)) {
			return false;
		}

		const item = mod.SNPDocumentExplodeWifi(inputData);

		if (!item.SNPDocumentWifiNetwork.trim().length) {
			return false;
		}

		if (!item.SNPDocumentWifiSecurity.trim().length) {
			return false;
		}

		return true
	},

	SNPDocumentValidateContact (inputData) {
		if (typeof inputData !== 'string') {
			throw new Error('SNPErrorInputNotValid');
		}

		try {
			const result = ICAL.parse(inputData);

			if (result[0] !== 'vcard') {
				return false;
			}

			if (!result[1].filter(function (e) {
				if (!'fn org email tel url'.split(' ').includes(e[0])) {
					return false;
				}

				if (!e.slice(-1).pop()) {
					return false;
				}
				
				return true;
			}, []).length) {
				return false;
			}

			return true;
		} catch {
			return false;
		}

		return false;
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

	SNPDocumentExplodeWifi (SNPDocumentData) {
		if (typeof SNPDocumentData !== 'string') {
			throw new Error('SNPErrorInputNotValid');
		}

		const SNPDocumentWifiSecurity = SNPDocumentData.match(/WIFI:T:(.*);S/).pop();
		const SNPDocumentWifiNetwork = SNPDocumentData.match(/;S:(.*);P/).pop();
		const SNPDocumentWifiPassword = SNPDocumentData.match(/;P:(.*);H/).pop();
		const SNPDocumentWifiHidden = !!(SNPDocumentData.match(/;H:(.*);;/) || []).pop();

		return {
			SNPDocumentData,
			SNPDocumentType: mod.SNPDocumentTypeWifi(),
			SNPDocumentWifiSecurity,
			SNPDocumentWifiNetwork,
			SNPDocumentWifiPassword,
			SNPDocumentWifiHidden,
		};
	},

	SNPDocumentExplodeContact (SNPDocumentData) {
		if (typeof SNPDocumentData !== 'string') {
			throw new Error('SNPErrorInputNotValid');
		}

		const map = {
			org: 'SNPDocumentContactOrganization',
			email: 'SNPDocumentContactEmail',
			tel: 'SNPDocumentContactPhone',
			url: 'SNPDocumentContactSite',
		};

		return ICAL.parse(SNPDocumentData)[1].reduce(function (coll, item) {
			const key = map[item[0]];
			let value = item.pop();

			if (item[0] === 'n') {
				const SNPDocumentContactLastName = value.shift();
				const SNPDocumentContactFirstName = value.shift();

				if (SNPDocumentContactFirstName) {
					Object.assign(coll, {
						SNPDocumentContactFirstName,
					});
				}

				if (SNPDocumentContactLastName) {
					Object.assign(coll, {
						SNPDocumentContactLastName,
					});
				}
			}

			return Object.assign(coll, !key ? {} : {
				[key]: value,
			});
		}, {
			SNPDocumentData,
			SNPDocumentType: mod.SNPDocumentTypeContact(),
		});
	},

	SNPDocumentValidateSite: OLSKLink.OLSKLinkValid,

	SNPDocumentExplode (SNPDocumentData) {
		if (typeof SNPDocumentData !== 'string') {
			throw new Error('SNPErrorInputNotValid');
		}

		if (mod.SNPDocumentValidateEmail(SNPDocumentData)) {
			return mod.SNPDocumentExplodeEmail(SNPDocumentData);
		}

		if (mod.SNPDocumentValidatePhone(SNPDocumentData)) {
			return mod.SNPDocumentExplodePhone(SNPDocumentData);
		}

		if (mod.SNPDocumentValidateWifi(SNPDocumentData)) {
			return mod.SNPDocumentExplodeWifi(SNPDocumentData);
		}

		if (mod.SNPDocumentValidateContact(SNPDocumentData)) {
			return mod.SNPDocumentExplodeContact(SNPDocumentData);
		}

		return {
			SNPDocumentData,
			SNPDocumentType: (function(inputData) {
				if (mod.SNPDocumentValidateSite(inputData)) {
					return mod.SNPDocumentTypeSite();
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
