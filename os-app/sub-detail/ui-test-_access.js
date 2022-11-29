const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	SNPPlayDetail: '.SNPPlayDetail',

	SNPPlayDetailToolbar: '.SNPPlayDetailToolbar',
	
	SNPPlayDetailToolbarBackButton: '.SNPPlayDetailToolbarBackButton',
	SNPPlayDetailToolbarBackButtonImage: '.SNPPlayDetailToolbarBackButtonImage',

	SNPPlayDetailToolbarQueueButton: '.SNPPlayDetailToolbarQueueButton',	
	SNPPlayDetailToolbarQueueButtonImage: '.SNPPlayDetailToolbarQueueButtonImage',
	
	SNPPlayDetailToolbarArchiveButton: '.SNPPlayDetailToolbarArchiveButton',
	SNPPlayDetailToolbarArchiveButtonImage: '.SNPPlayDetailToolbarArchiveButtonImage',
	SNPPlayDetailToolbarUnarchiveButton: '.SNPPlayDetailToolbarUnarchiveButton',
	SNPPlayDetailToolbarUnarchiveButtonImage: '.SNPPlayDetailToolbarUnarchiveButtonImage',

	SNPPlayDetailToolbarDiscardButton: '.SNPPlayDetailToolbarDiscardButton',	
	SNPPlayDetailToolbarDiscardButtonImage: '.SNPPlayDetailToolbarDiscardButtonImage',

	SNPPlayDetailMedia: '.SNPPlayDetailMedia',
	SNPPlayDetailMediaPlayer: '.SNPPlayDetailMediaPlayer',
	SNPPlayDetailMediaURLField: '.SNPPlayDetailMediaURLField',
	SNPPlayDetailMediaOpenButton: '.SNPPlayDetailMediaOpenButton',
	SNPPlayDetailMediaFetchButton: '.SNPPlayDetailMediaFetchButton',

	SNPPlayDetailForm: '.SNPPlayDetailForm',
	SNPPlayDetailFormNameField: '.SNPPlayDetailFormNameField',
	SNPPlayDetailFormNotesField: '.SNPPlayDetailFormNotesField',
}).map(function (e) {
	return global[e.shift()] = e.pop();
});

