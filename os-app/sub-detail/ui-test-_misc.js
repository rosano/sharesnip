const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('SNPPlayDetail_Misc', function () {

	const item = StubDocumentObjectValid({
		SNPDocumentURL: Math.random().toString(),
		SNPDocumentName: Math.random().toString(),
		SNPDocumentURL: '/?' + Math.random().toString(),
		SNPDocumentEmbedURL: '/?' + Math.random().toString(),
		SNPDocumentTags: Array.from(Array(Math.max(2, uRandomInt(10)))).map(function () {
			return Math.random().toString();
		}),
	});

	const OLSKTaxonomySuggestionItems = Array.from(Array(Math.max(2, uRandomInt(10)))).map(function () {
		return Math.random().toString();
	});

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			SNPPlayDetailItem: JSON.stringify(StubDocumentObjectValid()),
		});
	});

	describe('SNPPlayDetail', function test_SNPPlayDetail () {

		it('classes ROCOStandardView', function () {
			browser.assert.hasClass(SNPPlayDetail, 'ROCOStandardView');
		});

	});

	describe('SNPPlayDetailToolbar', function test_SNPPlayDetailToolbar () {

		it('classes OLSKToolbar', function () {
			browser.assert.hasClass(SNPPlayDetailToolbar, 'OLSKToolbar');
		});

		it('classes OLSKToolbarJustify', function () {
			browser.assert.hasClass(SNPPlayDetailToolbar, 'OLSKToolbarJustify');
		});

		it('classes OLSKMobileViewHeader', function () {
			browser.assert.hasClass(SNPPlayDetailToolbar, 'OLSKMobileViewHeader');
		});
		
		it('classes OLSKCommonEdgeBottom', function () {
			browser.assert.hasClass(SNPPlayDetailToolbar, 'OLSKCommonEdgeBottom');
		});
		
		it('classes ROCOStandardViewHead', function () {
			browser.assert.hasClass(SNPPlayDetailToolbar, 'ROCOStandardViewHead');
		});
		
	});

	describe('SNPPlayDetailToolbarBackButton', function test_SNPPlayDetailToolbarBackButton () {
		
		it('classes OLSKDecorButtonNoStyle', function () {
			browser.assert.hasClass(SNPPlayDetailToolbarBackButton, 'OLSKDecorButtonNoStyle');
		});

		it('classes OLSKDecorTappable', function () {
			browser.assert.hasClass(SNPPlayDetailToolbarBackButton, 'OLSKDecorTappable');
		});

		it('classes OLSKToolbarButton', function () {
			browser.assert.hasClass(SNPPlayDetailToolbarBackButton, 'OLSKToolbarButton');
		});

		it('classes OLSKVisibilityMobile', function () {
			browser.assert.hasClass(SNPPlayDetailToolbarBackButton, 'OLSKVisibilityMobile');
		});

		it('classes OLSKVisibilityDesktopScreenreader', function () {
			browser.assert.hasClass(SNPPlayDetailToolbarBackButton, 'OLSKVisibilityDesktopScreenreader');
		});

		context('click', function () {
			
			before(function () {
				browser.assert.text('#TestSNPPlayDetailDispatchBack', '0');
			});
			
			before(function () {
				return browser.pressButton(SNPPlayDetailToolbarBackButton);
			});

			it('sends SNPPlayDetailDispatchBack', function () {
				browser.assert.text('#TestSNPPlayDetailDispatchBack', '1');
			});
		
		});
	
	});

	describe('SNPPlayDetailToolbarBackButtonImage', function test_SNPPlayDetailToolbarBackButtonImage () {

		it('sets src', function () {
			browser.assert.elements(`${ SNPPlayDetailToolbarBackButtonImage } #_OLSKSharedBack`, 1);
		});
	
	});

	describe('SNPPlayDetailToolbarArchiveButton', function test_SNPPlayDetailToolbarArchiveButton () {
		
		it('classes OLSKDecorButtonNoStyle', function () {
			browser.assert.hasClass(SNPPlayDetailToolbarArchiveButton, 'OLSKDecorButtonNoStyle');
		});

		it('classes OLSKDecorTappable', function () {
			browser.assert.hasClass(SNPPlayDetailToolbarArchiveButton, 'OLSKDecorTappable');
		});

		it('classes OLSKToolbarButton', function () {
			browser.assert.hasClass(SNPPlayDetailToolbarArchiveButton, 'OLSKToolbarButton');
		});

		context('click', function () {
			
			before(function () {
				browser.assert.text('#TestSNPPlayDetailDispatchArchive', '0');
			});
			
			before(function () {
				return browser.pressButton(SNPPlayDetailToolbarArchiveButton);
			});

			it('sends SNPPlayDetailDispatchArchive', function () {
				browser.assert.text('#TestSNPPlayDetailDispatchArchive', '1');
			});
		
		});
	
	});

	describe('SNPPlayDetailToolbarArchiveButtonImage', function test_SNPPlayDetailToolbarArchiveButtonImage () {

		it('sets src', function () {
			browser.assert.elements(`${ SNPPlayDetailToolbarArchiveButtonImage } #_OLSKSharedArchive`, 1);
		});
	
	});

	describe('SNPPlayDetailToolbarUnarchiveButton', function test_SNPPlayDetailToolbarUnarchiveButton () {
		
		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				SNPPlayDetailItem: JSON.stringify(StubDocumentObjectValid({
					SNPDocumentArchiveDate: new Date(),
				})),
			});
		});

		it('classes OLSKDecorButtonNoStyle', function () {
			browser.assert.hasClass(SNPPlayDetailToolbarUnarchiveButton, 'OLSKDecorButtonNoStyle');
		});

		it('classes OLSKDecorTappable', function () {
			browser.assert.hasClass(SNPPlayDetailToolbarUnarchiveButton, 'OLSKDecorTappable');
		});

		it('classes OLSKToolbarButton', function () {
			browser.assert.hasClass(SNPPlayDetailToolbarUnarchiveButton, 'OLSKToolbarButton');
		});

		context('click', function () {
			
			before(function () {
				browser.assert.text('#TestSNPPlayDetailDispatchUnarchive', '0');
			});
			
			before(function () {
				return browser.pressButton(SNPPlayDetailToolbarUnarchiveButton);
			});

			it('sends SNPPlayDetailDispatchUnarchive', function () {
				browser.assert.text('#TestSNPPlayDetailDispatchUnarchive', '1');
			});
		
		});
	
	});

	describe('SNPPlayDetailToolbarUnarchiveButtonImage', function test_SNPPlayDetailToolbarUnarchiveButtonImage () {

		it('sets src', function () {
			browser.assert.elements(`${ SNPPlayDetailToolbarUnarchiveButtonImage } #_OLSKSharedUnarchive`, 1);
		});
	
	});

	describe('SNPPlayDetailToolbarDiscardButton', function test_SNPPlayDetailToolbarDiscardButton () {
		
		it('classes OLSKDecorButtonNoStyle', function () {
			browser.assert.hasClass(SNPPlayDetailToolbarDiscardButton, 'OLSKDecorButtonNoStyle');
		});

		it('classes OLSKDecorTappable', function () {
			browser.assert.hasClass(SNPPlayDetailToolbarDiscardButton, 'OLSKDecorTappable');
		});

		it('classes OLSKToolbarButton', function () {
			browser.assert.hasClass(SNPPlayDetailToolbarDiscardButton, 'OLSKToolbarButton');
		});

		context('click', function () {

			context('cancel', function () {
				
				before(function () {
					browser.assert.text('#TestSNPPlayDetailDispatchDiscard', '0');
				});

				return browser.OLSKConfirm(function () {
					return browser.pressButton(SNPPlayDetailToolbarDiscardButton);
				}, function (dialog) {
					dialog.response = false;

					return dialog;
				});

				it('does nothing', function () {
					browser.assert.text('#TestSNPPlayDetailDispatchDiscard', '0');
				});
			
			});
			
			context('confirm', function () {
				
				before(function () {
					return browser.pressButton(SNPPlayDetailToolbarDiscardButton);
				});

				it('sends SNPPlayDetailDispatchDiscard', function () {
					browser.assert.text('#TestSNPPlayDetailDispatchDiscard', '1');
				});
			
			});

		});
	
	});

	describe('SNPPlayDetailToolbarDiscardButtonImage', function test_SNPPlayDetailToolbarDiscardButtonImage () {

		it('sets src', function () {
			browser.assert.elements(`${ SNPPlayDetailToolbarDiscardButtonImage } #_OLSKSharedDiscard`, 1);
		});
	
	});

	describe('SNPPlayDetailMedia', function test_SNPPlayDetailMedia () {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				SNPPlayDetailItem: JSON.stringify(item),
				OLSKTaxonomySuggestionItems: JSON.stringify(OLSKTaxonomySuggestionItems),
			});
		});

		it('classes OLSKDecor', function () {
			browser.assert.hasClass(SNPPlayDetailMedia, 'OLSKDecor');
		});

		it('classes OLSKDecorBigForm', function () {
			browser.assert.hasClass(SNPPlayDetailMedia, 'OLSKDecorBigForm');
		});
	
	});

	describe('SNPPlayDetailMediaPlayer', function test_SNPPlayDetailMediaPlayer () {

		it('binds SNPDocumentEmbedURL', function () {
			browser.assert.attribute(SNPPlayDetailMediaPlayer, 'src', item.SNPDocumentEmbedURL);
		});

	});

	describe('SNPPlayDetailMediaURLField', function test_SNPPlayDetailMediaURLField () {

		it('sets type', function () {
			browser.assert.attribute(SNPPlayDetailMediaURLField, 'type', 	'text');
		});

		it('sets disabled', function () {
			browser.assert.attribute(SNPPlayDetailMediaURLField, 'disabled', 	'');
		});

		it('binds SNPDocumentURL', function () {
			browser.assert.input(SNPPlayDetailMediaURLField, item.SNPDocumentURL);
		});
	
	});

	describe('SNPPlayDetailMediaOpenButton', function test_SNPPlayDetailMediaOpenButton () {

		it('sets href', function () {
			browser.assert.attribute(SNPPlayDetailMediaOpenButton, 'href', item.SNPDocumentURL);
		});
		
		it('sets target', function () {
			browser.assert.attribute(SNPPlayDetailMediaOpenButton, 'target', 	'_blank');
		});

		it('classes OLSKDecorPress', function () {
			browser.assert.hasClass(SNPPlayDetailMediaOpenButton, 'OLSKDecorPress');
		});
	
	});

	describe('SNPPlayDetailMediaFetchButton', function test_SNPPlayDetailMediaFetchButton () {
		
		context('click', function () {
			
			before(function () {
				browser.assert.text('#TestSNPPlayDetailDispatchFetch', '0');
			});
			
			before(function () {
				return browser.pressButton(SNPPlayDetailMediaFetchButton);
			});

			it('sends SNPPlayDetailDispatchFetch', function () {
				browser.assert.text('#TestSNPPlayDetailDispatchFetch', '1');
			});
		
		});
	
	});

	describe('SNPPlayDetailForm', function test_SNPPlayDetailForm () {

		it('classes OLSKDecor', function () {
			browser.assert.hasClass(SNPPlayDetailForm, 'OLSKDecor');
		});

		it('classes OLSKDecorBigForm', function () {
			browser.assert.hasClass(SNPPlayDetailForm, 'OLSKDecorBigForm');
		});
	
	});

	describe('SNPPlayDetailFormNameField', function test_SNPPlayDetailFormNameField () {

		it('sets type', function () {
			browser.assert.attribute(SNPPlayDetailFormNameField, 'type', 	'text');
		});

		it('binds SNPDocumentName', function () {
			browser.assert.input(SNPPlayDetailFormNameField, item.SNPDocumentName);
		});

		context('input', function () {

			before(function () {
				browser.assert.text('#TestSNPPlayDetailDispatchUpdate', '0');
			});

			before(function () {
				browser.fill(SNPPlayDetailFormNameField, Math.random().toString());
			});

			it('sends SNPPlayDetailDispatchUpdate', function () {
				browser.assert.text('#TestSNPPlayDetailDispatchUpdate', '1');
			});
		
		});
	
	});

	describe('SNPPlayDetailFormNotesField', function test_SNPPlayDetailFormNotesField () {

		it('binds SNPDocumentNotes', function () {
			browser.assert.input(SNPPlayDetailFormNotesField, item.SNPDocumentNotes);
		});

		context('input', function () {

			before(function () {
				browser.assert.text('#TestSNPPlayDetailDispatchUpdate', '1');
			});

			before(function () {
				browser.fill(SNPPlayDetailFormNotesField, Math.random().toString());
			});

			it('sends SNPPlayDetailDispatchUpdate', function () {
				browser.assert.text('#TestSNPPlayDetailDispatchUpdate', '2');
			});
		
		});
	
	});

	describe('OLSKTaxonomy', function test_OLSKTaxonomy () {

		it.skip('binds SNPDocumentTags', function () {
			browser.assert.text('.OLSKTaxonomyItem', item.SNPDocumentTags.join(' '));
		});

		it('binds OLSKTaxonomySuggestionItems', function () {
			browser.assert.text('.OLSKTaxonomySuggestion', OLSKTaxonomySuggestionItems.join(''));
		});

		context.skip('input', function () {

			before(function () {
				browser.fill('.OLSKTaxonomyField', Math.random().toString());
			});

			before(function () {
				return browser.fire('.OLSKTaxonomyField', 'submit');
			});

			it('sends SNPPlayDetailDispatchUpdate', function () {
				browser.assert.text('#TestSNPPlayDetailDispatchUpdate', '2');
			});
		
		});
	
	});

	describe('SNPPlayDetailLauncherItemArchive', function test_SNPPlayDetailLauncherItemArchive() {
		
		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				SNPPlayDetailItem: JSON.stringify(StubDocumentObjectValid()),
			});
		});

		before(function () {
			browser.assert.text('#TestSNPPlayDetailDispatchArchive', '0');
		});
		
		before(function () {
			return browser.OLSKLauncherRun('SNPPlayDetailLauncherItemArchive');
		});

		it('sends SNPPlayDetailDispatchArchive', function () {
			browser.assert.text('#TestSNPPlayDetailDispatchArchive', '1');
		});

	});

	describe('SNPPlayDetailLauncherItemUnarchive', function test_SNPPlayDetailLauncherItemUnarchive() {
		
		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				SNPPlayDetailItem: JSON.stringify(StubDocumentObjectValid({
					SNPDocumentArchiveDate: new Date(),
				})),
			});
		});

		before(function () {
			browser.assert.text('#TestSNPPlayDetailDispatchUnarchive', '0');
		});
		
		before(function () {
			return browser.OLSKLauncherRun('SNPPlayDetailLauncherItemUnarchive');
		});

		it('sends SNPPlayDetailDispatchUnarchive', function () {
			browser.assert.text('#TestSNPPlayDetailDispatchUnarchive', '1');
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

		it('disables SNPPlayDetailFormNameField', function () {
			browser.assert.attribute(SNPPlayDetailFormNameField, 'disabled', '');
		});

		it('disables SNPPlayDetailFormNotesField', function () {
			browser.assert.attribute(SNPPlayDetailFormNotesField, 'disabled', '');
		});

		describe('SNPPlayDetailToolbarQueueButton', function test_SNPPlayDetailToolbarQueueButton () {
			
			it('classes OLSKDecorButtonNoStyle', function () {
				browser.assert.hasClass(SNPPlayDetailToolbarQueueButton, 'OLSKDecorButtonNoStyle');
			});

			it('classes OLSKDecorTappable', function () {
				browser.assert.hasClass(SNPPlayDetailToolbarQueueButton, 'OLSKDecorTappable');
			});

			it('classes OLSKToolbarButton', function () {
				browser.assert.hasClass(SNPPlayDetailToolbarQueueButton, 'OLSKToolbarButton');
			});

			context('click', function () {
				
				before(function () {
					browser.assert.text('#TestSNPPlayDetailDispatchQueue', '0');
				});
				
				before(function () {
					return browser.pressButton(SNPPlayDetailToolbarQueueButton);
				});

				it('sends SNPPlayDetailDispatchQueue', function () {
					browser.assert.text('#TestSNPPlayDetailDispatchQueue', '1');
				});
			
			});
		
		});

		describe('SNPPlayDetailToolbarQueueButtonImage', function test_SNPPlayDetailToolbarQueueButtonImage () {

			it('sets src', function () {
				browser.assert.elements(`${ SNPPlayDetailToolbarQueueButtonImage } #_OLSKSharedClone`, 1);
			});
		
		});

	});

});
