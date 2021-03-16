import URLS from '../srcServ/urls';
import NetworkPageUI from './network_page_ui';
import Page from './page';
import Result from './result';

class NetworkPage extends Page {

    constructor(parentEl, title, name) {
        super(parentEl, title, name);
        this.pageUI = new NetworkPageUI(parentEl, title, name);
        this.pageUI.setOnEvent(this.onPageEvent.bind(this));
        this.result = new Result(this.pageUI.container);
    }

    update() {
        this.pageUI.showLoading();
        this.pageUI.clearContent();
        const get_params = this.getNetworkParams();
        get_params.then((networkParams) => {
            this.pageUI.hideLoading();
            this.pageUI.update(networkParams);
        });
        get_params.catch((e) => {
            console.error(e);
        });
    }

    onPageEvent(action, data) {
        var get_result;
        switch (action) {
            case 'wifiList':
                var get_wifiList = this.getWifiList();
                get_wifiList.then((wifiList) => {
                    this.pageUI.setWifiListForm(wifiList);
                })
                get_wifiList.catch((error) => {
                    reject(error);
                });
                break;

            case 'refreshWifiList':
                var get_wifiList = this.getWifiList();
                get_wifiList.then((wifiList) => {
                    this.pageUI.updateWifiListForm(wifiList);
                })
                get_wifiList.catch((error) => {
                    reject(error);
                });
                break;

            case 'submit':
                //console.log(this.pageUI.container);
                this.result.clear();
                this.pageUI.showLoading();
                this.pageUI.clearContent();
                get_result = this.sendParams(data,URLS.update_network_config);
                get_result.then((response) => {
                    //  console.log(JSON.parse(response));
                    this.pageUI.hideLoading();
                    this.update();
                    this.result.update(response);
                    //console.log(this.result);
                })
                get_result.catch((err) => {
                    this.pageUI.hideLoading();
                    this.update();
                    this.result.update(err);
                });

                break;

            case 'enable':
                //console.log(data);
                this.result.clear();
                this.pageUI.showLoading();
                this.pageUI.clearContent();
                get_result = this.sendParams(data,URLS.activate_network);
                get_result.then((response) => {
                    //  console.log(JSON.parse(response));
                    this.pageUI.hideLoading();
                    this.update();
                    this.result.update(response);
                    //console.log(this.result);
                })
                get_result.catch((err) => {
                    this.pageUI.hideLoading();
                    this.update();
                    this.result.update(err);
                });
                break;

            case 'disable':
                // console.log(data);
                this.result.clear();
                this.pageUI.showLoading();
                this.pageUI.clearContent();
                get_result = this.sendParams(data,URLS.deactivate_network);
                get_result.then((response) => {
                    //  console.log(JSON.parse(response));
                    this.pageUI.hideLoading();
                    this.update();
                    this.result.update(response);
                    //console.log(this.result);
                })
                get_result.catch((err) => {
                    this.pageUI.hideLoading();
                    this.update();
                    this.result.update(err);
                });
                break;
        }
    }


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

    sendParams(params,url) {
        return new Promise((resolve, reject) => {
            var json = JSON.stringify(params);
            var xhr = new XMLHttpRequest;
            console.log(url);
            xhr.open("POST", url, true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onload = function () {
                var response = (xhr.responseText);
                if (xhr.readyState == 4 && xhr.status == "200") {
                    console.table(response);
                    resolve(response);
                } else {
                    console.error(response);
                    reject(response);
                }
            }

            xhr.send(json);
           /* setTimeout(function () {
                reject (new Error('modify configuration: fail'));
            }, 5000);*/
        })

    }


    /* getAllParams() {
         return new Promise((resolve, reject) => {
             const get_params = Promise.all([this.getNetworkParams(), this.getWifiList()]);
 
             get_params.then((res) => {
                 //console.log({ config: res[0], list: res[1] });
                 resolve({ config: res[0], list: res[1] });
             });
             get_params.catch((e) => {
                 reject(e);
             });
         });
     }
     

     */


}

export default NetworkPage;
