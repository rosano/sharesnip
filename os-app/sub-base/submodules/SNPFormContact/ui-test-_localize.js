const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

kDefaultRoute.OLSKRouteLanguageCodes.forEach(function (OLSKRoutingLanguage) {

	const uLocalized = function (inputData) {
		return OLSKTestingLocalized(inputData, OLSKRoutingLanguage);
	};

	describe('SNPFormContact_Localize-' + OLSKRoutingLanguage, function () {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				OLSKRoutingLanguage,
			});
		});

		it('localizes SNPFormContactFirstNameField', function () {
			browser.assert.attribute(SNPFormContactFirstNameField, 'placeholder', uLocalized('SNPFormContactFirstNameFieldText'));
		});

		it('localizes SNPFormContactLastNameField', function () {
			browser.assert.attribute(SNPFormContactLastNameField, 'placeholder', uLocalized('SNPFormContactLastNameFieldText'));
		});

		it('localizes SNPFormContactPhoneField', function () {
			browser.assert.attribute(SNPFormContactPhoneField, 'placeholder', uLocalized('SNPFormContactPhoneFieldText'));
		});

		it('localizes SNPFormContactEmailField', function () {
			browser.assert.attribute(SNPFormContactEmailField, 'placeholder', uLocalized('SNPFormContactEmailFieldText'));
		});

		it('localizes SNPFormContactSiteField', function () {
			browser.assert.attribute(SNPFormContactSiteField, 'placeholder', uLocalized('SNPFormContactSiteFieldText'));
		});

		it('localizes SNPFormContactOrganizationField', function () {
			browser.assert.attribute(SNPFormContactOrganizationField, 'placeholder', uLocalized('SNPFormContactOrganizationFieldText'));
		});

	});

});
