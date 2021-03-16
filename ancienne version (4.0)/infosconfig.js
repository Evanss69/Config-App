/*const ShellNmcl = require('child_process');
const ShellXrndr = require('child_process');
const xrandrParser = require('./parserXrandr');
const Infosconfig =
{
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
           "802-11-wireless.ssid":"ssid",
            "GENERAL.DEVICES": "device",
            "GENERAL.STATE": "state",
            //"GENERAL.HWADDR": "mac",
            "ipv4.method": "method",
            "IP4.ADDRESS[1]": "ip",
            "IP4.GATEWAY": "gateway",
            "IP4.DNS[1]": "dns1",
            "IP4.DNS[2]": "dns2",
        },

        
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
    

    
    getNetworkConfig() {
        return new Promise((resolve, reject) => {

            const get_networks = Infosconfig.getNetworks();
            get_networks.then((networks) => {
                console.log(networks);
                const res = {
                    "ethernet": { device_state: networks['ethernet'].state },
                    "wifi": { device_state: networks['wifi'].state }
                };
                const connection = networks['ethernet'].connection;
                if (connection) {
                    Object.assign(res["ethernet"], Infosconfig.getEthernetConfig(connection));
                }
                const wifi = networks['wifi'].connection;
                if(wifi) {
                    Object.assign(res['wifi'], Infosconfig.getEthernetConfig(wifi));
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
                    const [ device, type, state, connection ] = l.split(':');
                    if(type == "ethernet" || type == "wifi") {
                        if(!networks[type]) {   
                            networks[type] = { device: device, state: state, connection: connection };
                        }
                    }
                });
                resolve(networks);
            }
            catch(e) {
                reject(e.message);
            }
        })
    },

    getEthernetConfig(connection) {    

        try {
            const config = {};
            const raw_config = ShellNmcl.execSync(`nmcli -t -f GENERAL.NAME,GENERAL.DEVICES,GENERAL.STATE,IP4.ADDRESS,IP4.GATEWAY,IP4.DNS,ipv4.method,802-11-wireless.ssid con show  ${connection}`);
            raw_config.toString().split('\n').forEach((l) => {
                const [k, v] = l.split(':');
                console.log(k + " => " +v);
                if (Infosconfig.con_mapping[k]) {
                    config[Infosconfig.con_mapping[k]] = v;
                }
            });

            return config;
        }
        catch (e) {
            return { state: 'error: ' + e.message};
        }

},

    getWifiList() {
        return new Promise((resolve, reject) => {
            ShellNmcl.exec('nmcli -f SSID device wifi list ', (err, stdout, stderr) => {
                if (err) {
                    reject(err);
                }
                else { //parsage
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

    getResolutionList() {

        return new Promise
            (
                (resolve, reject) => {

                    ShellXrndr.exec('xrandr', function (err, stdout, stderr) {
                        if (err) {
                            reject(err);
                        }
                        else {
                            //parsage
                            var resolutionList = xrandrParser.parseXrandr(stdout);
                            console.log(xrandrParser.parseXrandr(stdout));
                            resolve(resolutionList);
                        }
                    });
                });
    },

}
module.exports = Infosconfig;
*/