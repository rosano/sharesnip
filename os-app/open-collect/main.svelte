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
import SNPCollectLogic from './ui-logic.js';
import OLSKThrottle from 'OLSKThrottle';
import OLSKRemoteStorage from 'OLSKRemoteStorage';
import OLSKObject from 'OLSKObject';
import OLSKServiceWorker from 'OLSKServiceWorker';
import RemoteStorage from 'remotestoragejs';
import OLSKString from 'OLSKString';
import OLSKLanguageSwitcher from 'OLSKLanguageSwitcher';
import OLSKTransport from 'OLSKTransport';
import OLSKPact from 'OLSKPact';
import zerodatawrap from 'zerodatawrap';

const mod = {

	// VALUE

	_ValueIsLoading: true,

	async ValueSetting (param1, param2) {
		await mod._ValueZDRWrap.App.SNPSetting.ZDRModelWriteObject({
			SNPSettingKey: param1,
			SNPSettingValue: param2,
		});

		mod._ValueSettingsAll[param1] = param2;
	},
	
	_ValueCloudToolbarHidden: true,

	_ValueSaveDocumentThrottleMap: {},

	_IsRunningDemo: false,

	// DATA

	DataSetting (inputData) {
		return mod._ValueSettingsAll[inputData];
	},

	DataNavigator () {
		return navigator.serviceWorker ? navigator : {
			serviceWorker: {},
		};
	},

	DataCollectRecipes () {
		const outputData = [];

		if (OLSK_SPEC_UI()) {
			outputData.push(...[
				{
					LCHRecipeName: 'FakeZDRSchemaDispatchSyncCreateDocument',
					LCHRecipeCallback: async function FakeZDRSchemaDispatchSyncCreateDocument () {

						return mod.ZDRSchemaDispatchSyncCreateDocument(await mod._ValueZDRWrap.App.SNPDocument.SNPDocumentCreate(mod.DataStubDocumentObject({
							SNPDocumentName: 'FakeZDRSchemaDispatchSyncCreateDocument',
						})));
					},
				},
				{
					LCHRecipeName: 'FakeZDRSchemaDispatchSyncUpdateDocument',
					LCHRecipeCallback: async function FakeZDRSchemaDispatchSyncUpdateDocument () {
						return mod.ZDRSchemaDispatchSyncUpdateDocument(await mod._ValueZDRWrap.App.SNPDocument.SNPDocumentUpdate(Object.assign(mod._OLSKCatalog.modPublic._OLSKCatalogDataItemsAll().filter(function (e) {
							return e.SNPDocumentName.match('FakeZDRSchemaDispatchSync');
						}).pop(), {
							SNPDocumentName: 'FakeZDRSchemaDispatchSyncUpdateDocument',
						})));
					},
				},
				{
					LCHRecipeName: 'FakeZDRSchemaDispatchSyncDeleteDocument',
					LCHRecipeCallback: async function FakeZDRSchemaDispatchSyncDeleteDocument () {
						return mod.ZDRSchemaDispatchSyncDeleteDocument(await mod._ValueZDRWrap.App.SNPDocument.ZDRModelDeleteObject(mod._OLSKCatalog.modPublic._OLSKCatalogDataItemsAll().filter(function (e) {
							return e.SNPDocumentName.match('FakeZDRSchemaDispatchSync');
						}).pop()));
					},
				},
				{
					LCHRecipeName: 'FakeZDRSchemaDispatchSyncConflictDocument',
					LCHRecipeCallback: async function FakeZDRSchemaDispatchSyncConflictDocument () {
						const item = mod._OLSKCatalog.modPublic._OLSKCatalogDataItemsAll().filter(function (e) {
							return e.SNPDocumentName.match('FakeZDRSchemaDispatchSyncConflictDocument');
						}).pop();
						
						return mod.ZDRSchemaDispatchSyncConflictDocument({
							origin: 'conflict',
							oldValue: JSON.parse(JSON.stringify(await mod._ValueZDRWrap.App.SNPDocument.SNPDocumentUpdate(Object.assign(Object.assign({}, item), {
								SNPDocumentName: item.SNPDocumentName + '-local',
							})))),
							newValue: JSON.parse(JSON.stringify(Object.assign(Object.assign({}, item), {
								SNPDocumentName: item.SNPDocumentName + '-remote',
							}))),
						});
					},
				},
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

		outputData.push(...OLSKServiceWorker.OLSKServiceWorkerRecipes(window, mod.DataNavigator(), OLSKLocalized, OLSK_SPEC_UI()));

		if (mod._SNPCollectDetail) {
			outputData.push(...mod._SNPCollectDetail.modPublic.SNPCollectDetailRecipes());
		}

		return outputData;
	},

	DataIsMobile () {
		return window.innerWidth <= 760;
	},

	DataStubDocumentObject (inputData = {}) {
		return Object.assign({
			SNPDocumentData: Math.random().toString(),
			SNPDocumentName: '',
			SNPDocumentType: SNPDocument.SNPDocumentTypeNote(),
		}, inputData);
	},

	// INTERFACE

	InterfaceAddButtonDidClick () {
		mod._SNPMakeModal.modPublic.OLSKModalViewShow();
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

	async ControlDocumentAdd (inputData) {
		mod.ControlDocumentActivate(mod._OLSKCatalog.modPublic._OLSKCatalogInsertAndSort(await mod._ValueZDRWrap.App.SNPDocument.SNPDocumentCreate(mod.DataStubDocumentObject(inputData))));
	},
	
	_ControlHotfixUpdateInPlace(inputData) {
		mod.ControlDocumentActivate(inputData);
		mod._SNPCollectDetail.modPublic._SNPCollectDetailTriggerUpdate();
	},
	
	ControlDocumentActivate(inputData) {
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

	ControlDocumentClone (inputData) {
		mod.ControlDocumentAdd(SNPCollectLogic.SNPCollectCloned(inputData));
	},
	
	ControlDocumentDiscard (inputData) {
		mod._OLSKCatalog.modPublic.OLSKCatalogRemove(inputData);

		mod._ValueZDRWrap.App.SNPDocument.ZDRModelDeleteObject(inputData);
	},

	// MESSAGE

	_OLSKCatalogDispatchKey (inputData) {
		return inputData.SNPDocumentID;
	},

	OLSKCollectionDispatchClick (inputData) {
		mod.ControlDocumentActivate(inputData);
	},

	OLSKCollectionDispatchArrow (inputData) {
		mod._OLSKCatalog.modPublic.OLSKCatalogSelect(inputData);
	},

	OLSKCatalogDispatchDetailActivate () {
		document.querySelector('.SNPCollectDetailToolbarBackButton').focus();
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
			LCHOptionRecipes: mod.DataCollectRecipes(),
			LCHOptionLanguage: window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage'),
		});
	},

	SNPFormDidSubmit (inputData) {
		mod._SNPMakeModal.modPublic.OLSKModalViewClose();

		mod.ControlDocumentAdd(inputData);
	},

	SNPCollectDetailDispatchBack () {
		mod._OLSKCatalog.modPublic.OLSKCatalogFocusMaster();
	},

	SNPCollectDetailDispatchUpdate () {
		mod.ControlDocumentSave(mod._OLSKCatalog.modPublic.OLSKCatalogUpdate(mod._OLSKCatalog.modPublic.OLSKCatalogDataItemSelected()));
	},

	SNPCollectDetailDispatchClone () {
		mod.ControlDocumentClone(mod._OLSKCatalog.modPublic.OLSKCatalogDataItemSelected());
	},

	SNPCollectDetailDispatchDiscard () {
		mod.ControlDocumentDiscard(mod._OLSKCatalog.modPublic.OLSKCatalogDataItemSelected());
	},

	SNPCollectDetailDispatchDisableEscape (inputData) {
		mod._OLSKCatalog.modPublic.OLSKCatalogDisableEscape = inputData;
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
		mod._ValueCloudErrorText = error.message;
	},

	ZDRParamDispatchWriteError (error) {
		window.alert(mod._OLSKAppToolbarErrorText = error.message);
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
			ZDRParamDispatchWriteError: mod.ZDRParamDispatchWriteError,
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
import SNPCollectListItem from '../sub-item/main.svelte';
import SNPCollectDetail from '../sub-detail/main.svelte';
import SNPMake from '../sub-make/main.svelte';
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

<div class="SNPCollect OLSKViewport OLSKDecorFormBlend" class:OLSKIsLoading={ mod._ValueIsLoading } class:OLSKIsDemoing={ mod._IsRunningDemo }>

<div class="OLSKViewportContent">

<OLSKCatalog
	bind:this={ mod._OLSKCatalog }

	OLSKCollectionItemAccessibilitySummaryFunction={ SNPCollectLogic.SNPCollectAccessibilitySummary }
	OLSKCollectionItemClass={ 'OLSKCommonEdgeBottom' }

	OLSKCatalogSortFunction={ SNPCollectLogic.SNPCollectSortFunction }
	OLSKCatalogIsMatch={ SNPCollectLogic.SNPCollectIsMatch }

	_OLSKCatalogDispatchKey={ mod._OLSKCatalogDispatchKey }

	OLSKCollectionDispatchClick={ mod.OLSKCollectionDispatchClick }
	OLSKCollectionDispatchArrow={ mod.OLSKCollectionDispatchArrow }
	OLSKCatalogDispatchDetailActivate={ mod.OLSKCatalogDispatchDetailActivate }
	OLSKCatalogDispatchQuantity={ mod.OLSKCatalogDispatchQuantity }

	let:OLSKCollectionItem
	>

	<!-- MASTER -->

	<div class="OLSKToolbarElementGroup" slot="OLSKNarrowToolbarTail">
		<button class="SNPCollectToggleFormButton OLSKDecorButtonNoStyle OLSKDecorTappable OLSKToolbarButton" title={ OLSKLocalized('SNPCollectToggleFormButtonText') } on:click={ mod.InterfaceAddButtonDidClick } accesskey="n">
			<div class="SNPCollectToggleFormButtonImage">{@html OLSKUIAssets._OLSKSharedCreate }</div>
		</button>
	</div>

	<!-- MASTER LIST ITEM -->

	<div slot="OLSKCollectionItem">
		<SNPCollectListItem SNPCollectListItemObject={ OLSKCollectionItem } />
	</div>

	<!-- DETAIL -->
	
	<div class="SNPCollectDetailContainer" slot="OLSKCatalogDetailContent" let:OLSKCatalogItemSelected>
		<SNPCollectDetail
			SNPCollectDetailItem={ OLSKCatalogItemSelected }
			SNPCollectDetailDispatchBack={ mod.SNPCollectDetailDispatchBack }
			SNPCollectDetailDispatchUpdate={ mod.SNPCollectDetailDispatchUpdate }
			SNPCollectDetailDispatchClone={ mod.SNPCollectDetailDispatchClone }
			SNPCollectDetailDispatchDiscard={ mod.SNPCollectDetailDispatchDiscard }
			SNPCollectDetailDispatchDisableEscape={ mod.SNPCollectDetailDispatchDisableEscape }
			bind:this={ mod._SNPCollectDetail }
			/>
	</div>

</OLSKCatalog>

</div>

<footer class="SNPCollectViewportFooter OLSKMobileViewFooter">

	{#if !mod._ValueCloudToolbarHidden }
		<div class="SNPCollectCloudToolbar OLSKToolbar OLSKToolbarJustify OLSKCommonEdgeTop">
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
		OLSKAppToolbarErrorText={ mod._OLSKAppToolbarErrorText }
		OLSKAppToolbarCloudConnected={ !!mod._ValueCloudIdentity }
		OLSKAppToolbarCloudOffline={ mod._ValueCloudIsOffline }
		OLSKAppToolbarCloudError={ !!mod._ValueCloudErrorText }
		OLSKAppToolbarDispatchCloud={ mod.OLSKAppToolbarDispatchCloud }
		OLSKAppToolbarDispatchLauncher={ mod.OLSKAppToolbarDispatchLauncher }
		/>

	<OLSKInstall />

	{#if !OLSK_SPEC_UI()}
		<OLSKServiceWorkerView OLSKServiceWorkerRegistrationRoute={ window.OLSKCanonical('SNPServiceWorkerRoute') } />
	{/if}
</footer>

</div>

<OLSKModalView OLSKModalViewTitleText={ OLSKLocalized('OLSKAproposHeadingText') } bind:this={ mod._OLSKModalView } OLSKModalViewIsCapped={ true }>
	<OLSKApropos
		OLSKAproposFeedbackValue={ `javascript:window.location.href = window.atob('${ window.btoa(OLSKString.OLSKStringFormatted(window.atob('OLSK_APROPOS_FEEDBACK_EMAIL_SWAP_TOKEN'), 'ROCO_SHARED_PROJECT_ID_SWAP_TOKEN')) }')` }
		/>
</OLSKModalView>

<OLSKModalView OLSKModalViewTitleText={ OLSKLocalized('SNPMakeHeadingText') } OLSKModalViewCloseText={ OLSKLocalized('OLSKWordingCancelText') } bind:this={ mod._SNPMakeModal }>
	<div>
		<SNPMake SNPFormDidSubmit={ mod.SNPFormDidSubmit } />
	</div>
</OLSKModalView>
