import UI from './ui';
import Button from './button';
import dataList from './datalist';
//import NetworkWifiForm from './network_wifi_form';

class NetworkWifiFormUI {

    constructor(parentEl, network) {
        this.parentEl = parentEl;
        this.network = network;
        this.list;
        this.rowWifiData = {
            ssid: { label: "SSID", value: this.network.ssid, ip_param: true, el: undefined },
            password: { label: "Password", value: null, ip_param: true, el: undefined },
            show_password: { label: "Show password", value: null, ip_param: false, el: undefined },
        }
        this.createWifiConfigCell(this.parentEl.lastChild);
        this.addBtWifiList(this.parentEl);
    }

    update(wifiList) {
        //console.log(this.inputWifiList)
        this.list = new dataList(this.inputWifiList.parentElement, this.inputWifiList.attributes.list, wifiList, this.wifiSelected.bind(this));

    }

    createWifiConfigCell(tableEl) {
        Object.values(this.rowWifiData).forEach((c) => {
            if (c.ip_param) {
                const td = UI.createCell(tableEl, { content: c.label, style: { fontWeight: 'bold' } });
                switch (c.label) {
                    case 'SSID':
                        c.el = this.createWifiList(td, c.value);
                        break;

                    case 'Password':
                        c.el = UI.createPassword(td);
                        break;
                }
            } else {
                const td = UI.createCell(tableEl, {});
                c.el = UI.createCheckbox(td, '', this.showPassword.bind(this));
                this.createLabel(td, c.el, c.label)
            }
        });
    }

    createWifiList(parentEl, ssid) {
        this.inputWifiList = UI.createElement('input', { width: '125px' }, parentEl);
        this.inputWifiList.setAttribute('list', 'wifiList');
        //this.inputWifiList.id='wifiList';
        if (ssid) { this.inputWifiList.value = ssid; }
        return this.inputWifiList;
    }

    createLabel(parentEl, el, content) {
        const label = UI.createElement('label', {}, parentEl)
        label.for = el;
        label.textContent = content;
    }

    addBtWifiList(parentEl) {
        const rowElBtWifi = UI.createElement('tr', {}, parentEl);
        UI.createCell(rowElBtWifi);
        const cellBTShow = UI.createCell(rowElBtWifi);
        this.btnShowWifiList = new Button('Show_Wifi_List', cellBTShow);
        this.btnShowWifiList.onClick(this.showWifiList.bind(this));
        const cellBtReset = UI.createCell(rowElBtWifi);
        this.btnResetList = new Button('Refresh_Wifi_List', cellBtReset);
        this.btnResetList.onClick(this.onRefresh.bind(this));
    }
    showPassword() {
        if (this.rowWifiData.password.el.type === "password") {
            this.rowWifiData.password.el.type = "text";
        } else {
            this.rowWifiData.password.el.type = "password";
        }
    }
    showWifiList() {
        Object.values(this.rowWifiData).forEach((c) => {
            //  console.log(c);
            c.el.parentElement.hidden = c.el.parentElement.hidden != true ? true : false;
        });
    }
    onRefresh(){
        this.onEvent('refreshList');
    }
    refreshWifiList(wifiList) {
        //demander la liste des réseaux wifi
        //console.log(this.list.el);
       // this.onEvent('refreshList');
        this.list.modifyList(this.list.el, wifiList);

    }


    wifiSelected(evt) {
        //console.log(evt.target.value);
    }
    getData(){
        var data = {
            SSID : this.rowWifiData.ssid.el.value ,
            password: this.rowWifiData.password.el.value ,
        }
        return data
    }

    setOnWifiEvent(fn) {
        this.onEventFn = fn;
    }

    onEvent(action, data) {
        if (this.onEventFn) this.onEventFn(action, data);
    }
}
export default NetworkWifiFormUI;