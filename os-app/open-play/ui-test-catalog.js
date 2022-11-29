const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('SNPPlay_Catalog', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});

	context('create', function test_create () {
		
		before(function () {
			return browser.pressButton(SNPPlayToggleFormButton);
		});

		before(function () {
			browser.fill(SNPPlayFormField, Math.random().toString());
		});

		before(function () {
			return browser.pressButton(SNPPlayFormSubmitButton);
		});

		it('adds item', function () {
			browser.assert.elements(SNPPlayListItem, 1);
		});
	
	});

	context('OLSKCollectionDispatchClick', function test_OLSKCollectionDispatchClick () {
		
		before(function () {
			browser.assert.elements('.SNPPlayDetail', 0);
		});

		before(function () {
			return browser.click(SNPPlayListItem);
		});

		it('selects item', function () {
			browser.assert.elements('.SNPPlayDetail', 1);
		});
	
	});

	context('back', function test_back () {

		before(function () {
			return browser.pressButton('.SNPPlayDetailToolbarBackButton');
		});

		it('sets focus', function () {
			browser.assert.hasClass('.OLSKCatalogDetail', 'OLSKMobileViewInactive');
		});

	});

	context('discard', function test_discard () {

		context('cancel', function () {
			
			before(async function () {
				return browser.OLSKConfirm(function () {
					browser.pressButton('.SNPPlayDetailToolbarDiscardButton');
				}, function (dialog) {
					dialog.response = false;

					return dialog;
				});
			});

			it('does nothing', function () {
				browser.assert.elements('.SNPPlayDetail', 1);
			});
		
		});

		context('confirm', function () {
			
			before(async function () {
				return browser.OLSKConfirm(function () {
					return browser.pressButton('.SNPPlayDetailToolbarDiscardButton');
				});
			});

			it('removes item', function () {
				browser.assert.elements(SNPPlayListItem, 0);
			});
		
		});
		
	});

	context('OLSKCollectionDispatchArrow', function test_OLSKCollectionDispatchArrow () {
		
		before(function () {
			return browser.pressButton(SNPPlayToggleFormButton);
		});

		before(function () {
			browser.fill(SNPPlayFormField, Math.random().toString() + '\n\n' + Math.random().toString());
		});

		before(function () {
			return browser.pressButton(SNPPlayFormSubmitButton);
		});

		before(function () {
			return browser.click(SNPPlayListItem);
		});

		before(function () {
			return browser.focus('.OLSKNarrowFilterField');
		});

		before(function () {
			return browser.OLSKFireKeyboardEvent(browser.window, 'ArrowDown');
		});

		it('binds OLSKCollectionItemsLocus', function () {
			browser.assert.hasClass('.OLSKCollectionItem:nth-child(2)', 'OLSKCollectionItemLocus');
		});
	
	});

});
