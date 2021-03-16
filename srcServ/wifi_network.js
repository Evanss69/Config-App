const Shell = require('child_process');
//const ShellNmcl = require('child_process');
//const Network = require('./network');
const Util = require('./util');
const WifiNetwork = {

    init() {

    },

    getWifiList() {
        return new Promise((resolve, reject) => {
            Shell.exec('nmcli -f SSID device wifi list ', (err, stdout, stderr) => {
                if (err) {
                    reject(err);
                } else { //parsage
                    var tab = [];
                    tab = stdout.split('\n');
                    var wifiList = [];
                    for (i = 1; i < tab.length - 1; i++) {
                        wifiList[i - 1] = tab[i].trim();
                    }
                    resolve(wifiList);
                }
            });
        });
    },

    activateConnection(dataConfigWifi) {
        return new Promise((resolve, reject) => {
            var connectRequest = `nmcli -ask device wifi connect ${dataConfigWifi.SSID} password ${dataConfigWifi.password}`;
            if (dataConfigWifi.activate == true) {
                Shell.exec(connectRequest, (err, stdout, stderr) => {
                    console.log('stdout:  ');
                    if (err) {
                        console.log('il y a eu erreur');
                        reject(err);
                    }
                    else {
                        console.log(stdout);
                        if (stdout.match(/^Error:/)) {
                            console.log('match trouver');
                            reject(stdout);
                        } else {
                            resolve(JSON.stringify({ Result: 'ok' }));
                        }
                    }
                   
                    
                });
            }
        });

    },


    deactivateConnection(dataConfigWifi) {
        return new Promise((resolve, reject) => {
            var disconnectRequest = `nmcli con down ${dataConfigWifi.SSID}`;
            if (dataConfigWifi.activate == false) {
                Shell.exec(disconnectRequest, (err, stdout, stderr) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        if (stdout.match(/^Error:/)) {
                            reject(stdout);
                        } else {
                            resolve(JSON.stringify({ Result: 'ok' }));
                        }
                    }

                });
            }
        });

    },

    modifyConnection(dataConfigWifi) {
        return new Promise((resolve,reject)=>{
            var modifyRequest = `nmcli con mod ${dataConfigWifi.SSID} ipv6.method ignore autoconnect on`;
            var connectRequest = `nmcli con up ${dataConfigWifi.SSID} `;
    
            if (dataConfigWifi.method == 'auto') {
                modifyRequest = `${modifyRequest} ipv4.method auto ipv4.addr "" ipv4.gateway "" ipv4.dns ""`;
            } else {
                modifyRequest = `${modifyRequest} ipv4.method manual ipv4.addr ${dataConfigWifi.ip}${dataConfigWifi.mask}`;
                modifyRequest = `${modifyRequest} ipv4.gateway ${dataConfigWifi.gateway} ipv4.dns ${dataConfigWifi.dns1}`;
                if (dataConfigWifi.dns2) {
                    modifyRequest = `${modifyRequest} +ipv4.dns ${dataConfigWifi.dns2}`;
                }
            }
            try{
                Shell.execSync(modifyRequest);
            }catch(err){
                reject(err);
            }
            this.deactivateConnection(dataConfigWifi).then(() => {
                _tryConnect(connectRequest).then(resolve).catch(reject);
            }).catch(reject);
        });
    },

    _tryConnect(connectRequest) {
        Shell.exec(connectRequest, (err, stdout, stderr) => {
            if (err) {
                reject(err);
            }
            else {
                if (stdout.match(/^Error:/)) {
                    reject(stdout);
                } else {
                    resolve(JSON.stringify({ Result: 'ok' }));
                }
            }
        });
    },

    addConnection(dataConfigWifi) {
        return new Promise((resolve,reject)=>{
            var addRequest = `nmcli con add type wifi con-name ${dataConfigWifi.SSID}  ssid ${dataConfigWifi.SSID}`;
            var modifyRequest = `nmcli con mod ${dataConfigWifi.SSID} ipv6.method ignore autoconnect on`;

            if (dataConfigWifi.method == 'auto') {
                modifyRequest = `${modifyRequest} ipv4.method auto ipv4.addr "" ipv4.gateway "" ipv4.dns "" `;
            } else {
                modifyRequest = `${modifyRequest} ipv4.method manual ipv4.addr ${dataConfigWifi.ip}${dataConfigWifi.mask}`;
                modifyRequest = `${modifyRequest} ipv4.gateway ${dataConfigWifi.gateway} ipv4.dns ${dataConfigWifi.dns1}`;
                if (dataConfigWifi.dns2) {
                    modifyRequest = `${modifyRequest} +ipv4.dns ${dataConfigWifi.dns2}`;
                }
            }
            try{
                Shell.execSync(addRequest);
                Shell.execSync(modifyRequest);
            }catch(err){
                reject(err);
            }
            this.activateConnection(dataConfigWifi)
            .then((response)=>{
             resolve(response);
            })
            .catch((err)=>{
             reject(err);
            });
        });
    },

    updateConfig(dataConfigWifi, connectionList) {
        return new Promise((resolve, reject) => {
            var get_result;
            if (dataConfigWifi && dataConfigWifi.activate == true) {
                if (Util.checkExistingConnection(connectionList, dataConfigWifi.SSID) == true) {
                    get_result = this.modifyConnection(dataConfigWifi);
                    get_result.then((response) => {
                        resolve(response);
                    });
                    get_result.catch((err) => {
                        reject(err);
                    });
                } else {
                    get_result = this.addConnection(dataConfigWifi);
                    get_result.then((response) => {
                        resolve(response);
                    });
                    get_result.catch((err) => {
                        reject(err);
                    });
                }
            }
        });
    },
}
module.exports = WifiNetwork;