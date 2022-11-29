const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('SNPCodeDetail_Misc', function () {

	const item = StubDocumentObjectValid({
		SNPDocumentName: Math.random().toString(),
	});

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			SNPCodeDetailItem: JSON.stringify(item),
		});
	});

	describe('SNPCodeDetail', function test_SNPCodeDetail () {

		it('classes ROCOStandardView', function () {
			browser.assert.hasClass(SNPCodeDetail, 'ROCOStandardView');
		});

	});

	describe('SNPCodeDetailToolbar', function test_SNPCodeDetailToolbar () {

		it('classes OLSKToolbar', function () {
			browser.assert.hasClass(SNPCodeDetailToolbar, 'OLSKToolbar');
		});

		it('classes OLSKToolbarJustify', function () {
			browser.assert.hasClass(SNPCodeDetailToolbar, 'OLSKToolbarJustify');
		});

		it('classes OLSKMobileViewHeader', function () {
			browser.assert.hasClass(SNPCodeDetailToolbar, 'OLSKMobileViewHeader');
		});
		
		it('classes OLSKCommonEdgeBottom', function () {
			browser.assert.hasClass(SNPCodeDetailToolbar, 'OLSKCommonEdgeBottom');
		});
		
		it('classes ROCOStandardViewHead', function () {
			browser.assert.hasClass(SNPCodeDetailToolbar, 'ROCOStandardViewHead');
		});
		
	});

	describe('SNPCodeDetailToolbarBackButton', function test_SNPCodeDetailToolbarBackButton () {
		
		it('classes OLSKDecorButtonNoStyle', function () {
			browser.assert.hasClass(SNPCodeDetailToolbarBackButton, 'OLSKDecorButtonNoStyle');
		});

		it('classes OLSKDecorTappable', function () {
			browser.assert.hasClass(SNPCodeDetailToolbarBackButton, 'OLSKDecorTappable');
		});

		it('classes OLSKToolbarButton', function () {
			browser.assert.hasClass(SNPCodeDetailToolbarBackButton, 'OLSKToolbarButton');
		});

		it('classes OLSKVisibilityMobile', function () {
			browser.assert.hasClass(SNPCodeDetailToolbarBackButton, 'OLSKVisibilityMobile');
		});

		it('classes OLSKVisibilityDesktopScreenreader', function () {
			browser.assert.hasClass(SNPCodeDetailToolbarBackButton, 'OLSKVisibilityDesktopScreenreader');
		});

		context('click', function () {
			
			before(function () {
				browser.assert.text('#TestSNPCodeDetailDispatchBack', '0');
			});
			
			before(function () {
				return browser.pressButton(SNPCodeDetailToolbarBackButton);
			});

			it('sends SNPCodeDetailDispatchBack', function () {
				browser.assert.text('#TestSNPCodeDetailDispatchBack', '1');
			});
		
		});
	
	});

	describe('SNPCodeDetailToolbarBackButtonImage', function test_SNPCodeDetailToolbarBackButtonImage () {

		it('sets src', function () {
			browser.assert.elements(`${ SNPCodeDetailToolbarBackButtonImage } #_OLSKSharedBack`, 1);
		});
	
	});

	describe('SNPCodeDetailToolbarCloneButton', function test_SNPCodeDetailToolbarCloneButton () {
		
		it('classes OLSKDecorButtonNoStyle', function () {
			browser.assert.hasClass(SNPCodeDetailToolbarCloneButton, 'OLSKDecorButtonNoStyle');
		});

		it('classes OLSKDecorTappable', function () {
			browser.assert.hasClass(SNPCodeDetailToolbarCloneButton, 'OLSKDecorTappable');
		});

		it('classes OLSKToolbarButton', function () {
			browser.assert.hasClass(SNPCodeDetailToolbarCloneButton, 'OLSKToolbarButton');
		});

		context('click', function () {
			
			before(function () {
				browser.assert.text('#TestSNPCodeDetailDispatchClone', '0');
			});
			
			before(function () {
				return browser.pressButton(SNPCodeDetailToolbarCloneButton);
			});

			it('sends SNPCodeDetailDispatchClone', function () {
				browser.assert.text('#TestSNPCodeDetailDispatchClone', '1');
			});
		
		});
	
	});

	describe('SNPCodeDetailToolbarCloneButtonImage', function test_SNPCodeDetailToolbarCloneButtonImage () {

		it('sets src', function () {
			browser.assert.elements(`${ SNPCodeDetailToolbarCloneButtonImage } #_OLSKSharedClone`, 1);
		});
	
	});

	describe('SNPCodeDetailToolbarDiscardButton', function test_SNPCodeDetailToolbarDiscardButton () {
		
		it('classes OLSKDecorButtonNoStyle', function () {
			browser.assert.hasClass(SNPCodeDetailToolbarDiscardButton, 'OLSKDecorButtonNoStyle');
		});

		it('classes OLSKDecorTappable', function () {
			browser.assert.hasClass(SNPCodeDetailToolbarDiscardButton, 'OLSKDecorTappable');
		});

		it('classes OLSKToolbarButton', function () {
			browser.assert.hasClass(SNPCodeDetailToolbarDiscardButton, 'OLSKToolbarButton');
		});

		context('click', function () {

			context('cancel', function () {
				
				before(function () {
					browser.assert.text('#TestSNPCodeDetailDispatchDiscard', '0');
				});

				return browser.OLSKConfirm(function () {
					return browser.pressButton(SNPCodeDetailToolbarDiscardButton);
				}, function (dialog) {
					dialog.response = false;

					return dialog;
				});

				it('does nothing', function () {
					browser.assert.text('#TestSNPCodeDetailDispatchDiscard', '0');
				});
			
			});
			
			context('confirm', function () {
				
				before(function () {
					return browser.pressButton(SNPCodeDetailToolbarDiscardButton);
				});

				it('sends SNPCodeDetailDispatchDiscard', function () {
					browser.assert.text('#TestSNPCodeDetailDispatchDiscard', '1');
				});
			
			});

		});
	
	});

	describe('SNPCodeDetailToolbarDiscardButtonImage', function test_SNPCodeDetailToolbarDiscardButtonImage () {

		it('sets src', function () {
			browser.assert.elements(`${ SNPCodeDetailToolbarDiscardButtonImage } #_OLSKSharedDiscard`, 1);
		});
	
	});

	describe('SNPCodeDetailForm', function test_SNPCodeDetailForm () {

		it('classes OLSKDecor', function () {
			browser.assert.hasClass(SNPCodeDetailForm, 'OLSKDecor');
		});

		it('classes OLSKDecorBigForm', function () {
			browser.assert.hasClass(SNPCodeDetailForm, 'OLSKDecorBigForm');
		});
	
	});

	describe('SNPCodeDetailFormNameField', function test_SNPCodeDetailFormNameField () {

		it('sets type', function () {
			browser.assert.attribute(SNPCodeDetailFormNameField, 'type', 	'text');
		});

		it('binds SNPDocumentName', function () {
			browser.assert.input(SNPCodeDetailFormNameField, item.SNPDocumentName);
		});

		context('input', function () {

			before(function () {
				browser.assert.text('#TestSNPCodeDetailDispatchUpdate', '0');
			});

			before(function () {
				browser.fill(SNPCodeDetailFormNameField, Math.random().toString());
			});

			it('sends SNPCodeDetailDispatchUpdate', function () {
				browser.assert.text('#TestSNPCodeDetailDispatchUpdate', '1');
			});
		
		});
	
	});

});
