const { throws, rejects, deepEqual } = require('assert');

const mod = require('./ui-logic.js').default;

const vCardsJS = require('vcards-js');

describe('SNPFormContactDocument', function test_SNPFormContactDocument() {

	it('throws if not valid', function () {
		throws(function () {
			mod.SNPFormContactDocument(null);
		}, /SNPErrorInputNotValid/);
	});

	it('returns object', function() {
		const SNPDocumentContactFirstName = Math.random().toString();
		const SNPDocumentContactLastName = Math.random().toString();
		const SNPDocumentContactOrganization = Math.random().toString();
		const SNPDocumentContactPhone = Math.random().toString();
		const SNPDocumentContactEmail = Math.random().toString();
		const SNPDocumentContactSite = Math.random().toString();

		const item = mod.SNPFormContactDocument({
			SNPDocumentContactFirstName,
			SNPDocumentContactLastName,
			SNPDocumentContactOrganization,
			SNPDocumentContactPhone,
			SNPDocumentContactEmail,
			SNPDocumentContactSite,
		});

		item.SNPDocumentData = item.SNPDocumentData.replace(/REV:.{24}/, '');

		deepEqual(item, {
			SNPDocumentData: Object.assign(vCardsJS(), {
				firstName: SNPDocumentContactFirstName,
				lastName: SNPDocumentContactLastName,
				cellPhone: SNPDocumentContactPhone,
				email: SNPDocumentContactEmail,
				url: SNPDocumentContactSite,
				organization: SNPDocumentContactOrganization,
			}).getFormattedString().replace(/REV:.{24}/, ''),
			SNPDocumentContactFirstName,
			SNPDocumentContactLastName,
			SNPDocumentContactOrganization,
			SNPDocumentContactPhone,
			SNPDocumentContactEmail,
			SNPDocumentContactSite,
		});
	});

});
