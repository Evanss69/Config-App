import URLS from '../srcServ/urls';
import ScreenTableFormUI from './screenFormUI';
import NetworkTableFormUI from './networkFormUI';
import Button from './button';
import Result from './result';

/*
const AppUtil = {

	onClickBtSubScreen() {

		const screen_config_params = this.scrnForm.getParams();
		//this.resultScrnForm.update(JSON.stringify(screen_config_params));
		this.resultScrnForm.update(JSON.stringify(screen_config_params));
		this.scrnForm.sendParams(screen_config_params);
	},
	


}
const Networkpage={
	init(networkPage){
		var networkPage=createMenuPage(this.globalBox, 'Network Configuration', 'network');
		var get_network_config = fetch(URLS.get_network_config);
		get_network_config
		.then(response => response.json())
		.then((dataConfigNetwork)=>{
			 var get_wifiList = fetch(URLS.get_wifiList_ssids);
                    get_wifiList.then(response => response.json()).then((wifiList) => {
                        //console.log(this.netForm)
                    //	var netForm = new NetworkTableFormUI(dataNetwork, wifiList, networkPage.content);
                        //networkPage.content = 
                    //	return (networkPage);
                    })
                    get_wifiList.catch((e) => {
                        console.error(e);
                    });
                }
                )
            get_network_config.catch((e) => {
                console.error(e);
            }); 
		})
	}
}

const ScreenPage = {
	init(screenPage) {

		//var screenPage = createMenuPage(this.globalBox, 'Screen Resolution Configuration', 'screen');
		var get_screen_config = fetch(URLS.get_screen_config);
		get_screen_config
			.then(response => response.json())
			.then((resolutionList) => {
				let scrnForm = new ScreenTableFormUI(resolutionList, screenPage.content);
				scrnForm.setOnClick(ScreenPage.onSubmit);
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
		var resultScrnForm = new Result('resultScrnForm', screenPage.menuItem);
		return(screenPage);
	},

	onSubmit() {

		AppUtil.onClickBtSubScreen();
	}
}
module.exports = AppUtil;*/