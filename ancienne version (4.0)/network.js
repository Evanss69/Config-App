//network.js
import URLS from '../srcServ/urls';
const Network = {

    init() {

    },

    onSubmit() {

    },

    update() {

    },

	getParams(namePage) {
        console.log(namePage);
        switch(namePage){

            case 'Network':
                return new Promise((resolve, reject) => {
                    const get_params = Promise.all([Network.getNetworkParams(), Network.getWifiList()]);
                    get_params.then((res) => {
                        resolve({ config: res[0], list: res[1] });
                    });
                    get_params.catch((e) => {
                        reject(e);
                    });
                })

                break;

            case 'Screen': 
                var get_screen_config = fetch(URLS.get_screen_config);
                get_screen_config
                    .then(response => response.json())
                    .then((resolutionList) => {
                        return (resolutionList);
                    })
                get_screen_config.catch((e) => {
                    console.error(e);
                });
                break;
           // case 'Bluetooth': xhr.open("POST", URLS.update_bluetooth, true);break;
            //case 'Sound': xhr.open("POST", URLS.update_audio_volume, true); break;
        }

    },

    /*
    getNetworkParams() {
        return new Promise((resolve, reject) => {
            var get_network_config = fetch(URLS.get_network_config);

            get_network_config
                .then(response => response.json())
                //.then((dataNetwork) => { resolve(dataNetwork); })
                .then(resolve);
            get_network_config.catch((err) => {
                reject(err);
            });
        });
    },

    getWifiList() {
        return new Promise((resolve, reject) => {
            var get_wifiList = fetch(URLS.get_wifiList_ssids);
            get_wifiList.then(response => response.json()).then((wifiList) => {
                console.log(wifiList);
                resolve(wifiList);
            })
            get_wifiList.catch((err) => {
                reject(err);
            });
        });
  
    },
    */

    sendParams(Page,params) {
        var json = JSON.stringify(params);
        var xhr = new XMLHttpRequest;
        switch(Page.name){
            case 'Network':  xhr.open("POST", URLS.update_network_config, true); break;
            case 'Screen':  xhr.open("POST", URLS.update_screen_config, true); break;
           // case 'Bluetooth': xhr.open("POST", URLS.update_bluetooth, true);break;
            //case 'Sound': xhr.open("POST", URLS.update_audio_volume, true); break;
        }
        
        //xhr.open("POST", URLS.update_network_config, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = function () {
            var response = (xhr.responseText);
            if (xhr.readyState == 4 && xhr.status == "200") {
                console.table(response);
                setTimeout(function () { window.location.reload() }, 15000);
            } else {
                console.error(response);
            }
        }

        xhr.send(json);
    },

}
module.exports=  Network;