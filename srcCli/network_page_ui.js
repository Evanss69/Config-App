import Button from './button';
// import Result from './result';
import UI from './ui';
import PageUI from './pageUI';
import NetworkWifiFormUI from './network_wifi_form_ui';

class NetworkPageUI extends PageUI {

    update(networkConfig) {
        this.rowData = {};
        this.show();
        this.createTable(this.content, networkConfig);
    }

    createTable(parentEl, networks) {
        this.table = UI.createElement('table', { width: '100%', paddingTop: '20px' }, parentEl);
        this.createRow('ethernet', networks['ethernet']);
        this.createRow('wifi', networks['wifi']);
        // networks.forEach((network) => {
        //     this.createRow(network, this.wifiList);
        // });
    }

    createRow(type, network) {
        // console.log(network);
        const rowEl = UI.createElement('tr', { marginBottom: '20px' }, this.table);
        const [ip_address, netmask] = (network.ip && network.ip.split('/')) || ['', ''];

        this.rowData[type] = {
            activate:{ label:'Activate/Deactivate', value: network.state,ip_param:false,el:undefined},
            method: { label: "DHCP", value: network.method, ip_param: false, el: undefined },
            ip: { label: "IP address", value: ip_address, ip_param: true, el: undefined },
            mask: { label: "Mask", value: "/" + netmask, ip_param: true, el: undefined },
            gateway: { label: "Gateway", value: network.gateway, ip_param: true, el: undefined },
            dns1: { label: "DNS1", value: network.dns1, ip_param: true, el: undefined },
            dns2: { label: "DNS2", value: network.dns2, ip_param: true, el: undefined },
        };

        this.createStatusCell(rowEl, network.device_state);
        this.createToggleActive(rowEl, type, network);
        this.createTypeCell(rowEl, type);
        this.createMethodCell(rowEl, type, network);
        this.createIPConfigCell(rowEl, type, network);
        // add buttons
        this.addBtSub(type, network, this.table);

        if (type == "wifi") {
            this.wifiForm = new NetworkWifiFormUI(this.table, network);
            this.wifiForm.setOnWifiEvent(this.onWifiEvent.bind(this));
            this.onEvent('wifiList');
        }
    }

    onSubmit(evt) {
        const type = evt.target.dataset['network_type'];
        const name = evt.target.dataset['network_name'];
        const device = evt.target.dataset['network_device'];
        const row_data = this.rowData[type];
        var data = {
            name: name,
            type: type,
            device: device,
            activate: row_data.activate.el.value== "activated" ? false : true,
   /*DHCP*/ method: row_data.method.el.checked == true ? 'auto' : 'manual',
            ip: row_data.ip.el.value,
            mask: row_data.mask.el.value,
            gateway: row_data.gateway.el.value,
            dns1: row_data.dns1.el.value,
            dns2: row_data.dns2.el.value
        }
        if (evt.target.dataset['network_type'] === 'wifi') {
            const wifiData = this.wifiForm.getData();
            if (!wifiData.SSID) {
                return alert('Choose a Wi-Fi network please');
            }else if(!wifiData.password){
                return alert('Enter password please');
            } 
            else {
                Object.assign(data, wifiData);
            }
            if (data.name == 'undefined') {
                data.name = data.SSID;
            }
        }
        console.log(data);
        this.onEvent('submit', data);
    }

    createStatusCell(rowEl, connectionState) {
        let content;
        content = connectionState == "connected" ? "&check;" : "&cross;";
        UI.createCell(rowEl, { content: content, value: connectionState });
    }

    createTypeCell(rowEl, connectionType) {
        UI.createCell(rowEl, { dataset: { type: connectionType }, content: connectionType, value: connectionType });
    }

    createMethodCell(rowEl, type, connection) {
        let dhcpEl = UI.createCell(rowEl, { content: 'DHCP' });
        const cb = UI.createCheckbox(dhcpEl, connection.method == "auto", this.onToggleMethod.bind(this));
        cb.dataset['network_type'] = type;
        this.rowData[type].method.el = cb;

    }

    onToggleMethod(evt) {
        const network_type = evt.target.dataset['network_type'];
        const btSub = document.getElementById('btSub_' + network_type);
        // si checkbox checked, alors faire disable sur les élements de IPConfigCell
        const cells = Object.values(this.rowData[network_type]);
        if (cells) {
            if (evt.target.checked) {
                cells.forEach((c) => {
                    if (c.label != 'DHCP' && c.label!='Activate/Deactivate') {
                        c.el.setAttribute("disabled", "disabled");
                        btSub.disabled = false;
                    } else { }
                })
            }
            else {
                cells.forEach((c) => {
                    if (c.label != 'DHCP' && c.label!='Activate/Deactivate') {
                        c.el.removeAttribute("disabled");
                    }
                })
            }
        }
    }

    createToggleActive(rowEl, type, connection) {
        const td = UI.createCell(rowEl, {});
        const button = UI.createElement('button', {}, td);
        button.innerHTML = connection.state == "activated" ? "Deactivate" : "Activate";
        button.value = connection.state == "activated" ? "deactivate" : "activate";
        button.dataset['activate'] = connection.state == "activated" ? "deactivate" : "activate";
        button.dataset['network_type'] = type;
        button.dataset['network_name'] = connection.name;
        button.dataset['network_device'] = connection.device;
        button.addEventListener('click', this.onToggleActive.bind(this));
        this.rowData[type].activate.el=button;
       // button.addEventListener('click', this.btChange)
    }

