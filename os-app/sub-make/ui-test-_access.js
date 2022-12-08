const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	SNPMake: '.SNPMake',
	
	SNPMakeScanButton: '.SNPMakeScanButton',
	
	SNPMakeTypes: '.SNPMakeTypes',
	SNPMakeTypesNoteButton: '.SNPMakeTypesNoteButton',
	SNPMakeTypesSiteButton: '.SNPMakeTypesSiteButton',
	SNPMakeTypesEmailButton: '.SNPMakeTypesEmailButton',
	SNPMakeTypesPhoneButton: '.SNPMakeTypesPhoneButton',
	SNPMakeTypesWifiButton: '.SNPMakeTypesWifiButton',
	
	SNPMakeDataNotValid: '.SNPMakeDataNotValid',
}).map(function (e) {
	return global[e.shift()] = e.pop();
});

describe('SNPMake_Access', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});

	it('shows SNPMake', function () {
		browser.assert.elements(SNPMake, 1);
	});

	it('shows SNPMakeScanButton', function () {
		browser.assert.elements(SNPMakeScanButton, 1);
	});

	it('shows SNPMakeTypes', function () {
		browser.assert.elements(SNPMakeTypes, 1);
	});

	it('shows SNPMakeTypesNoteButton', function () {
		browser.assert.elements(SNPMakeTypesNoteButton, 1);
	});

	it('shows SNPMakeTypesSiteButton', function () {
		browser.assert.elements(SNPMakeTypesSiteButton, 1);
	});

	it('shows SNPMakeTypesEmailButton', function () {
		browser.assert.elements(SNPMakeTypesEmailButton, 1);
	});

	it('shows SNPMakeTypesPhoneButton', function () {
		browser.assert.elements(SNPMakeTypesPhoneButton, 1);
	});

	it('shows SNPMakeTypesWifiButton', function () {
		browser.assert.elements(SNPMakeTypesWifiButton, 1);
	});

	it('shows SNPFormBase', function () {
		browser.assert.elements('.SNPFormBase', 1);
	});

	it('shows SNPFormNote', function () {
		browser.assert.elements('.SNPFormNote', 1);
	});

	it('shows SNPMakeDataNotValid', function () {
		browser.assert.elements(SNPMakeDataNotValid, 1);
	});

	it('hides SNPCode', function () {
		browser.assert.elements('.SNPCode', 0);
	});

	it('hides SNPScan', function () {
		browser.assert.elements('.SNPScan', 0);
	});

	context('SNPMakeTypesSiteButton', function () {
		
		before(function () {
			return browser.pressButton(SNPMakeTypesSiteButton);
		});

		it('hides SNPFormNote', function () {
			browser.assert.elements('.SNPFormNote', 0);
		});

		it('shows SNPFormSite', function () {
			browser.assert.elements('.SNPFormSite', 1);
		});
	
	});

	context('SNPMakeTypesEmailButton', function () {
		
		before(function () {
			return browser.pressButton(SNPMakeTypesEmailButton);
		});

		it('hides SNPFormSite', function () {
			browser.assert.elements('.SNPFormSite', 0);
		});

		it('shows SNPFormEmail', function () {
			browser.assert.elements('.SNPFormEmail', 1);
		});
	
	});

	context('SNPMakeTypesPhoneButton', function () {
		
		before(function () {
			return browser.pressButton(SNPMakeTypesPhoneButton);
		});

		it('hides SNPFormEmail', function () {
			browser.assert.elements('.SNPFormEmail', 0);
		});

		it('shows SNPFormPhone', function () {
			browser.assert.elements('.SNPFormPhone', 1);
		});
	
	});

	context('SNPMakeTypesWifiButton', function () {
		
		before(function () {
			return browser.pressButton(SNPMakeTypesWifiButton);
		});

		it('hides SNPFormPhone', function () {
			browser.assert.elements('.SNPFormPhone', 0);
		});

		it('shows SNPFormWifi', function () {
			browser.assert.elements('.SNPFormWifi', 1);
		});
	
	});

	context('valid', function () {

		before(function () {
			return browser.pressButton(SNPMakeTypesNoteButton);
		});

		before(function () {
			return browser.fill('.SNPFormNoteField', Math.random().toString());
		});

		it('hides SNPMakeDataNotValid', function () {
			browser.assert.elements(SNPMakeDataNotValid, 0);
		});
		
		it('shows SNPCode', function () {
			browser.assert.elements('.SNPCode', 1);
		});
	
	});

	context('not valid', function () {

		before(function () {
			return browser.fill('.SNPFormNoteField', '');
		});

		it('shows SNPMakeDataNotValid', function () {
			browser.assert.elements(SNPMakeDataNotValid, 1);
		});

		it('hides SNPCode', function () {
			browser.assert.elements('.SNPCode', 0);
		});
	
	});

	context('SNPMakeScanButton', function () {
		
		before(function () {
			return browser.pressButton(SNPMakeScanButton);
		});

		it('hides SNPFormBase', function () {
			browser.assert.elements('.SNPFormBase', 0);
		});

		it('hides SNPMakeDataNotValid', function () {
			browser.assert.elements(SNPMakeDataNotValid, 0);
		});

		it('hides SNPCode', function () {
			browser.assert.elements('.SNPCode', 0);
		});

		it('shows SNPScan', function () {
			browser.assert.elements('.SNPScan', 1);
		});

		describe('change type', function () {

			before(function () {
				return browser.pressButton(SNPMakeTypesSiteButton);
			});
			
			it('shows SNPFormBase', function () {
				browser.assert.elements('.SNPFormBase', 1);
			});

			it('shows SNPMakeDataNotValid', function () {
				browser.assert.elements(SNPMakeDataNotValid, 1);
			});

			it('hides SNPScan', function () {
				browser.assert.elements('.SNPScan', 0);
			});
			
		});

		context('Parse', function () {
			
			before(function () {
				return browser.pressButton(SNPMakeScanButton);
			});

			before(function () {
				return browser.pressButton('#TestMessageReadDidParseButton');
			});
			
			it('shows SNPFormBase', function () {
				browser.assert.elements('.SNPFormBase', 1);
			});

			it('hides SNPScan', function () {
				browser.assert.elements('.SNPScan', 0);
			});

			it('shows SNPFormNote', function () {
				browser.assert.elements('.SNPFormNote', 1);
			});

			it('shows SNPCode', function () {
				browser.assert.elements('.SNPCode', 1);
			});
		
		});
	
	});

});
