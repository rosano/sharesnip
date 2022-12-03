<script>
export let SNPDownloadData;
export let SNPDownloadBasename = '';

import { OLSKLocalized } from 'OLSKInternational';
import { OLSK_SPEC_UI } from 'OLSKSpec';
import OLSKTransport from 'OLSKTransport';
import kjua from 'kjua';

const mod = {

	// DATA

	DataExtension () {
		return 'png';
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

		const temporaryLink = Object.assign(document.createElement( 'a' ), {
			download: inputData.SNPDownloadFilename,
			href: kjua({
				render: 'canvas',
				ecLevel: 'H',
				size: 1000,
				rounded: 100,
				text: SNPDownloadData,
			}).toDataURL(),  
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

<button class="SNPDownloadButton" on:click={ mod.InterfaceButtonDidClick }>{ OLSKLocalized('OLSKWordingDownloadText') }</button>

</div>
