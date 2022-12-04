const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('SNPCollectDetail_Misc', function () {

	const item = StubDocumentObjectValid({
		SNPDocumentName: Math.random().toString(),
		SNPDocumentData: Math.random().toString(),
	});

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			SNPCollectDetailItem: JSON.stringify(item),
		});
	});

	describe('SNPCollectDetail', function test_SNPCollectDetail () {

		it('classes ROCOStandardView', function () {
			browser.assert.hasClass(SNPCollectDetail, 'ROCOStandardView');
		});

	});

	describe('SNPCollectDetailToolbar', function test_SNPCollectDetailToolbar () {

		it('classes OLSKToolbar', function () {
			browser.assert.hasClass(SNPCollectDetailToolbar, 'OLSKToolbar');
		});

		it('classes OLSKToolbarJustify', function () {
			browser.assert.hasClass(SNPCollectDetailToolbar, 'OLSKToolbarJustify');
		});

		it('classes OLSKMobileViewHeader', function () {
			browser.assert.hasClass(SNPCollectDetailToolbar, 'OLSKMobileViewHeader');
		});
		
		it('classes OLSKCommonEdgeBottom', function () {
			browser.assert.hasClass(SNPCollectDetailToolbar, 'OLSKCommonEdgeBottom');
		});
		
		it('classes ROCOStandardViewHead', function () {
			browser.assert.hasClass(SNPCollectDetailToolbar, 'ROCOStandardViewHead');
		});
		
	});

	describe('SNPCollectDetailToolbarBackButton', function test_SNPCollectDetailToolbarBackButton () {
		
		it('classes OLSKDecorButtonNoStyle', function () {
			browser.assert.hasClass(SNPCollectDetailToolbarBackButton, 'OLSKDecorButtonNoStyle');
		});

		it('classes OLSKDecorTappable', function () {
			browser.assert.hasClass(SNPCollectDetailToolbarBackButton, 'OLSKDecorTappable');
		});

		it('classes OLSKToolbarButton', function () {
			browser.assert.hasClass(SNPCollectDetailToolbarBackButton, 'OLSKToolbarButton');
		});

		it('classes OLSKVisibilityMobile', function () {
			browser.assert.hasClass(SNPCollectDetailToolbarBackButton, 'OLSKVisibilityMobile');
		});

		it('classes OLSKVisibilityDesktopScreenreader', function () {
			browser.assert.hasClass(SNPCollectDetailToolbarBackButton, 'OLSKVisibilityDesktopScreenreader');
		});

		context('click', function () {
			
			before(function () {
				browser.assert.text('#TestSNPCollectDetailDispatchBack', '0');
			});
			
			before(function () {
				return browser.pressButton(SNPCollectDetailToolbarBackButton);
			});

			it('sends SNPCollectDetailDispatchBack', function () {
				browser.assert.text('#TestSNPCollectDetailDispatchBack', '1');
			});
		
		});
	
	});

	describe('SNPCollectDetailToolbarBackButtonImage', function test_SNPCollectDetailToolbarBackButtonImage () {

		it('sets src', function () {
			browser.assert.elements(`${ SNPCollectDetailToolbarBackButtonImage } #_OLSKSharedBack`, 1);
		});
	
	});

	describe('SNPCollectDetailToolbarCloneButton', function test_SNPCollectDetailToolbarCloneButton () {
		
		it('classes OLSKDecorButtonNoStyle', function () {
			browser.assert.hasClass(SNPCollectDetailToolbarCloneButton, 'OLSKDecorButtonNoStyle');
		});

		it('classes OLSKDecorTappable', function () {
			browser.assert.hasClass(SNPCollectDetailToolbarCloneButton, 'OLSKDecorTappable');
		});

		it('classes OLSKToolbarButton', function () {
			browser.assert.hasClass(SNPCollectDetailToolbarCloneButton, 'OLSKToolbarButton');
		});

		context('click', function () {
			
			before(function () {
				browser.assert.text('#TestSNPCollectDetailDispatchClone', '0');
			});
			
			before(function () {
				return browser.pressButton(SNPCollectDetailToolbarCloneButton);
			});

			it('sends SNPCollectDetailDispatchClone', function () {
				browser.assert.text('#TestSNPCollectDetailDispatchClone', '1');
			});
		
		});
	
	});

	describe('SNPCollectDetailToolbarCloneButtonImage', function test_SNPCollectDetailToolbarCloneButtonImage () {

		it('sets src', function () {
			browser.assert.elements(`${ SNPCollectDetailToolbarCloneButtonImage } #_OLSKSharedClone`, 1);
		});
	
	});

	describe('SNPCollectDetailToolbarDiscardButton', function test_SNPCollectDetailToolbarDiscardButton () {
		
		it('classes OLSKDecorButtonNoStyle', function () {
			browser.assert.hasClass(SNPCollectDetailToolbarDiscardButton, 'OLSKDecorButtonNoStyle');
		});

		it('classes OLSKDecorTappable', function () {
			browser.assert.hasClass(SNPCollectDetailToolbarDiscardButton, 'OLSKDecorTappable');
		});

		it('classes OLSKToolbarButton', function () {
			browser.assert.hasClass(SNPCollectDetailToolbarDiscardButton, 'OLSKToolbarButton');
		});

		context('click', function () {

			context('cancel', function () {
				
				before(function () {
					browser.assert.text('#TestSNPCollectDetailDispatchDiscard', '0');
				});

				return browser.OLSKConfirm(function () {
					return browser.pressButton(SNPCollectDetailToolbarDiscardButton);
				}, function (dialog) {
					dialog.response = false;

					return dialog;
				});

				it('does nothing', function () {
					browser.assert.text('#TestSNPCollectDetailDispatchDiscard', '0');
				});
			
			});
			
			context('confirm', function () {
				
				before(function () {
					return browser.pressButton(SNPCollectDetailToolbarDiscardButton);
				});

				it('sends SNPCollectDetailDispatchDiscard', function () {
					browser.assert.text('#TestSNPCollectDetailDispatchDiscard', '1');
				});
			
			});

		});
	
	});

	describe('SNPCollectDetailToolbarDiscardButtonImage', function test_SNPCollectDetailToolbarDiscardButtonImage () {

		it('sets src', function () {
			browser.assert.elements(`${ SNPCollectDetailToolbarDiscardButtonImage } #_OLSKSharedDiscard`, 1);
		});
	
	});

	describe('SNPCollectDetailForm', function test_SNPCollectDetailForm () {

		it('classes OLSKDecor', function () {
			browser.assert.hasClass(SNPCollectDetailForm, 'OLSKDecor');
		});

		it('classes OLSKDecorBigForm', function () {
			browser.assert.hasClass(SNPCollectDetailForm, 'OLSKDecorBigForm');
		});
	
	});

	describe('SNPCollectDetailFormNameField', function test_SNPCollectDetailFormNameField () {

		it('sets type', function () {
			browser.assert.attribute(SNPCollectDetailFormNameField, 'type', 	'text');
		});

		it('binds SNPDocumentName', function () {
			browser.assert.input(SNPCollectDetailFormNameField, item.SNPDocumentName);
		});

		context('input', function () {

			before(function () {
				browser.assert.text('#TestSNPCollectDetailDispatchUpdate', '0');
			});

			before(function () {
				browser.fill(SNPCollectDetailFormNameField, Math.random().toString());
			});

			it('sends SNPCollectDetailDispatchUpdate', function () {
				browser.assert.text('#TestSNPCollectDetailDispatchUpdate', '1');
			});
		
		});
	
	});

	describe('SNPCollectDetailDataField', function test_SNPCollectDetailDataField () {

		it('sets type', function () {
			browser.assert.attribute(SNPCollectDetailDataField, 'type', 'text');
		});

		it('sets disabled', function () {
			browser.assert.attribute(SNPCollectDetailDataField, 'disabled', '');
		});

		it('binds SNPDocumentData', function () {
			browser.assert.input(SNPCollectDetailDataField, item.SNPDocumentData);
		});
	
	});

	describe.skip('SNPCollectDetailQR', function test_SNPCollectDetailQR () {

		it('creates canvas', function () {
			browser.assert.elements(`${ SNPCollectDetailQR } canvas`, 1);
		});
	
	});

});
