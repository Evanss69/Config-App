const Shell = require('child_process');
const ShellNmcl = require('child_process');
const EthernetNetwork = require('./ethernet_network');
//const { getWifiList } = require('./wifi_network');
const WifiNetwork = require('./wifi_network');

const Network = {

    init() {

    },
    mapp:
    {
        "GENERAL.CONNECTION": "name",
        "GENERAL.TYPE": "type",
        "GENERAL.DEVICE": "device",
        "GENERAL.STATE": "state",
        //"GENERAL.HWADDR": "mac",
        "IP4.ADDRESS[1]": "ip",
        "IP4.GATEWAY": "gateway",
        "IP4.DNS[1]": "dns1",
        "IP4.DNS[2]": "dns2",
        "IP4.DOMAIN[1]": "area",
        "IP4.ROUTE[1]": "road1",
        "IP4.ROUTE[2]": "road2",
        "IP4.ROUTE[3]": "road3"
    },
    con_mapping: {
        "GENERAL.NAME": "name",
        // "GENERAL.TYPE": "type",
        "802-11-wireless.ssid": "ssid",
        "GENERAL.DEVICES": "device",
        "GENERAL.STATE": "state",
        //"GENERAL.HWADDR": "mac",
        "ipv4.method": "method",
        "IP4.ADDRESS[1]": "ip",
        "IP4.GATEWAY": "gateway",
        "IP4.DNS[1]": "dns1",
        "IP4.DNS[2]": "dns2",
    },

    getNetworkConfig() {
        return new Promise((resolve, reject) => {

            const get_networks = Network.getNetworks();
            get_networks.then((networks) => {
                //console.log(networks);
                const res = {
                    "ethernet": { device_state: networks['ethernet'].state },
                    "wifi": { device_state: networks['wifi'].state }
                };
                const connection = networks['ethernet'].connection;
                if (connection) {
                    Object.assign(res["ethernet"], Network.getConfig(connection));
                }
                const wifi = networks['wifi'].connection;
                if (wifi) {
                    Object.assign(res['wifi'], Network.getConfig(wifi));
                }
                resolve(res);
            });
            get_networks.catch((e) => {
                reject(e.message);
            });
        })
    },


    getNetworks() {
        return new Promise((resolve, reject) => {
            try {
                const networks = {};
                const devList = ShellNmcl.execSync('nmcli -t dev');

                devList.toString().split('\n').forEach((l) => {
                    const [device, type, state, connection] = l.split(':');
                    if (type == "ethernet" || type == "wifi") {
                        if (!networks[type]) {
                            networks[type] = { device: device, state: state, connection: connection };
                        }
                    }
                });
                resolve(networks);
            }
            catch (e) {
                reject(e.message);
            }
        })
    },

    getConfig(connection) {

        try {
            const config = {};
            const raw_config = ShellNmcl.execSync(`nmcli -t -f GENERAL.NAME,GENERAL.DEVICES,GENERAL.STATE,IP4.ADDRESS,IP4.GATEWAY,IP4.DNS,ipv4.method,802-11-wireless.ssid con show  ${connection}`);
            raw_config.toString().split('\n').forEach((l) => {
                const [k, v] = l.split(':');
                //console.log(k + " => " + v);
                if (this.con_mapping[k]) {
                    config[this.con_mapping[k]] = v;
                }
            });
           // console.log(config)
            return config;
        }
        catch (e) {
            return { state: 'error: ' + e.message };
        }

    },

    //for update
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
    getWifiList(){
            
        return new Promise((resolve, reject) => {

            const get_wifi_list = WifiNetwork.getWifiList();
            get_wifi_list.then((wifiList) => {
                resolve(wifiList);
            });
            get_wifi_list.catch((e) => {
                reject(e);
            });
        })
    },

    updateConfig(dataConfig, connectionList) {
        return new Promise((resolve,reject)=>{
            if (dataConfig.type == 'ethernet') {
                var dataConfigEthernet = dataConfig;
                console.log({config: 'ethernet'});
                 const get_result= EthernetNetwork.updateConfig(dataConfigEthernet)
                 get_result.then((response)=>{
                     resolve(response);
                 });
                 get_result.catch((e)=>{
                    reject(e);

                 });

            }else {
                var dataConfigWifi = dataConfig;
                 console.log({config: 'wifi'});
                const get_result= WifiNetwork.updateConfig(dataConfigWifi,connectionList)
                get_result.then((response)=>{
                    console.log(response);
                    resolve(response);
                });
                get_result.catch((e)=>{
                    console.log(e.message);
                    reject(e);
                });

            }
        });
        /*console.log(dataConfig[0].type);
        var dataConfigEthernet = dataConfig[0];
        if (dataConfig[1]) {
            var dataConfigWifi = dataConfig[1];      
            WifiNetwork.wifiConfig(dataConfigWifi, connectionList);  
        }else if(dataConfig !=null){
            EthernetNetwork.updateConfig(dataConfigEthernet, connectionList);
        }        */
    },
    activateConnection(dataConfig){
        return new Promise((resolve,reject)=>{
            if (dataConfig.type == 'ethernet') {
                var dataConfigEthernet = dataConfig;
                 const get_result= EthernetNetwork.activateConnection(dataConfigEthernet)
                 get_result.then((response)=>{
                     resolve(response);
                 });
                 get_result.catch((e)=>{
                    reject(e);

                 });

            }else {
                var dataConfigWifi = dataConfig;
                   // console.log(WifiNetwork.updateConfig(dataConfigWifi, connectionList));
                const get_result= WifiNetwork.activateConnection(dataConfigWifi)
                get_result.then((response)=>{
                    resolve(response);
                });
                get_result.catch((e)=>{
                    reject(e);
                });

            }
        });
    },
    deactivateConnection(dataConfig){
        return new Promise((resolve,reject)=>{
            if (dataConfig.type == 'ethernet') {
                var dataConfigEthernet = dataConfig;
                 const get_result= EthernetNetwork.deactivateConnection(dataConfigEthernet)
                 get_result.then((response)=>{
                     resolve(response);
                 });
                 get_result.catch((e)=>{
                    reject(e);

                 });

            }else {
                var dataConfigWifi = dataConfig;
                   // console.log(WifiNetwork.updateConfig(dataConfigWifi, connectionList));
                const get_result= WifiNetwork.deactivateConnection(dataConfigWifi)
                get_result.then((response)=>{
                    resolve(response);
                });
                get_result.catch((e)=>{
                    reject(e);
                });

            }
        });
    },



}
module.exports = Network;

    /*
getConfigNetwork() {
    // nmcli -t -f GENERAL.CONNECTION,GENERAL.TYPE,GENERAL.DEVICE,GENERAL.STATE,GENERAL.HWADDR,IP4 device show

    return new Promise((resolve, reject) => {
        ShellNmcl.exec('nmcli -t -f GENERAL.CONNECTION,GENERAL.TYPE,GENERAL.DEVICE,GENERAL.STATE,GENERAL.HWADDR,IP4 device show ', (err, stdout, stderr) => {
            if (err) {
                reject(err);
            }
            else { //parsage
                var infosConfigNetwork = [];
                var idx = 0;

                stdout.split('\n').forEach((l) => {
                    if (l == "") { idx++; }
                    else {
                        //console.log(l);
                        const [k, v] = l.split(':');
                        if (!infosConfigNetwork[idx]) infosConfigNetwork[idx] = {};
                        //if(typeof v == 'array') v = v.join(':');
                        let field = Infosconfig.mapp[k];
                        if (field) { infosConfigNetwork[idx][field] = v; }
                    }

                });

                const filteredList = infosConfigNetwork.filter(it => it.type == 'wifi' || it.type == "ethernet");

                resolve(filteredList);
            }
        });
    });
},
*/
   /* deleteRequest(device, connectionList, oldConName, conName) {
        // console.log(device);

        for (var i = 0; i < connectionList.length; i++) {
           // console.log(connectionList[i]);
            if (connectionList[i] == /[A-Z][A-Za-z\é\è\ê\-]+$/ + `${device}`) {
               // console.log('trouver');
                deleteDefaultConRequest = `nmcli connection delete ${connectionList[i]}`;
                Shell.execSync(deleteDefaultConName);
            }
        }
        if (oldConName && conName) {
            if (oldConName != conName) {
                var deleteRequest = `nmcli connection delete ${oldConName}`;
                Shell.execFileSync(deleteRequest);
            }
        }

    },*/