import  UI  from './ui';
import NetworkFormUtil from './networkFormUtil';
import Button from './button';
import Result from './result';
import { refreshWifiList, showWifiList } from './wifiListUtil';
class NetworkTableFormUI {

  constructor(def, wifiList, parentEl) {
    this.def = def;
    var wifiState = this.def[1].state;
    this.wifiList = wifiList;
    this.inputs = [];
    this.createTable(parentEl);
    this.btnShowWifiList = new Button('Show_Wifi_List', parentEl, wifiState, 'btnWifiList');
    this.btnShowWifiList.onClick(showWifiList);
    this.btnResetList = new Button('Reset_Wifi_List', parentEl, wifiState, 'btnWifiList');
    this.btnResetList.onClick(refreshWifiList);
    this.resultNetForm = new Result('resultNetForm', parentEl);

  }

  createTable(parentEl) {
    this.table = UI.createElement('table', { width: '100%', paddingTop: '20px' }, parentEl);
    let rowIndex = 0;
    this.def.forEach((dataConfigNetwork, r) => {
      //r<2 because loopback unmanaged and device wifi 2 not used
      if (r < 2) {
        var connectionType = dataConfigNetwork.type;
        this.createRow(rowIndex, connectionType, dataConfigNetwork, this.wifiList);
        rowIndex++;
      }
    });

  }

  createRow(id, connectionType, dataConfigNetwork, wifiList) {

    const rowEl = UI.createElement('tr', { marginBottom: '20px' }, this.table);
    this.inputs.push([]);
    var content;
    var isConnected = NetworkFormUtil.transformBooleanNetworkState(dataConfigNetwork.state);
    if (isConnected === null) {
      content = "?";
    } else if (content = isConnected ? "&check;" : "&cross;");


    dataConfigNetwork.ip = (dataConfigNetwork.ip && dataConfigNetwork.ip.split('/')) || '';
    if (dataConfigNetwork.ip != '') dataConfigNetwork.ip[1] = '/' + dataConfigNetwork.ip[1];

    const info = ([
      {
        cols: [{ type: 'td', content: "IP address", value: dataConfigNetwork.ip[0], dataset: { ip: dataConfigNetwork.ip[0] } },
        { type: 'td', content: "Mask", value: dataConfigNetwork.ip[1], dataset: { mask: dataConfigNetwork.ip[1] } },
        { type: 'td', content: "Gateway", value: dataConfigNetwork.gateway, dataset: { gateway: dataConfigNetwork.gateway } },
        { type: 'td', content: "DNS1", value: dataConfigNetwork.dns1, dataset: { dns1: dataConfigNetwork.dns1 } },
        { type: 'td', content: "DNS2", value: dataConfigNetwork.dns2, dataset: { dns2: dataConfigNetwork.dns2 } },
        ]
      }
    ]);

    this.createCell(rowEl, this.inputs[id], { content: content, value: dataConfigNetwork.state });

    this.createCell(rowEl, this.inputs[id], { dataset: { type: connectionType }, content: connectionType, value: connectionType });

    let activateEl = this.createCell(rowEl, this.inputs[id], { content: 'Activate' });


    let dhcpEl = this.createCell(rowEl, this.inputs[id], { content: 'DHCP' });
    this.createDhcpCheckbox(dhcpEl, connectionType, this.inputs[id], id);

    info[0].cols.forEach((td) => {
      var dataName = Object.entries(td.dataset)[0][0];
      var dataValue = Object.entries(td.dataset)[0][1];
      let el = this.createCell(rowEl, this.inputs[id], { content: td.content, style: { fontWeight: 'bold' } });
      this.createNetworkParamInput(el, connectionType, this.inputs[id], id, { value: td.value, dataset: { restrict: 'inputRestrict' + id, dataName: dataName, dataValue: dataValue } });
    });

    if (rowEl.children[1].value == 'wifi') {

      const rowElWifi = UI.createElement('tr', {}, this.table);

      const displayCell = this.createCell(rowElWifi, this.inputs[id]);

      let wifiListEl = this.createCell(rowElWifi, this.inputs[id], { content: 'SSID', hidden: true, className: 'WifiList', style: { fontWeight: 'bold', } });//paddingRight: '50%'
      this.createWifiList(wifiListEl, connectionType, dataConfigNetwork.name, wifiList, this.inputs[id], NetworkFormUtil.wifiSelected.bind(this));


      let wifiPasswordEl = this.createCell(rowElWifi, this.inputs[id], { content: 'Password', hidden: true, className: 'WifiList', style: { fontWeight: 'bold', } });//paddingRight: '50%'
      this.createPassword(wifiPasswordEl, connectionType, this.inputs[id]);

      let showPasswordEl = this.createCell(rowElWifi, this.inputs[id], { content: 'Show password', hidden: true, className: 'WifiList', style: { fontWeight: 'normal' } });
      let showPasswordBox = UI.createElement('input', {}, showPasswordEl);
      showPasswordBox.type = 'checkbox';
      showPasswordBox.addEventListener('click', () => {
        var x = document.getElementById("myPasswordBox");
        if (x.type === "password") {
          x.type = "text";
        } else {
          x.type = "password";
        }
      });
    }

    let underRow = UI.createElement('tr', {}, this.table);
    const displayCell = this.createCell(underRow, this.inputs[id]);
    let btSubEl = this.createCell(underRow, this.inputs[id]);
    let btnSubmitNet = new Button('Submit', btSubEl, {}, 'Submit_network_params', id);
    btnSubmitNet.onClick(NetworkFormUtil.loadParams.bind(this));

    this.createActiveBox(activateEl, connectionType, this.inputs[id], id, { state: dataConfigNetwork.state });

  }