    onToggleActive(evt) {
        //console.log(evt.target)
        const btn = evt.target;
        const type = btn.dataset['network_type'];
        const name = btn.dataset['network_name'];
        const device = btn.dataset['network_device'];
        const activate = btn.value == "activated" ? false : true;
        const data = {
            name: name,
            type: type,
            device: device,
            activate: activate
        }
        if (type == 'wifi') {
            const wifiData = this.wifiForm.getData();
            // console.log(wifiData);
            if (!wifiData.SSID) {
                return alert('Choose a Wi-Fi network please');
            }else if(!wifiData.password){
                return alert('Enter password please');
            } 
            else {
                Object.assign(data, wifiData);
            }
            if (data.name == 'undefined') {
                data.name = data.SSID;
            }
        }
        //console.log(data);
        if (btn.dataset['activate'] == "activate") {
            Object.values(this.rowData[type]).forEach((c) => {
               if(c.label!='Activate/Deactivate'){c.el.parentElement.style.visibility = 'visible'} ;
            });
             console.log(data);
           // this.btChange(evt.target);
            this.onEvent('enable', data);
        } else {
            Object.values(this.rowData[type]).forEach((c) => {
                if(c.label!='Activate/Deactivate') {c.el.parentElement.style.visibility = 'hidden'} ;
            });
            console.log(data);
            this.onEvent('disable', data);
        }
       // this.btChange(evt.target);
    }

   /* btChange(bt) {
        //console.log(bt.target);
        const value = bt.value;
        bt.innerHTML = value == 'deactivate' ? 'Activate' : 'Deactivate';
        bt.value = value == 'deactivate' ? 'activate' : 'deactivate';
        bt.dataset['activate'] = value == 'deactivate' ? 'activate' : 'deactivate';
        return bt;
    }*/

    createIPConfigCell(rowEl, type, connection) {
        Object.values(this.rowData[type]).forEach((c) => {
            if (c.ip_param) {
                const td = UI.createCell(rowEl, { content: c.label, style: { fontWeight: 'bold' } });
                c.el = this.createNetworkParamInput(td, type, { value: c.value, connectionState: connection.state });
                if (c.label != 'Mask') {
                    c.el.pattern = '^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$';

                } else {
                    c.el.pattern = '^(\/([0-9]|[1-2][0-9]|3[0-2]))?$';
                }
            } else {
                if (connection.state != 'activated'&& c.label!='Activate/Deactivate') {
                    c.el.parentElement.style.visibility = 'hidden';
                }
            }
        });
    }

    /*enableIPConfig() {
    }

    disableIPConfig() {
    }*/

    createNetworkParamInput(parentEl, type, opts = {}) {
        let el = UI.createElement('input', { width: '125px' }, parentEl);
        el.dataset['type'] = type;
        //console.log(this.rowData[type].method.value);
        if (this.rowData[type].method.value == 'auto') {
            el.disabled = true;
        } else {
            el.disabled = false;
        }
        el.maxLength = 15;
        el.placeholder = '*.*.*.*';
        if (opts.value) el.defaultValue = opts.value;
        if (opts.connectionState != 'activated') el.parentElement.style.visibility = 'hidden';
        el.addEventListener('change', this.validInput.bind(this));
        return el;
    }

    validInput(evt) {
        const type = evt.target.dataset['type'];
        const btSub = document.getElementById('btSub_' + type);
        if (evt.target.validity.patternMismatch == true) {
            if (evt.target.parentElement.textContent != 'Mask') {
                evt.target.setCustomValidity('Range 0-255, 4 octet , max 32 bits, exemple: 172.16.254.6');
            } else {
                evt.target.setCustomValidity('Use CIDR notation');
            }
            btSub.disabled = true;
        } else {
            evt.target.setCustomValidity('');
            btSub.disabled = false;;
        }
    }

    addBtSub(type, network, parentEl) {
        let underRow = UI.createElement('tr', {}, parentEl);
        UI.createCell(underRow);
        let btSubEl = UI.createCell(underRow);
        let btnSubmitNet = new Button('Submit', btSubEl);
        btnSubmitNet.el.dataset['network_type'] = type;
        btnSubmitNet.el.dataset['network_name'] = network.name;
        btnSubmitNet.el.dataset['network_device'] = network.device;
        btnSubmitNet.el.id = 'btSub_' + type;
        btnSubmitNet.onClick(this.onSubmit.bind(this));
      //  console.log(network.device_state);
        if (network.device_state=='disconnected'||network.device_state=='unmanaged') btnSubmitNet.el.disabled=true;
        // return btnSubmitNet;
    }

    onWifiEvent(action, data) {
        switch (action) {
            case 'refreshList':
                this.onEvent('refreshWifiList');
            break;
        }
    }

    setWifiListForm(wifiList) {
        this.wifiForm.update(wifiList);
    }

    updateWifiListForm(wifiList) {
        this.wifiForm.refreshWifiList(wifiList);
    }
}
export default NetworkPageUI;