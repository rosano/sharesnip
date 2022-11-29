<script>
import { OLSKLocalized } from 'OLSKInternational';
import { OLSK_SPEC_UI } from 'OLSKSpec';

const uSerial2 = function (inputData) {
	return inputData.reduce(async function (coll, e) {
		return (await coll).concat(await new Promise(function (res, rej) {
			try {
				res(e());
			} catch (error) {
				rej(error);
			}
		}));
	}, Promise.resolve([]));
};

import SNPDocument from '../_shared/SNPDocument/main.js';
import SNPSetting from '../_shared/SNPSetting/main.js';
import SNPTransport from '../_shared/SNPTransport/main.js';
import SNPCodeLogic from './ui-logic.js';
import OLSKThrottle from 'OLSKThrottle';
import OLSKRemoteStorage from 'OLSKRemoteStorage';
import OLSKObject from 'OLSKObject';
import OLSKServiceWorker from 'OLSKServiceWorker';
import RemoteStorage from 'remotestoragejs';
import OLSKString from 'OLSKString';
import OLSKLanguageSwitcher from 'OLSKLanguageSwitcher';
import OLSKQueue from 'OLSKQueue';
import OLSKTransport from 'OLSKTransport';
import OLSKHash from 'OLSKHash';
import OLSKFund from 'OLSKFund';
import OLSKPact from 'OLSKPact';
import zerodatawrap from 'zerodatawrap';