describe('SNPPlayDetail_Access', function () {
	
	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			SNPPlayDetailItem: JSON.stringify(StubDocumentObjectValid()),
		});
	});

	it('shows SNPPlayDetail', function () {
		browser.assert.elements(SNPPlayDetail, 1);
	});

	it('shows SNPPlayDetailToolbar', function () {
		browser.assert.elements(SNPPlayDetailToolbar, 1);
	});

	it('shows SNPPlayDetailToolbarBackButton', function () {
		browser.assert.elements(SNPPlayDetailToolbarBackButton, 1);
	});

	it('shows SNPPlayDetailToolbarBackButtonImage', function () {
		browser.assert.elements(SNPPlayDetailToolbarBackButtonImage, 1);
	});

	it('hides SNPPlayDetailToolbarQueueButton', function () {
		browser.assert.elements(SNPPlayDetailToolbarQueueButton, 0);
	});

	it('shows SNPPlayDetailToolbarArchiveButton', function () {
		browser.assert.elements(SNPPlayDetailToolbarArchiveButton, 1);
	});

	it('shows SNPPlayDetailToolbarArchiveButtonImage', function () {
		browser.assert.elements(SNPPlayDetailToolbarArchiveButtonImage, 1);
	});

	it('hides SNPPlayDetailToolbarUnarchiveButton', function () {
		browser.assert.elements(SNPPlayDetailToolbarUnarchiveButton, 0);
	});

	it('shows SNPPlayDetailToolbarDiscardButton', function () {
		browser.assert.elements(SNPPlayDetailToolbarDiscardButton, 1);
	});

	it('shows SNPPlayDetailToolbarDiscardButtonImage', function () {
		browser.assert.elements(SNPPlayDetailToolbarDiscardButtonImage, 1);
	});

	it('hides SNPPlayDetailMedia', function () {
		browser.assert.elements(SNPPlayDetailMedia, 0);
	});

	it('shows SNPPlayDetailForm', function () {
		browser.assert.elements(SNPPlayDetailForm, 1);
	});

	it('shows SNPPlayDetailFormNameField', function () {
		browser.assert.elements(SNPPlayDetailFormNameField, 1);
	});

	it('shows SNPPlayDetailFormNotesField', function () {
		browser.assert.elements(SNPPlayDetailFormNotesField, 1);
	});

	it('shows OLSKTaxonomy', function () {
		browser.assert.elements('.OLSKTaxonomy', 1);
	});

	it('shows SNPPlayDetailLauncherItemArchive', function () {
		return browser.assert.OLSKLauncherItems('SNPPlayDetailLauncherItemArchive', 1);
	});

	it('hides SNPPlayDetailLauncherItemUnarchive', function () {
		return browser.assert.OLSKLauncherItems('SNPPlayDetailLauncherItemUnarchive', 0);
	});

	context('SNPDocumentURL', function() {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				SNPPlayDetailItem: JSON.stringify(StubDocumentObjectValid({
					SNPDocumentURL: Math.random().toString(),
				})),
			});
		});

		it('shows SNPPlayDetailMedia', function () {
			browser.assert.elements(SNPPlayDetailMedia, 1);
		});

		it('hides SNPPlayDetailMediaPlayer', function () {
			browser.assert.elements(SNPPlayDetailMediaPlayer, 0);
		});

		it('shows SNPPlayDetailMediaURLField', function () {
			browser.assert.elements(SNPPlayDetailMediaURLField, 1);
		});

		it('shows SNPPlayDetailMediaOpenButton', function () {
			browser.assert.elements(SNPPlayDetailMediaOpenButton, 1);
		});

		it('shows SNPPlayDetailMediaFetchButton', function () {
			browser.assert.elements(SNPPlayDetailMediaFetchButton, 1);
		});

	});

	context('SNPDocumentEmbedURL', function() {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				SNPPlayDetailItem: JSON.stringify(StubDocumentObjectValid({
					SNPDocumentURL: Math.random().toString(),
					SNPDocumentEmbedURL: '/?' + Math.random().toString(),
				})),
			});
		});

		it('shows SNPPlayDetailMediaPlayer', function () {
			browser.assert.elements(SNPPlayDetailMediaPlayer, 1);
		});

	});

	context('SNPDocumentArchiveDate', function() {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				SNPPlayDetailItem: JSON.stringify(StubDocumentObjectValid({
					SNPDocumentArchiveDate: new Date(),
				})),
			});
		});

		it('hides SNPPlayDetailToolbarArchiveButton', function () {
			browser.assert.elements(SNPPlayDetailToolbarArchiveButton, 0);
		});

		it('shows SNPPlayDetailToolbarUnarchiveButton', function () {
			browser.assert.elements(SNPPlayDetailToolbarUnarchiveButton, 1);
		});

		it('shows SNPPlayDetailToolbarUnarchiveButtonImage', function () {
			browser.assert.elements(SNPPlayDetailToolbarUnarchiveButtonImage, 1);
		});

		it('hides SNPPlayDetailLauncherItemArchive', function () {
			return browser.assert.OLSKLauncherItems('SNPPlayDetailLauncherItemArchive', 0);
		});

		it('shows SNPPlayDetailLauncherItemUnarchive', function () {
			return browser.assert.OLSKLauncherItems('SNPPlayDetailLauncherItemUnarchive', 1);
		});

	});

	context('$SNPDocumentIsInbox', function() {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				SNPPlayDetailItem: JSON.stringify(StubDocumentObjectValid({
					$SNPDocumentIsInbox: true,
				})),
			});
		});

		it('shows SNPPlayDetailToolbarQueueButton', function () {
			browser.assert.elements(SNPPlayDetailToolbarQueueButton, 1);
		});

		it('shows SNPPlayDetailToolbarQueueButtonImage', function () {
			browser.assert.elements(SNPPlayDetailToolbarQueueButtonImage, 1);
		});

		it('hides SNPPlayDetailToolbarArchiveButton', function () {
			browser.assert.elements(SNPPlayDetailToolbarArchiveButton, 0);
		});

		it('hides SNPPlayDetailToolbarUnarchiveButton', function () {
			browser.assert.elements(SNPPlayDetailToolbarUnarchiveButton, 0);
		});

		it('hides SNPPlayDetailToolbarDiscardButton', function () {
			browser.assert.elements(SNPPlayDetailToolbarDiscardButton, 0);
		});

		it('hides SNPPlayDetailMediaFetchButton', function () {
			browser.assert.elements(SNPPlayDetailMediaFetchButton, 0);
		});

		it('hides OLSKTaxonomy', function () {
			browser.assert.elements('.OLSKTaxonomy', 0);
		});

		it('hides SNPPlayDetailLauncherItemArchive', function () {
			return browser.assert.OLSKLauncherItems('SNPPlayDetailLauncherItemArchive', 0);
		});

		it('hides SNPPlayDetailLauncherItemUnarchive', function () {
			return browser.assert.OLSKLauncherItems('SNPPlayDetailLauncherItemUnarchive', 0);
		});

	});

});
