const Shell = require('child_process');

const Network = {
    getConnectionList() {
        return new Promise((resolve, reject) => {
            let connectionList = [];
            const searchReq = "nmcli -mode tabular -g name con show";
            Shell.exec(searchReq, (err, stdout, stderr) => {
                if (err) {
                    reject(err);
                } else {
                    connectionList = stdout.split('\n').filter(l => !!l);
                    resolve(connectionList);
                }
            })
        })
    },

    updateConfig(dataConfig, connectionList) {
        if (dataConfig[0].type == 'ethernet') {
            var dataConfigEthernet = dataConfig[0];
            this.ethernetConfig(dataConfigEthernet, connectionList);
        } else {
            var dataConfigWifi = dataConfig[0];
            this.wifiConfig(dataConfigWifi, connectionList);
        }
        /*console.log(dataConfig[0].type);
        var dataConfigEthernet = dataConfig[0];
        if (dataConfig[1]) {
            var dataConfigWifi = dataConfig[1];      
            this.wifiConfig(dataConfigWifi, connectionList);  
        }else if(dataConfig !=null){
            this.ethernetConfig(dataConfigEthernet, connectionList);
        }        */
    },

    wifiConfig(dataConfigWifi, connectionList) {
        var activRequest = `nmcli radio wifi on`;
        var stopRequest = `nmcli radio wifi off`;
        if (dataConfigWifi.activate == true) {
            Shell.execSync(activRequest);
        } else if (dataConfigWifi.activate == false) {
            Shell.execSync(stopRequest);
        }

        if (dataConfigWifi && dataConfigWifi.activate == undefined) {
            var addRequest = `nmcli con add type wifi con-name ${dataConfigWifi.SSID}  ssid ${dataConfigWifi.SSID}`;
            var modifyRequest = `nmcli con mod ${dataConfigWifi.SSID}`;
            var connectRequest = `nmcli -p device wifi connect ${dataConfigWifi.SSID} password ${dataConfigWifi.password}`;
            var reloadRequest = `nmcli -p con down ${dataConfigWifi.SSID};nmcli -p con up ${dataConfigWifi.SSID}`;
            if (this.checkExistingConnection(connectionList, dataConfigWifi.SSID) == true) {
                if (dataConfigWifi.DHCP) {
                    modifyRequest = `${modifyRequest} ipv4.method auto ipv6.method disable autoconnect on ipv4.addr "" ipv4.gateway "" ipv4.dns ""`;
                    Shell.execSync(modifyRequest);
                    Shell.execSync(connectRequest);
                } else {
                    modifyRequest = `${modifyRequest} ipv4.method manual ipv6.method disable autoconnect on ipv4.addr ${dataConfigWifi.IP}${dataConfigWifi.mask}`;
                    modifyRequest = `${modifyRequest} ipv4.gateway ${dataConfigWifi.gateway} ipv4.dns ${dataConfigWifi.dns1}`;
                    if (dataConfigWifi.dns2) {
                        modifyRequest = `${modifyRequest} +ipv4.dns ${dataConfigWifi.dns2}`;
                    }
                    Shell.execSync(modifyRequest);
                    Shell.execSync(connectRequest);
                }
            } else {
                connectRequest = `${connectRequest} hidden yes`;
                if (dataConfigWifi.DHCP) {
                    modifyRequest = `${modifyRequest} ipv4.method auto ipv6.method disable autoconnect on `;
                    Shell.execSync(addRequest);
                    Shell.execSync(modifyRequest);
                    Shell.execSync(connectRequest);
                } else {
                    modifyRequest = `${modifyRequest} ipv4.method manual ipv6.method disable autoconnect on  ipv4.addr ${dataConfigWifi.IP}${dataConfigWifi.mask}`;
                    modifyRequest = `${modifyRequest} ipv4.gateway ${dataConfigWifi.gateway} ipv4.dns ${dataConfigWifi.dns1}`;
                    if (dataConfigWifi.dns2) {
                        modifyRequest = `${modifyRequest} +ipv4.dns ${dataConfigWifi.dns2}`;
                    }
                    Shell.execSync(addRequest);
                    Shell.execSync(modifyRequest);
                    Shell.execSync(connectRequest);
                }
            }
            Shell.execSync(reloadRequest);
        }
    },

    ethernetConfig(dataConfigEthernet, connectionList) {
        var addRequest = `nmcli con add type ethernet con-name ethernet  autoconnect on`;
        var modifyRequest = `nmcli con mod ethernet ipv4.gateway ${dataConfigEthernet.gateway} ipv4.dns ${dataConfigEthernet.dns1}`;
        var activRequest = `nmcli -p con up ethernet`;
        var stopRequest = `nmcli -p con down ethernet`;
        if (dataConfigEthernet.dns2) {
            modifyRequest = `${modifyRequest} +ipv4.dns ${dataConfigEthernet.dns2}`;
        }

        if (dataConfigEthernet.activate == true) {
            Shell.execSync(activRequest);
        } else if (dataConfigEthernet.activate == false) {
            Shell.execSync(stopRequest);
        }
        if (dataConfigEthernet && dataConfigEthernet.activate == undefined) {
            if (this.checkExistingConnection(connectionList, dataConfigEthernet.type) == true) {

                if (dataConfigEthernet.DHCP) {
                    var req = `nmcli con mod  ethernet  autoconnect on ipv6.method disable ipv4.method auto ipv4.addr "" ipv4.gateway "" ipv4.dns ""`;
                    Shell.execSync(req);
                } else {
                    var req = `nmcli con mod  ethernet  autoconnect on ipv6.method disable ipv4.method manual ipv4.addr ${dataConfigEthernet.IP}${dataConfigEthernet.mask} `;
                    Shell.execSync(req);
                    Shell.execSync(modifyRequest);
                }
            } else {
                if (dataConfigEthernet.DHCP) {
                    addRequest = `${addRequest} ipv6.method disable ipv4.method auto`;
                    Shell.execSync(addRequest);
                } else {
                    addRequest = `${addRequest} ipv6.method disable ipv4.method manual ipv4.addr ${dataConfigEthernet.IP}${dataConfigEthernet.mask}`;
                    Shell.execSync(addRequest);
                    Shell.execSync(modifyRequest);
                }
            }
            Shell.execSync(activRequest);
            Shell.execSync(stopRequest);
            Shell.execSync(activRequest);
        }
    },

    checkExistingConnection(connectionList, name) {
        var result = false;
        for (i = 0; i < connectionList.length; i++) {
            if (connectionList[i] == name) return result = true;
        }
        return result;
    },

}
module.exports = Network;