const mod = {

	// VALUE

	_ValueIsLoading: true,

	_ValueFormIsVisible: false,
	_ValueFormData: '',
	_ValueFormDataTags: [],

	_ValueInboxIsVisible: false,

	_ValueRevealArchiveIsVisible: false,

	async ValueSetting (param1, param2) {
		await mod._ValueZDRWrap.App.SNPSetting.ZDRModelWriteObject({
			SNPSettingKey: param1,
			SNPSettingValue: param2,
		});

		mod._ValueSettingsAll[param1] = param2;
	},
	
	_ValueCloudToolbarHidden: true,

	_ValueSaveDocumentThrottleMap: {},

	_ValueSavePublishThrottleMap: {},

	_IsRunningDemo: false,

	OLSKTaxonomySuggestionItems: [],

	// DATA

	DataSetting (inputData) {
		return mod._ValueSettingsAll[inputData];
	},

	DataNavigator () {
		return navigator.serviceWorker ? navigator : {
			serviceWorker: {},
		};
	},

	DataIsEligible (inputData = {}) {
		return OLSKFund.OLSKFundIsEligible(Object.assign({
			ParamMinimumTier: 1,
			ParamCurrentProject: 'ROCO_SHARED_PROJECT_ID_SWAP_TOKEN',
			ParamBundleProjects: ['FakeBundleProject'],
			ParamGrantTier: OLSKFund.OLSKFundTier('OLSK_FUND_PRICING_STRING_SWAP_TOKEN', mod._ValueOLSKFundGrant),
			ParamGrantProject: mod._ValueOLSKFundGrant ? mod._ValueOLSKFundGrant.OLSKPactGrantProject : '',
		}, inputData));
	},

	DataCodeRecipes () {
		const outputData = [];

		if (OLSK_SPEC_UI()) {
			outputData.push(...[
				{
					LCHRecipeName: 'FakeZDRSchemaDispatchSyncCreateDocument',
					LCHRecipeCallback: async function FakeZDRSchemaDispatchSyncCreateDocument () {
						return mod.ZDRSchemaDispatchSyncCreateDocument(await mod._ValueZDRWrap.App.SNPDocument.SNPDocumentCreate(mod.DataStubDocumentObject({
							SNPDocumentNotes: 'FakeZDRSchemaDispatchSyncCreateDocument',
						})));
					},
				},
				{
					LCHRecipeName: 'FakeZDRSchemaDispatchSyncUpdateDocument',
					LCHRecipeCallback: async function FakeZDRSchemaDispatchSyncUpdateDocument () {
						return mod.ZDRSchemaDispatchSyncUpdateDocument(await mod._ValueZDRWrap.App.SNPDocument.SNPDocumentUpdate(Object.assign(mod._OLSKCatalog.modPublic._OLSKCatalogDataItemsAll().filter(function (e) {
							return e.SNPDocumentNotes.match('FakeZDRSchemaDispatchSync');
						}).pop(), {
							SNPDocumentNotes: 'FakeZDRSchemaDispatchSyncUpdateDocument',
						})));
					},
				},
				{
					LCHRecipeName: 'FakeZDRSchemaDispatchSyncDeleteDocument',
					LCHRecipeCallback: async function FakeZDRSchemaDispatchSyncDeleteDocument () {
						return mod.ZDRSchemaDispatchSyncDeleteDocument(await mod._ValueZDRWrap.App.SNPDocument.ZDRModelDeleteObject(mod._OLSKCatalog.modPublic._OLSKCatalogDataItemsAll().filter(function (e) {
							return e.SNPDocumentNotes.match('FakeZDRSchemaDispatchSync');
						}).pop()));
					},
				},
				{
					LCHRecipeName: 'FakeZDRSchemaDispatchSyncConflictDocument',
					LCHRecipeCallback: async function FakeZDRSchemaDispatchSyncConflictDocument () {
						const item = mod._OLSKCatalog.modPublic._OLSKCatalogDataItemsAll().filter(function (e) {
							return e.SNPDocumentNotes.match('FakeZDRSchemaDispatchSyncConflictDocument');
						}).pop();
						
						return mod.ZDRSchemaDispatchSyncConflictDocument({
							origin: 'conflict',
							oldValue: JSON.parse(JSON.stringify(await mod._ValueZDRWrap.App.SNPDocument.SNPDocumentUpdate(Object.assign(Object.assign({}, item), {
								SNPDocumentNotes: item.SNPDocumentNotes + '-local',
							})))),
							newValue: JSON.parse(JSON.stringify(Object.assign(Object.assign({}, item), {
								SNPDocumentNotes: item.SNPDocumentNotes + '-remote',
							}))),
						});
					},
				},
				{
					LCHRecipeName: 'SNPCodeLauncherFakeCreateTaggedItem',
					LCHRecipeCallback: async function SNPCodeLauncherFakeCreateTaggedItem () {
						return mod.ZDRSchemaDispatchSyncCreateDocument(await mod._ValueZDRWrap.App.SNPDocument.SNPDocumentCreate(mod.DataStubDocumentObject({
							SNPDocumentTags: [window.prompt()],
						})));
					},
				},
				{
					LCHRecipeName: 'FakeFundDocumentLimit',
					LCHRecipeCallback: async function FakeFundDocumentLimit () {
						await Promise.all(Array.from(Array(mod._ValueDocumentRemainder)).map(function (e) {
							return mod._ValueZDRWrap.App.SNPDocument.SNPDocumentCreate({
								SNPDocumentNotes: Math.random().toString(),
							});
						}));

						return mod.SetupCatalog();
					},
				}
			]);
		}

		outputData.push(...zerodatawrap.ZDRRecipes({
			ParamMod: mod,
			ParamSpecUI: OLSK_SPEC_UI(),
		}));

		outputData.push(...OLSKTransport.OLSKTransportRecipes({
			OLSKLocalized,
			OLSKTransportDispatchImportJSON: mod.OLSKTransportDispatchImportJSON,
			OLSKTransportDispatchExportInput: mod.OLSKTransportDispatchExportInput,
			ParamSpecUI: OLSK_SPEC_UI(),
		}));

		if (mod._ValueZDRWrap.ZDRStorageProtocol === zerodatawrap.ZDRProtocolRemoteStorage()) {
			outputData.push(...OLSKRemoteStorage.OLSKRemoteStorageRecipes({
				ParamStorage: mod._ValueZDRWrap.ZDRStorageClient(),
				OLSKLocalized,
				ParamMod: mod,
				ParamSpecUI: OLSK_SPEC_UI(),
			}));
		}

		outputData.push(...OLSKFund.OLSKFundRecipes({
			OLSKLocalized,
			ParamConnected: !!mod._ValueCloudIdentity,
			ParamAuthorized: !!mod._ValueFundClue,
			OLSKFundDispatchGrant: mod.OLSKFundDispatchGrant,
			OLSKFundDispatchPersist: mod.OLSKFundDispatchPersist,
			ParamMod: mod,
			ParamSpecUI: OLSK_SPEC_UI(),
		}));

		outputData.push(...OLSKServiceWorker.OLSKServiceWorkerRecipes(window, mod.DataNavigator(), OLSKLocalized, OLSK_SPEC_UI()));

		if (mod._SNPCodeDetail) {
			outputData.push(...mod._SNPCodeDetail.modPublic.SNPCodeDetailRecipes());
		}

		if (mod._ValueRevealArchiveIsVisible) {
			outputData.push({
				LCHRecipeSignature: 'SNPCodeLauncherItemRevealArchive',
				LCHRecipeName: OLSKLocalized('SNPCodeRevealArchiveButtonText'),
				LCHRecipeCallback: function SNPCodeLauncherItemRevealArchive () {
					mod._OLSKCatalog.modPublic.OLSKCatalogRevealArchive();
				},
			});
		}

		return outputData;
	},

	DataIsMobile () {
		return window.innerWidth <= 760;
	},

	DataStubDocumentObject (inputData = {}) {
		return Object.assign({
			SNPDocumentNotes: '',
		}, inputData);
	},

	DataStubDocumentObjectValid (inputData = {}) {
		return mod.DataStubDocumentObject(Object.assign({
			SNPDocumentID: Math.random().toString(),
			SNPDocumentCreationDate: new Date(),
			SNPDocumentModificationDate: new Date(),
		}, inputData));
	},

	// INTERFACE

	InterfaceAddButtonDidClick () {
		if (!mod._ValueFormIsVisible && mod._ValueDocumentRemainder < 1 && !mod.DataIsEligible()) {
			return mod.OLSKFundDocumentGate();
		}

		mod._ValueFormIsVisible = !mod._ValueFormIsVisible;
	},

	InterfaceFormDispatchTags (inputData) {
		mod._ValueFormDataTags = inputData;
	},

	InterfaceFormSubmitButtonDidClick (event) {
		event.preventDefault();

		mod.ControlFormSubmit();
	},

	InterfaceClearInboxButtonDidClick () {
		mod._OLSKCatalog.modPublic._OLSKCatalogDataItemsAll().filter(function (e) {
			return e.$SNPDocumentIsInbox;
		}).map(mod._OLSKCatalog.modPublic.OLSKCatalogRemove);

		mod._ValueInboxIsVisible = false;

		window.location.hash = '';
	},

	InterfaceWindowDidKeydown (event) {
		if (window.Launchlet.LCHSingletonExists()) {
			return;
		}

		const handlerFunctions = {
			Enter () {
				if (!mod._ValueFormIsVisible) {
					return;
				}

				if (event.ctrlKey || event.metaKey) {
					return mod.ControlFormSubmit();
				}
			},
		};

		handlerFunctions[event.key] && handlerFunctions[event.key]();
	},

	InterfaceStashButtonDidClick () {
		mod._OLSKCatalog.modPublic.OLSKCatalogStashEnabled(true);
	},

	// CONTROL

	ControlDocumentSave(inputData) {
		OLSKThrottle.OLSKThrottleMappedTimeout(mod._ValueSaveDocumentThrottleMap, inputData.SNPDocumentID, {
			OLSKThrottleDuration: 500,
			OLSKThrottleCallback () {
				mod._ValueZDRWrap.App.SNPDocument.SNPDocumentUpdate(inputData);
			},
		});

		if (OLSK_SPEC_UI()) {
			OLSKThrottle.OLSKThrottleSkip(mod._ValueSaveDocumentThrottleMap[inputData.SNPDocumentID])	
		}
	},

	ControlTextAdd (inputData, properties = {}) {
		const disableDuplicateURLs = false;

		const urls = mod._OLSKCatalog.modPublic._OLSKCatalogDataItemsAll().map(function (e) {
			return e.SNPDocumentURL;
		}).filter(function (e) {
			return !!e;
		});

		return Promise.all(SNPCodeLogic.SNPCodeDocuments(inputData).reverse().map(function (e) {
			return Object.assign(e, properties);
		}).filter(function (e) {
			return !disableDuplicateURLs || (disableDuplicateURLs && !urls.includes(e.SNPDocumentURL));
		}).map(mod.ControlDocumentAdd));
	},

	async ControlDocumentAdd (inputData) {
		mod._OLSKCatalog.modPublic._OLSKCatalogInsertAndSort(await mod._ValueZDRWrap.App.SNPDocument.SNPDocumentCreate(inputData));

		if (OLSK_SPEC_UI()) {
			return;
		}

		if (inputData.SNPDocumentDidFetch) {
			return;
		}

		mod.ControlDocumentFetch(inputData);
	},
	
	ControlInboxAdd (inputData) {
		inputData.map(mod._OLSKCatalog.modPublic.OLSKCatalogInsert);
	},
	
	_ControlHotfixUpdateInPlace(inputData) {
		mod.ControlDocumentActivate(inputData);
		mod._SNPCodeDetail.modPublic._SNPCodeDetailTriggerUpdate();
	},
	
	ControlDocumentActivate(inputData) {
		mod.OLSKTaxonomySuggestionItems = mod._OLSKTaxonomySuggestionItems.filter(function (e) {
			return !(inputData.SNPDocumentTags || []).includes(e);
		});
		
		mod._OLSKCatalog.modPublic.OLSKCatalogSelect(inputData);

		if (!inputData) {
			return;
		}

		mod._OLSKCatalog.modPublic.OLSKCatalogFocusDetail();

		if (mod.DataIsMobile()) {
			return;
		}
		
		mod._OLSKCatalog.modPublic.OLSKCatalogActivateDetail();
	},

	ControlDocumentArchive (inputData) {
		inputData.SNPDocumentArchiveDate = new Date();

		mod.ControlDocumentSave(inputData);

		mod.ControlDocumentActivate(inputData); // #purge-svelte-force-update
	},
	
	ControlDocumentUnarchive (inputData) {
		delete inputData.SNPDocumentArchiveDate;

		mod.ControlDocumentSave(inputData);

		mod.ControlDocumentActivate(inputData); // #purge-svelte-force-update
	},
	
	async ControlDocumentFetch (inputData) {
		mod.ControlDocumentSave(await mod._ValueFetchQueue.OLSKQueueAdd(function () {
			return SNPCodeLogic.SNPCodeFetch(inputData);
		}));

		mod._OLSKCatalog.modPublic.OLSKCatalogUpdate(inputData);
	},
	
	ControlDocumentDiscard (inputData) {
		mod._OLSKCatalog.modPublic.OLSKCatalogRemove(inputData);

		mod._ValueZDRWrap.App.SNPDocument.ZDRModelDeleteObject(inputData);
	},

	ControlDocumentQueue (inputData) {
		mod.ControlDocumentAdd(Object.keys(mod.DataStubDocumentObjectValid()).concat('$SNPDocumentIsInbox').reduce(function (coll, item) {
			if (!Object.keys(mod.DataStubDocumentObject()).includes(item)) {
				delete coll[item];
			}

			return coll;
		}, mod.DataStubDocumentObject(inputData)));
	},

	ControlFormSubmit () {
		mod.ControlTextAdd(mod._ValueFormData, mod._ValueFormDataTags.length ? {
			SNPDocumentTags: mod._ValueFormDataTags,
		} : {});

		mod._ValueFormIsVisible = false;
		mod._ValueFormData = '';
		mod._ValueFormDataTags = [];
	},

	// MESSAGE

	_OLSKCatalogDispatchKey (inputData) {
		return inputData.SNPDocumentID;
	},

	OLSKCollectionChunkFunction (inputData) {
		return SNPCodeLogic.SNPCodeChunkFunction(inputData, OLSKLocalized);
	},

	OLSKCollectionChunkKeySortFunction () {
		return SNPCodeLogic.SNPCodeChunkKeySortFunction(OLSKLocalized)(...arguments);
	},

	OLSKCollectionDispatchClick (inputData) {
		mod.ControlDocumentActivate(inputData);
	},

	OLSKCollectionDispatchArrow (inputData) {
		mod._OLSKCatalog.modPublic.OLSKCatalogSelect(inputData);
	},

	OLSKCatalogDispatchDetailActivate () {
		document.querySelector('.SNPCodeDetailToolbarBackButton').focus();
	},
	
	OLSKCatalogDispatchArchivedHide () {
		mod._ValueRevealArchiveIsVisible = true;
	},

	OLSKCatalogDispatchArchivedShow () {
		mod._ValueRevealArchiveIsVisible = false;
	},

	OLSKCatalogDispatchQuantity (inputData) {
		mod._OLSKTaxonomySuggestionItems = mod._OLSKCatalog.modPublic._OLSKCatalogDataItemsAll().reduce(function (coll, item) {
			return coll.concat((item.SNPDocumentTags || []).filter(function (e) {
				return !coll.includes(e);
			}));
		}, []);

		mod.ReactDocumentLimit();
	},

	OLSKCatalogDispatchStash (inputData) {
		if (!inputData.length) {
			return;
		}

		mod._SNPCodeShareItems = inputData;
		
		mod._SNPCodeShareModal.modPublic.OLSKModalViewShow();
	},

	OLSKAppToolbarDispatchApropos () {
		mod._OLSKModalView.modPublic.OLSKModalViewShow();
	},

	OLSKAppToolbarDispatchTongue () {
		if (window.Launchlet.LCHSingletonExists()) {
			return window.Launchlet.LCHSingletonDestroy();
		}

		// #hotfix launchlet show all items
		let selected;

		window.Launchlet.LCHSingletonCreate({
			LCHOptionRecipes: OLSKLanguageSwitcher.OLSKLanguageSwitcherRecipes({
				ParamLanguageCodes: window.OLSKPublicConstants('OLSKSharedPageLanguagesAvailable'),
				ParamCurrentLanguage: window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage'),
				ParamSpecUI: OLSK_SPEC_UI(),
				ParamRouteConstant: window.OLSKPublicConstants('OLSKSharedActiveRouteConstant'),
				OLSKCanonical: window.OLSKCanonical,
			}).map(function (e) {
				const item = e.LCHRecipeCallback;

				return Object.assign(e, {
					LCHRecipeCallback () {
						selected = item;
					},
				})
			}),
			LCHOptionCompletionHandler () {
			  selected && selected();
			},
			LCHOptionMode: Launchlet.LCHModePreview,
			LCHOptionLanguage: window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage'),
		});
	},

	OLSKAppToolbarDispatchCloud () {
		mod._ValueCloudToolbarHidden = !mod._ValueCloudToolbarHidden;
	},

	OLSKAppToolbarDispatchLauncher () {
		if (window.Launchlet.LCHSingletonExists()) {
			return window.Launchlet.LCHSingletonDestroy();
		}

		window.Launchlet.LCHSingletonCreate({
			LCHOptionRecipes: mod.DataCodeRecipes(),
			LCHOptionLanguage: window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage'),
		});
	},

	SNPCodeDetailDispatchBack () {
		mod._OLSKCatalog.modPublic.OLSKCatalogFocusMaster();
	},

	SNPCodeDetailDispatchArchive () {
		mod.ControlDocumentArchive(mod._OLSKCatalog.modPublic.OLSKCatalogDataItemSelected());
	},

	SNPCodeDetailDispatchUnarchive () {
		mod.ControlDocumentUnarchive(mod._OLSKCatalog.modPublic.OLSKCatalogDataItemSelected());
	},

	SNPCodeDetailDispatchFetch () {
		mod.ControlDocumentFetch(mod._OLSKCatalog.modPublic.OLSKCatalogDataItemSelected());
	},

	SNPCodeDetailDispatchUpdate () {
		mod.ControlDocumentSave(mod._OLSKCatalog.modPublic.OLSKCatalogUpdate(mod._OLSKCatalog.modPublic.OLSKCatalogDataItemSelected()));
	},

	SNPCodeDetailDispatchDiscard () {
		mod.ControlDocumentDiscard(mod._OLSKCatalog.modPublic.OLSKCatalogDataItemSelected());
	},

	SNPCodeDetailDispatchQueue () {
		mod.ControlDocumentQueue(mod._OLSKCatalog.modPublic.OLSKCatalogDataItemSelected());
	},

	async OLSKTransportDispatchImportJSON (inputData) {
		await mod._ValueZDRWrap.App.SNPTransport.SNPTransportImport(OLSKRemoteStorage.OLSKRemoteStoragePostJSONParse(inputData));

		await mod.SetupCatalog();
	},

	async OLSKTransportDispatchExportInput () {
		return mod._ValueZDRWrap.App.SNPTransport.SNPTransportExport({
			SNPDocument: mod._OLSKCatalog.modPublic._OLSKCatalogDataItemsAll(),
			SNPSetting: await mod._ValueZDRWrap.App.SNPSetting.SNPSettingList(),
		});
	},

	OLSKHashDispatchInitialize (inputData) {
		if (inputData[SNPCodeLogic.SNPCodeCaptureAnchor()]) {
			return mod.ControlTextAdd(inputData[SNPCodeLogic.SNPCodeCaptureAnchor()], {
				SNPDocumentName: inputData[SNPCodeLogic.SNPCodeNameAnchor()] || undefined,
				SNPDocumentImageURL: inputData[SNPCodeLogic.SNPCodeImageAnchor()] || undefined,
			}).then(function () {
				return !OLSK_SPEC_UI() && new Promise(function () {
					return setTimeout(function () {
						return window.close();
					}, 100);
				});
			});
		}

		if (inputData[SNPCodeLogic.SNPCodeInboxAnchor()]) {
			mod._ValueInboxIsVisible = true;

			return mod.ControlInboxAdd(JSON.parse(inputData[SNPCodeLogic.SNPCodeInboxAnchor()]).reverse().map(function (e) {
				return Object.assign(mod.DataStubDocumentObjectValid(OLSKRemoteStorage.OLSKRemoteStoragePostJSONParse(OLSKObject.OLSKObjectRemap(e, SNPCodeLogic.SNPCodeRemap(), true))), {
					$SNPDocumentIsInbox: true,
				});
			}));
		}
	},

	OLSKHashDispatchChange (inputData) {},

	ZDRSchemaDispatchSyncCreateDocument (inputData) {
		mod._OLSKCatalog.modPublic.OLSKCatalogInsert(inputData);
	},

	ZDRSchemaDispatchSyncUpdateDocument (inputData) {
		mod._OLSKCatalog.modPublic.OLSKCatalogUpdate(inputData);
		
		if (!OLSK_SPEC_UI() && mod._OLSKCatalog.modPublic.OLSKCatalogDataItemSelected() && mod._OLSKCatalog.modPublic.OLSKCatalogDataItemSelected().SNPDocumentID === inputData.SNPDocumentID) {
			mod._ControlHotfixUpdateInPlace(inputData);
		}
	},

	ZDRSchemaDispatchSyncDeleteDocument (inputData) {
		mod._OLSKCatalog.modPublic.OLSKCatalogRemove(inputData);
	},

	ZDRSchemaDispatchSyncConflictDocument (inputData) {
		return setTimeout(async function () {
			mod._OLSKCatalog.modPublic.OLSKCatalogUpdate(await mod._ValueZDRWrap.App.SNPDocument.SNPDocumentUpdate(OLSKRemoteStorage.OLSKRemoteStoragePostJSONParse(OLSKRemoteStorage.OLSKRemoteStorageChangeDelegateConflictSelectRecent(inputData))))
		}, OLSK_SPEC_UI() ? 0 : 500);
	},

	async OLSKCloudFormDispatchSubmit (inputData) {
		const protocol = zerodatawrap.ZDRPreferenceProtocolConnect(inputData);
		(zerodatawrap.ZDRPreferenceProtocolMigrate() ? await mod.DataStorageClient(protocol) : mod._ValueZDRWrap).ZDRCloudConnect(inputData);
	},

	OLSKCloudDispatchRenew () {
		mod._ValueZDRWrap.ZDRCloudReconnect(mod._ValueCloudIdentity);
	},

	OLSKCloudStatusDispatchDisconnect () {
		mod._ValueZDRWrap.ZDRCloudDisconnect();

		mod._ValueCloudIdentity = null;

		zerodatawrap.ZDRPreferenceProtocolClear();

		localStorage.clear();
	},

	ZDRParamDispatchError (error) {
		mod._ValueCloudErrorText = error.toString();
	},

	ZDRParamDispatchConnected (identity, token) {
		mod._ValueCloudIdentity = identity;
		mod._ValueCloudToken = token;
	},

	ZDRParamDispatchOnline () {
		mod._ValueCloudIsOffline = false;
	},

	ZDRParamDispatchOffline () {
		mod._ValueCloudIsOffline = true;
	},

	ZDRParamDispatchSyncDidStart () {
		mod._ValueIsSyncing = true;
	},

	ZDRParamDispatchSyncDidStop () {
		mod._ValueIsSyncing = false;
	},

	OLSKCloudStatusDispatchSyncStart () {
		if (mod._ValueZDRWrap.ZDRStorageProtocol !== zerodatawrap.ZDRProtocolRemoteStorage()) {
			return;
		}

		mod._ValueZDRWrap.ZDRStorageClient().startSync();

		mod.ZDRParamDispatchSyncDidStart();
	},

	OLSKCloudStatusDispatchSyncStop () {
		if (mod._ValueZDRWrap.ZDRStorageProtocol !== zerodatawrap.ZDRProtocolRemoteStorage()) {
			return;
		}

		mod._ValueZDRWrap.ZDRStorageClient().stopSync();
	},

	OLSKFundSetupDispatchClue () {
		return mod.DataSetting('SNPSettingFundClue') || null;
	},
	
	_OLSKFundSetupDispatchUpdate (inputData) {
		mod[inputData] = mod[inputData]; // #purge-svelte-force-update
	},

	OLSKFundDispatchPersist (inputData) {
		mod._ValueFundClue = inputData; // #hotfix-missing-persist
		
		if (!inputData) {
			return mod._ValueZDRWrap.App.SNPSetting.SNPSettingsDelete({
				SNPSettingKey: 'SNPSettingFundClue',
			});
		}

		return mod.ValueSetting('SNPSettingFundClue', inputData).then(function () {
			if (OLSK_SPEC_UI()) {
				return;
			}

			setTimeout(function () {
				window.location.reload();
			}, mod._ValueZDRWrap.ZDRStorageProtocol === zerodatawrap.ZDRProtocolFission() ? 1000 : 0); // #hotfix-fission-delay
		});
	},

	// REACT

	ReactDocumentLimit () {
		mod.OLSKFundDocumentRemainder && mod.OLSKFundDocumentRemainder(SNPCodeLogic.SNPCodeDocumentCount(mod._OLSKCatalog.modPublic._OLSKCatalogDataItemsAll()));
	},

	// SETUP

	DataStorageClient (inputData) {
		return zerodatawrap.ZDRWrap({
			ZDRParamLibrary: (function() {
				if (inputData === zerodatawrap.ZDRProtocolFission()) {
					return webnative;
				}

				return RemoteStorage;
			})(),
			ZDRParamScopes: [{
				ZDRScopeKey: 'App',
				ZDRScopeDirectory: 'sharesnip',
				ZDRScopeCreatorDirectory: 'rCreativ',
				ZDRScopeSchemas: [
					Object.assign(SNPDocument, {
						ZDRSchemaDispatchSyncCreate: mod.ZDRSchemaDispatchSyncCreateDocument,
						ZDRSchemaDispatchSyncUpdate: mod.ZDRSchemaDispatchSyncUpdateDocument,
						ZDRSchemaDispatchSyncDelete: mod.ZDRSchemaDispatchSyncDeleteDocument,
						ZDRSchemaDispatchSyncConflict: mod.ZDRSchemaDispatchSyncConflictDocument,
					}),
					SNPSetting,
					SNPTransport,
					],
			}],
			ZDRParamDispatchError: mod.ZDRParamDispatchError,
			ZDRParamDispatchConnected: mod.ZDRParamDispatchConnected,
			ZDRParamDispatchOnline: mod.ZDRParamDispatchOnline,
			ZDRParamDispatchOffline: mod.ZDRParamDispatchOffline,
			_ZDRParamDispatchJSONPreStringify: OLSKObject.OLSKObjectSafeCopy,
			_ZDRParamDispatchJSONPostParse: OLSKRemoteStorage.OLSKRemoteStoragePostJSONParse,
		})
	},

	async SetupStorageClient() {
		mod._ValueZDRWrap = await mod.DataStorageClient(zerodatawrap.ZDRPreferenceProtocol(zerodatawrap.ZDRProtocolRemoteStorage()));
	},

	async SetupCatalog() {
		if (zerodatawrap.ZDRPreferenceProtocolMigrate()) {
			const client = await mod.DataStorageClient(zerodatawrap.ZDRPreferenceProtocolMigrate());

			await Promise.all((await client.App.ZDRStoragePathsRecursive('/')).map(async function (e) {
				await mod._ValueZDRWrap.App.ZDRStorageWriteObject(e, await client.App.ZDRStorageReadObject(e));
				await client.App.ZDRStorageDeleteFile(e);
			}));

			zerodatawrap.ZDRPreferenceProtocolMigrateClear();

			client.ZDRCloudDisconnect();
		};

		if (!(await mod._ValueZDRWrap.App.SNPDocument.SNPDocumentList()).map(mod._OLSKCatalog.modPublic.OLSKCatalogInsert).length) {
			mod.OLSKCatalogDispatchQuantity(0);
		}
	},

	async SetupValueSettingsAll() {
		mod._ValueSettingsAll = Object.fromEntries((await mod._ValueZDRWrap.App.SNPSetting.SNPSettingList()).map(function (e) {
			return [e.SNPSettingKey, e.SNPSettingValue];
		}));
	},

	SetupValueFetchQueue() {
		mod._ValueFetchQueue = OLSKQueue.OLSKQueueAPI();
	},

	SetupHash() {
		return OLSKHash.OLSKHashSetup(mod);
	},

	async _SetupFund () {
		OLSKFund.OLSKFundSetup({
			ParamMod: mod,
			OLSKLocalized,
			ParamFormURL: 'OLSK_FUND_FORM_URL_SWAP_TOKEN',
			ParamProject: 'ROCO_SHARED_PROJECT_ID_SWAP_TOKEN',
			ParamSpecUI: OLSK_SPEC_UI(),
			ParamDocumentLimit: parseInt('OLSK_FUND_DOCUMENT_LIMIT_SWAP_TOKEN'),
		});

		mod.ReactDocumentLimit();

		await OLSKFund.OLSKFundSetupPostPay(mod);

		if (!mod._ValueCloudIdentity) {
			return;
		}

		if (!mod._ValueFundClue) {
			return;
		}
		
		const item = {
			OLSK_CRYPTO_PAIR_RECEIVER_PRIVATE: `OLSK_CRYPTO_PAIR_RECEIVER_PRIVATE_SWAP_TOKEN${ '' }`, // #purge
			OLSK_CRYPTO_PAIR_SENDER_PUBLIC: 'OLSK_CRYPTO_PAIR_SENDER_PUBLIC_SWAP_TOKEN',
			OLSK_FUND_API_URL: 'OLSK_FUND_API_URL_SWAP_TOKEN',
			ParamBody: {
				OLSKPactAuthType: mod._ValueZDRWrap.ZDRStorageProtocol === zerodatawrap.ZDRProtocolRemoteStorage() ? OLSKPact.OLSKPactAuthTypeRemoteStorage() : OLSKPact.OLSKPactAuthTypeFission(),
				OLSKPactAuthIdentity: mod._ValueCloudIdentity,
				OLSKPactAuthProof: mod._ValueCloudToken,
				OLSKPactAuthMetadata: {
					OLSKPactAuthMetadataModuleName: 'sharesnip',
					OLSKPactAuthMetadataFolderPath: SNPDocument.SNPDocumentDirectory() + '/',
				},
				OLSKPactPayIdentity: mod._ValueCloudIdentity,
				OLSKPactPayClue: mod._ValueFundClue,
			},
			OLSKLocalized,
			OLSKFundDispatchProgress: mod.OLSKFundDispatchProgress,
			OLSKFundDispatchFail: mod.OLSKFundDispatchFail,
			OLSKFundDispatchGrant: mod.OLSKFundDispatchGrant,
		};

		return OLSKFund.OLSKFundSetupGrant(item);
	},

	SetupFund () {
		mod._SetupFund();
	},

	SetupLoading () {
		mod._ValueIsLoading = false;

		if (mod.DataIsMobile()) {
			return;
		}

		setTimeout(function () {
			document.querySelector('.OLSKNarrowFilterField').focus();
		})
	},

	// LIFECYCLE

	LifecycleModuleWillMount() {
		return uSerial2(Object.keys(mod).filter(function (e) {
			return e.match(/^Setup/);
		}).map(function (e) {
			return mod[e];
		}));
	},

};

