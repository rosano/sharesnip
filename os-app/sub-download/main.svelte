<script>
export let SNPDownloadData;
export let SNPDownloadBasename = '';

import { OLSKLocalized } from 'OLSKInternational';
import { OLSK_SPEC_UI } from 'OLSKSpec';
import OLSKTransport from 'OLSKTransport';
import kjua from 'kjua';

const mod = {

	// VALUE

	_ValueFormat: 'PNG',

	// DATA

	DataExtension () {
		return mod._ValueFormat.toLowerCase();
	},

	DataFilename () {
		return `${ SNPDownloadBasename || OLSKTransport.OLSKTransportExportBasename() }.${ mod.DataExtension() }`;
	},

	// INTERFACE

	InterfaceButtonDidClick () {
		mod.CommandDownload({
			SNPDownloadData,
			SNPDownloadFilename: mod.DataFilename(),
		});
	},

	// COMMAND

	CommandDownload (inputData) {
		if (OLSK_SPEC_UI()) {
			return window.alert(JSON.stringify(inputData));
		}

		const isCanvas = mod._ValueFormat === 'PNG';

		const element = kjua({
			render: isCanvas ? 'canvas' : 'svg',
			ecLevel: 'H',
			size: 1000,
			rounded: 100,
			quiet: 0,
			text: SNPDownloadData,
		});

		const temporaryLink = Object.assign(document.createElement( 'a' ), {
			download: inputData.SNPDownloadFilename,
			href: isCanvas ? element.toDataURL() : URL.createObjectURL(new Blob([element.outerHTML], {type: 'image/svg+xml'})),
		});
		
		document.body.appendChild(temporaryLink);
		temporaryLink.click();
		document.body.removeChild(temporaryLink);  
	}

};

import OLSKUIAssets from 'OLSKUIAssets';
</script>

<div class="SNPDownload">

<h2 class="SNPDownloadHeading">{ OLSKLocalized('SNPDownloadHeadingText') }</h2>

<input id="SNPDownloadPNGButton" type="radio" value="PNG" bind:group={ mod._ValueFormat } />
<label class="SNPDownloadPNGButton OLSKDecorTappable" for="SNPDownloadPNGButton">PNG</label>
<input id="SNPDownloadSVGButton" type="radio" value="SVG" bind:group={ mod._ValueFormat } />
<label class="SNPDownloadSVGButton OLSKDecorTappable" for="SNPDownloadSVGButton">SVG</label>

<button class="SNPDownloadButton" on:click={ mod.InterfaceButtonDidClick }>{ OLSKLocalized('OLSKWordingDownloadText') }</button>

</div>