  createCell(rowEl, inputs, opts = {}) {
    let el = UI.createElement('td', {}, rowEl);
    // el.style.paddingTop='10px';
    if (opts.dataset) {
      Object.entries(opts.dataset).forEach((kv) => {
        el.dataset[kv[0]] = kv[1];
      });
    }
    if (opts.content) el.innerHTML = opts.content;
    if (opts.value) el.value = opts.value;
    if (opts.hidden) el.hidden = opts.hidden;
    if (opts.className) el.className = opts.className;
    if (opts.name) el.name = opts.name;
    if (opts.style) {
      Object.entries(opts.style).forEach((kv) => {
        el.style[kv[0]] = kv[1];
      });
    }
    return el;
  }

  createWifiList(parentEl, type, name, list, inputs, onChange) {
    let inputWifiList = UI.createElement('input', { width: '125px' }, parentEl);
    inputWifiList.name = 'inputWifiList';
    inputWifiList.setAttribute('list', 'wifiList');
    inputWifiList.value = name;
    let wifiList = UI.createElement('datalist', {}, parentEl);
    wifiList.id = 'wifiList';
    wifiList.dataset['type'] = type;
    wifiList.addEventListener('change', onChange);
    list.forEach((value) => {
      let opt = UI.createElement('option', {}, wifiList);
      opt.text = value;
      opt.value = value;
    });
    let hiddenWifi = UI.createElement('option', {}, wifiList);
    hiddenWifi.text = 'name your hidden wifi';
    inputs.push(inputWifiList);
    return wifiList;
  }

  createNetworkParamInput(parentEl, type, inputs, id, opts = {}) {
    let el = UI.createElement('input', { width: '125px' }, parentEl);
    inputs.push(el);
    el.dataset['type'] = type;
    el.disabled = 'true';
    el.maxLength = 15;
    el.placeholder = '*.*.*.*';
    if (id == 0) { el.name = 'ethernet' } else { el.name = 'wifi' };
    if (opts.value) el.defaultValue = opts.value;
    if (opts.dataset.restrict) el.className = opts.dataset.restrict;
    if (opts.dataset.dataName && opts.dataset.dataValue) el.dataset[opts.dataset.dataName] = opts.dataset.dataValue;
    el.addEventListener('change', NetworkFormUtil.validInput);
  }

  createDhcpCheckbox(parentEl, type, inputs, id, opts = {}) {
    let dhcpBox = UI.createElement('input', {}, parentEl);
    inputs.push(dhcpBox);
    dhcpBox.dataset['type'] = type;
    dhcpBox.type = 'checkbox';
    dhcpBox.defaultChecked = true;
    dhcpBox.id = id;
    if (id == 0) { dhcpBox.name = 'ethernet' } else { dhcpBox.name = 'wifi' };
    dhcpBox.addEventListener('change', NetworkFormUtil.disableNetworkBox);
  }

  createActiveBox(parentEl, type, inputs, id, opts = {}) {

    let activeBox = UI.createElement('input', {}, parentEl);
    activeBox.dataset['type'] = type;
    activeBox.type = 'checkbox';
    activeBox.name = 'active' + id;
    if (opts.state == '100 (connected)') {
      activeBox.checked = true; activeBox.defaultChecked = true; NetworkFormUtil.displayNetworkBox(activeBox);
    } else {
      activeBox.checked = false; activeBox.defaultChecked = false; NetworkFormUtil.displayNetworkBox(activeBox);
    }

    activeBox.addEventListener('change', NetworkFormUtil.activeConnection.bind(this));
    if (type == 'wifi') activeBox.addEventListener('click', showWifiList);

  }
   createPassword(parentEl, type, inputs) {
    let passwordBox = UI.createElement('input', { width: '125px' }, parentEl)
    inputs.push(passwordBox);
    passwordBox.type = 'password';
    passwordBox.id = 'myPasswordBox';
    passwordBox.dataset['type'] = type;
    //passwordBox.hidden=true;
  
  }

  getParams() {
    //console.log(this.inputs);
    return NetworkFormUtil.getParams(this.inputs);
  }
  sendParams(params) {
    NetworkFormUtil.sendParams(params);
  }
}

export default NetworkTableFormUI;