import { onMount } from 'svelte';
onMount(mod.LifecycleModuleWillMount);

import OLSKCatalog from 'OLSKCatalog';
import SNPCodeListItem from '../sub-item/main.svelte';
import SNPCodeDetail from '../sub-detail/main.svelte';
import SNPCodeShare from '../sub-share/main.svelte';
import OLSKTaxonomy from 'OLSKTaxonomy';
import OLSKAppToolbar from 'OLSKAppToolbar';
import OLSKServiceWorkerView from '../../node_modules/OLSKServiceWorker/main.svelte';
import OLSKInstall from 'OLSKInstall';
import OLSKCloud from 'OLSKCloud';
import OLSKWebView from 'OLSKWebView';
import OLSKModalView from 'OLSKModalView';
import OLSKApropos from 'OLSKApropos';
import OLSKUIAssets from 'OLSKUIAssets';
</script>
<svelte:window on:keydown={ mod.InterfaceWindowDidKeydown } />

<div class="SNPCode OLSKViewport OLSKDecorFormBlend" class:OLSKIsLoading={ mod._ValueIsLoading } class:OLSKIsDemoing={ mod._IsRunningDemo }>

<div class="OLSKViewportContent">

<OLSKCatalog
	bind:this={ mod._OLSKCatalog }

	OLSKCollectionItemAccessibilitySummaryFunction={ SNPCodeLogic.SNPCodeAccessibilitySummary }
	OLSKCollectionItemClass={ 'OLSKCommonEdgeBottom' }

	_OLSKCatalogArchiveField={ 'SNPDocumentArchiveDate' }
	
	OLSKCatalogSortFunction={ SNPCodeLogic.SNPCodeSortFunction }
	OLSKCatalogIsMatch={ SNPCodeLogic.SNPCodeIsMatch }

	_OLSKCatalogDispatchKey={ mod._OLSKCatalogDispatchKey }

	OLSKCollectionChunkFunction={ mod.OLSKCollectionChunkFunction }
	OLSKCollectionChunkKeySortFunction={ mod.OLSKCollectionChunkKeySortFunction }

	OLSKCollectionDispatchClick={ mod.OLSKCollectionDispatchClick }
	OLSKCollectionDispatchArrow={ mod.OLSKCollectionDispatchArrow }
	OLSKCatalogDispatchDetailActivate={ mod.OLSKCatalogDispatchDetailActivate }
	OLSKCatalogDispatchArchivedHide={ mod.OLSKCatalogDispatchArchivedHide }
	OLSKCatalogDispatchArchivedShow={ mod.OLSKCatalogDispatchArchivedShow }
	OLSKCatalogDispatchQuantity={ mod.OLSKCatalogDispatchQuantity }
	OLSKCatalogDispatchStash={ mod.OLSKCatalogDispatchStash }

	let:OLSKCollectionItem
	>

	<!-- MASTER -->

	<div class="OLSKToolbarElementGroup" slot="OLSKNarrowToolbarTail">
		<button class="SNPCodeStashButton OLSKDecorButtonNoStyle OLSKDecorTappable OLSKToolbarButton" title={ OLSKLocalized('SNPCodeStashButtonText') } on:click={ mod.InterfaceStashButtonDidClick }>
			<div class="SNPCodeStashButtonImage">{@html OLSKUIAssets._OLSKSharedStash }</div>
		</button>
		<button class="SNPCodeToggleFormButton OLSKDecorButtonNoStyle OLSKDecorTappable OLSKToolbarButton" title={ OLSKLocalized('SNPCodeToggleFormButtonText') } on:click={ mod.InterfaceAddButtonDidClick } accesskey="n">
			<div class="SNPCodeToggleFormButtonImage">{@html OLSKUIAssets._OLSKSharedCreate }</div>
		</button>
	</div>

	<!-- MASTER BODY HEAD -->

	{#if mod._ValueFormIsVisible }
		<div class="SNPCodeForm OLSKDecor OLSKDecorBigForm OLSKCommonEdgeBottom">
			<p>
				<textarea class="SNPCodeFormField" placeholder={ OLSKLocalized('SNPCodeFormFieldText') } bind:value={ mod._ValueFormData } autofocus></textarea>
			</p>
			
			<hr role="presentation" />
			
			<p>
				<OLSKTaxonomy
					OLSKTaxonomyItems={ [] }
					OLSKTaxonomySuggestionItems={ mod._OLSKTaxonomySuggestionItems }
					OLSKTaxonomyDispatchUpdate={ mod.InterfaceFormDispatchTags }
					/>
			</p>
			
			<hr role="presentation" />
			
			<p>
				<button class="SNPCodeFormSubmitButton" on:click={ mod.InterfaceFormSubmitButtonDidClick }>{ OLSKLocalized('SNPCodeFormSubmitButtonText') }</button>
			</p>
		</div>
	{/if}

	{#if mod._ValueInboxIsVisible }
		<div class="SNPCodeClearInbox">
			<button class="SNPCodeClearInboxButton OLSKDecorPress" on:click={ mod.InterfaceClearInboxButtonDidClick }>{ OLSKLocalized('SNPCodeClearInboxButtonText') }</button>
		</div>
	{/if}

	<!-- MASTER LIST ITEM -->

	<div slot="OLSKCollectionItem">
		<SNPCodeListItem SNPCodeListItemObject={ OLSKCollectionItem } />
	</div>

	<!-- MASTER BODY TAIL -->

	<div class="SNPCodeRevealArchive" slot="OLSKNarrowBodyTail">{#if mod._ValueRevealArchiveIsVisible }
		<button class="SNPCodeRevealArchiveButton OLSKDecorPress" on:click={ mod._OLSKCatalog.modPublic.OLSKCatalogRevealArchive }>{ OLSKLocalized('SNPCodeRevealArchiveButtonText') }</button>
	{/if}</div>

	<!-- DETAIL -->
	
	<div class="SNPCodeDetailContainer" slot="OLSKCatalogDetailContent" let:OLSKCatalogItemSelected>
		<SNPCodeDetail
			SNPCodeDetailItem={ OLSKCatalogItemSelected }
			OLSKTaxonomySuggestionItems={ mod.OLSKTaxonomySuggestionItems }
			SNPCodeDetailDispatchBack={ mod.SNPCodeDetailDispatchBack }
			SNPCodeDetailDispatchArchive={ mod.SNPCodeDetailDispatchArchive }
			SNPCodeDetailDispatchUnarchive={ mod.SNPCodeDetailDispatchUnarchive }
			SNPCodeDetailDispatchFetch={ mod.SNPCodeDetailDispatchFetch }
			SNPCodeDetailDispatchUpdate={ mod.SNPCodeDetailDispatchUpdate }
			SNPCodeDetailDispatchDiscard={ mod.SNPCodeDetailDispatchDiscard }
			SNPCodeDetailDispatchQueue={ mod.SNPCodeDetailDispatchQueue }
			bind:this={ mod._SNPCodeDetail }
			/>
	</div>

</OLSKCatalog>

</div>

<footer class="SNPCodeViewportFooter OLSKMobileViewFooter">

	{#if !mod._ValueCloudToolbarHidden }
		<div class="SNPCodeCloudToolbar OLSKToolbar OLSKToolbarJustify OLSKCommonEdgeTop">
			<div class="OLSKToolbarElementGroup">
			</div>

			<div class="OLSKToolbarElementGroup">
				<OLSKCloud
					OLSKCloudErrorText={ mod._ValueCloudErrorText }
					OLSKCloudDispatchRenew={ mod.OLSKCloudDispatchRenew }
					OLSKCloudFormDispatchSubmit={ mod.OLSKCloudFormDispatchSubmit }
					OLSKCloudStatusIdentityText={ mod._ValueCloudIdentity }
					OLSKCloudStatusIsSyncing={ mod._ValueIsSyncing }
					OLSKCloudStatusDispatchSyncStart={ mod.OLSKCloudStatusDispatchSyncStart }
					OLSKCloudStatusDispatchSyncStop={ mod.OLSKCloudStatusDispatchSyncStop }
					OLSKCloudStatusDispatchDisconnect={ mod.OLSKCloudStatusDispatchDisconnect }
					/>
			</div>
		</div>
	{/if}

	<OLSKAppToolbar
		OLSKAppToolbarDispatchApropos={ mod.OLSKAppToolbarDispatchApropos }
		OLSKAppToolbarDispatchTongue={ mod.OLSKAppToolbarDispatchTongue }
		OLSKAppToolbarGuideURL={ window.OLSKCanonical('SNPGuideRoute') }
		OLSKAppToolbarFundShowProgress={ mod._ValueOLSKFundProgress }
		OLSKAppToolbarFundLimitText={ mod._ValueDocumentRemainder }
		OLSKAppToolbarCloudConnected={ !!mod._ValueCloudIdentity }
		OLSKAppToolbarCloudOffline={ mod._ValueCloudIsOffline }
		OLSKAppToolbarCloudError={ !!mod._ValueCloudErrorText }
		OLSKAppToolbarDispatchFund={ mod._ValueOLSKFundGrant || OLSKFund.OLSKFundResponseIsPresent() ? null : mod.OLSKAppToolbarDispatchFund }
		OLSKAppToolbarDispatchCloud={ mod.OLSKAppToolbarDispatchCloud }
		OLSKAppToolbarDispatchLauncher={ mod.OLSKAppToolbarDispatchLauncher }
		/>

	<OLSKInstall />

	{#if !OLSK_SPEC_UI()}
		<OLSKServiceWorkerView OLSKServiceWorkerRegistrationRoute={ window.OLSKCanonical('SNPServiceWorkerRoute') } />
	{/if}
</footer>

</div>

{#if !!mod._ValueCloudIdentity }
	<OLSKWebView OLSKModalViewTitleText={ OLSKLocalized('OLSKFundWebViewTitleText') } OLSKWebViewURL={ mod._ValueFundURL } bind:this={ mod._OLSKWebView } DEBUG_OLSKWebViewDataSource={ OLSK_SPEC_UI() } />
{/if}

<OLSKModalView OLSKModalViewTitleText={ OLSKLocalized('OLSKAproposHeadingText') } bind:this={ mod._OLSKModalView } OLSKModalViewIsCapped={ true }>
	<OLSKApropos
		OLSKAproposFeedbackValue={ `javascript:window.location.href = window.atob('${ window.btoa(OLSKString.OLSKStringFormatted(window.atob('OLSK_APROPOS_FEEDBACK_EMAIL_SWAP_TOKEN'), 'ROCO_SHARED_PROJECT_ID_SWAP_TOKEN' + (mod._ValueFundClue ? '+' + mod._ValueFundClue : ''))) }')` }
		/>
</OLSKModalView>

<OLSKModalView OLSKModalViewTitleText={ OLSKLocalized('SNPCodeShareModalTitleText') } bind:this={ mod._SNPCodeShareModal }>
	<div>
		<SNPCodeShare SNPCodeShareItems={ mod._SNPCodeShareItems } />
	</div>
</OLSKModalView>

<style>
.SNPCodeForm {
	font-size: unset;
}

.SNPCodeForm p:last-child {
	margin-bottom: 0;
}

.SNPCodeClearInbox, .SNPCodeRevealArchive {
	padding: 10px;
	
	display: flex;
	flex-direction: column;
	align-items: center;
	flex-shrink: 0;
}
</style>
