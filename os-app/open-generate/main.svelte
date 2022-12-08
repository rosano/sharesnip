<script>
import { OLSKLocalized } from 'OLSKInternational';
import { OLSK_SPEC_UI } from 'OLSKSpec';

import OLSKLanguageSwitcher from 'OLSKLanguageSwitcher';
import OLSKServiceWorker from 'OLSKServiceWorker';

const mod = {

	// VALUE

	_ValueIsValid: false,

	// DATA

	DataGenerateRecipes () {
		const outputData = [];

		outputData.push(...OLSKServiceWorker.OLSKServiceWorkerRecipes(window, mod.DataNavigator(), OLSKLocalized, OLSK_SPEC_UI()));

		return outputData;
	},

	DataNavigator () {
		return navigator.serviceWorker ? navigator : {
			serviceWorker: {},
		};
	},

	DataIsMobile () {
		return window.innerWidth <= 760;
	},

	// MESSAGE

	SNPFormNotValid () {
		mod._ValueIsValid = false;
	},

	SNPFormValid (inputData) {
		mod._ValueIsValid = true;

		mod._ValueData = inputData.SNPDocumentData;
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

	OLSKAppToolbarDispatchLauncher () {
		if (window.Launchlet.LCHSingletonExists()) {
			return window.Launchlet.LCHSingletonDestroy();
		}

		window.Launchlet.LCHSingletonCreate({
			LCHOptionRecipes: mod.DataGenerateRecipes(),
			LCHOptionLanguage: window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage'),
		});
	},

};

import SNPMake from '../sub-make/main.svelte';
import SNPDownload from '../sub-download/main.svelte';
import OLSKAppToolbar from 'OLSKAppToolbar';
import OLSKServiceWorkerView from '../../node_modules/OLSKServiceWorker/main.svelte';
import OLSKInstall from 'OLSKInstall';
import OLSKModalView from 'OLSKModalView';
import OLSKApropos from 'OLSKApropos';
import OLSKString from 'OLSKString';
</script>

<div class="SNPGenerate OLSKViewport">

<div class="OLSKViewportContent OLSKDecor">
	
<SNPMake SNPFormNotValid={ mod.SNPFormNotValid } SNPFormValid={ mod.SNPFormValid } />

{#if mod._ValueIsValid }

<hr />

<SNPDownload SNPDownloadData={ mod._ValueData } />
	
{/if}

</div>

<footer class="SNPGenerateViewportFooter OLSKMobileViewFooter">

<OLSKAppToolbar
	OLSKAppToolbarDispatchApropos={ mod.OLSKAppToolbarDispatchApropos }
	OLSKAppToolbarDispatchTongue={ mod.OLSKAppToolbarDispatchTongue }
	OLSKAppToolbarDispatchLauncher={ mod.OLSKAppToolbarDispatchLauncher }
	/>

<OLSKInstall />

{#if !OLSK_SPEC_UI()}
	<OLSKServiceWorkerView OLSKServiceWorkerRegistrationRoute={ window.OLSKCanonical('SNPGenerateServiceWorkerRoute') } />
{/if}

</footer>

<OLSKModalView OLSKModalViewTitleText={ OLSKLocalized('OLSKAproposHeadingText') } bind:this={ mod._OLSKModalView } OLSKModalViewIsCapped={ true }>
	<OLSKApropos
		OLSKAproposFeedbackValue={ `javascript:window.location.href = window.atob('${ window.btoa(OLSKString.OLSKStringFormatted(window.atob('OLSK_APROPOS_FEEDBACK_EMAIL_SWAP_TOKEN'), 'ROCO_SHARED_PROJECT_ID_SWAP_TOKEN')) }')` }
		/>
</OLSKModalView>

</div>
