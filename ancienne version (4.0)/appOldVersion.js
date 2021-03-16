
/*	old version
let globalBox = createElement('div', {
		width: '100%',
		display: 'inline',
	}, body);*/
		//var networkPage = createMenuPage(globalBox, 'Network Configuration', 'network');
/*var emptyWifiList = [];
var get_network_config = fetch(URLS.get_network_config);
get_network_config
	.then(response => response.json())
	.then((dataNetwork) => {
		if (dataNetwork[1].state == '20 (unavailable)') {
			App.netForm = new NetworkTableFormUI(dataNetwork, emptyWifiList, networkPage.content);
			var get_wifiList = fetch(URLS.get_wifiList_ssids);
			get_wifiList.then(response => response.json()).then((wifiList) => {
				refreshWifiList(wifiList);
			})
			get_wifiList.catch((e) => {
				console.error(e);
			});
		} else {
			var get_wifiList = fetch(URLS.get_wifiList_ssids);
			get_wifiList.then(response => response.json()).then((wifiList) => {

				App.netForm = new NetworkTableFormUI(dataNetwork, wifiList, networkPage.content);
			})
			get_wifiList.catch((e) => {
				console.error(e);
			});
		}
	})
get_network_config.catch((e) => {
	console.error(e);
});*/

		//var screenPage = createMenuPage(globalBox, 'Screen Resolution Configuration', 'screen');
/*var get_screen_config = fetch(URLS.get_screen_config);
get_screen_config
	.then(response => response.json())
	.then((resolutionList) => {
		App.scrnForm = new ScreenTableFormUI(resolutionList, screenPage.content);
		App.scrnForm.setOnClick(AppUtil.onClickBtSubScreen.bind(this));
	})
get_screen_config.catch((e) => {
	console.error(e);
});
const btnHideShowScrn = new Button('Hide/Show', screenPage.menuItem);
btnHideShowScrn.onClick(() => {
	screenPage.content.style.visibility = screenPage.content.style.visibility != 'visible' ? 'visible' : 'hidden';
});

const btnResetScrn = new Button('Reset', screenPage.menuItem);
btnResetScrn.onClick(() => {
	window.location.reload();
})


App.resultScrnForm = new Result('resultScrnForm', screenPage.menuItem);

*/