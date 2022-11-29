const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('SNPPlayDetail_Misc', function () {

	const item = StubDocumentObjectValid({
		SNPDocumentName: Math.random().toString(),
	});

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			SNPPlayDetailItem: item,
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

});
