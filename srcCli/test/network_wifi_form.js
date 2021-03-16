
/*import NetworkWifiFormUI from './network_wifi_form_ui';
import URLS from '../srcServ/urls';
class NetworkWifiForm {

    constructor(parentEl, network) {
        const get_wifiList = this.getWifiList();
        get_wifiList.then((wifiList) => {
            this.wifiFormUI = new NetworkWifiFormUI(parentEl, network, wifiList);
            this.wifiFormUI.setOnEvent(this.onPageEvent.bind(this));
        });
        get_wifiList.catch((e) => {
            console.error(e);
        });
    }

    getWifiList() {
        return new Promise((resolve, reject) => {
            var get_wifiList = fetch(URLS.get_wifiList_ssids);
            get_wifiList.then(response => response.json()).then((wifiList) => {
                // console.log(wifiList);
                resolve(wifiList);
            })
            get_wifiList.catch((err) => {
                reject(err);
            });
        });
    }

    onPageEvent(action, data) {
        switch (action) {

        }
    }
}
export default NetworkWifiForm;*/