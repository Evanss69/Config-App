const Shell = require('child_process');
//const ShellNmcl = require('child_process');
//const Network = require('./network');
//const Util = require ('./util');
const EthernetNetwork = {
    init() {

    },
    addConnection(){
        return new Promise((resolve,reject)=>{
            try{
                Shell.execSync(`nmcli con add ifname "*" type ethernet con-name ethernet`)
            }catch(e){
                //console.error(e.message);
                //reject(e);
            }
            var activRequest = `nmcli -p con up ethernet`;
            Shell.exec(activRequest,(err,stdout,stderr)=>{
                if (err){
                    console.log('err:');
                    console.log(err);
                    console.log('==================================================\n');
                    reject(err);
                }
                if (stdout.match(/^Error:/)){
                    console.log('stdout :')
                   console.log(stdout);
                    console.log('===============================================\n');
                    reject(stdout);
                }else{
                    resolve(JSON.stringify({Result : 'ok'}));
                }     
            });
        })
    },

    activateConnection(dataConfigEthernet){
        return new Promise((resolve,reject)=>{
            if (dataConfigEthernet.activate == true) {
                if(dataConfigEthernet.name=='undefined'){
                const get_result=EthernetNetwork.addConnection();
                   get_result.then((response)=>{
                       resolve(response)
                   });
                    get_result.catch((err)=>{
                        reject(err);
                    });
                }else{
                    var activRequest = `nmcli -p con up ${dataConfigEthernet.name}`;
                    Shell.exec(activRequest,(err,stdout,stderr)=>{
                        if (err){
                            console.log('err:');
                            console.log(err);
                            console.log('==================================================\n');
                            reject(err);
                        }
                        else {
                            if (stdout.match(/^Error:/)){
                                console.log('stdout :')
                               console.log(stdout);
                                console.log('===============================================\n');
                                reject(stdout);
                            } else{
                                resolve(JSON.stringify({Result : 'ok'}));
                            }  
                        }
                        
                           
                    });
                }
            }
        });
    },

    deactivateConnection(dataConfigEthernet){
        return new Promise ((resolve,reject)=>{
            var stopRequest = `nmcli -p con down ${dataConfigEthernet.name} `;
            if (dataConfigEthernet.activate == true) {
                Shell.exec(stopRequest,(err,stdout,stderr)=>{
                    if (err) {
                        console.log('err:');
                        console.log(err);
                        console.log('==================================================\n');
                        reject(err);
                    }
                    else {
                        if (stdout.match(/^Error:/)) {
                            console.log('stdout :')
                            console.log(stdout)
                            console.log('===============================================\n');
                            reject(stdout);

                        } else {
                            console.log({ Result: 'ok' });
                            resolve(JSON.stringify({ Result: 'ok' }));
                        }
                    } 
                });
            }
        });
    },

    modifyConnection(dataConfigEthernet){
        return new Promise((resolve,reject)=>{
            console.log('dans le modify')
            var modifyRequest = `nmcli con mod ${dataConfigEthernet.name} autoconnect on ipv6.method ignore `;
            if (dataConfigEthernet.method == 'auto') {
                modifyRequest +=` ipv4.method auto ipv4.addr "" ipv4.gateway "" ipv4.dns ""`;
            } else {
                modifyRequest += ` ipv4.method manual ipv4.addr ${dataConfigEthernet.ip}${dataConfigEthernet.mask}  `;
                modifyRequest+= `ipv4.gateway ${dataConfigEthernet.gateway} ipv4.dns ${dataConfigEthernet.dns1}`;
                if (dataConfigEthernet.dns2) {
                    modifyRequest += ` +ipv4.dns ${dataConfigEthernet.dns2}`;
                }    
            }
            try{
                console.log({modifRequest: modifyRequest});
                Shell.execSync(modifyRequest);
            }catch(err){
                console.log({erreur : err});
                reject(err);
            }
            console.log('fin  de la premiere requete');
            console.log('debut de la deactivation ')
           const get_response= EthernetNetwork.deactivateConnection(dataConfigEthernet);
            get_response.then((response_deactivate)=>{
                console.log('fin de la deativation');
                console.log('debut de l activation');
               const get_result= EthernetNetwork.activateConnection(dataConfigEthernet);
               get_result .then((response)=>{
                console.log('fin de l activation')
                    console.log({reponse:response});
                    resolve(response);
                })
                get_result.catch((err)=>{
                    console.log({erreur:err});
                    reject(err);
                });
            })
            get_response.catch((err)=>{
                console.log({erreur:err});
                reject(err);
            });
        });
      
    },

    updateConfig(dataConfigEthernet) {
     return new Promise((resolve,reject)=>{
        console.log({fichier:'EthernetNetwork'+'updateConfig'})
        if(dataConfigEthernet && dataConfigEthernet.activate==true){
            console.log('apres le if')
           const get_result= EthernetNetwork.modifyConnection(dataConfigEthernet);
            get_result.then((response)=>{
                console.log({reponse_de_la_methode_modify: response})
                resolve(response);
            });
            get_result.catch((err)=>{
                console.log({errModify:err});
                reject(err);
            });
        }
     });
    },


}
module.exports =EthernetNetwork;
 /*  var modifyRequest = `nmcli con mod ${dataConfigEthernet.name} ipv4.gateway ${dataConfigEthernet.gateway} ipv4.dns ${dataConfigEthernet.dns1}`;
        var activRequest = `nmcli con mod ${dataConfigEthernet.name} ipv6.method ignore; nmcli -p con up ${dataConfigEthernet.name} `;
        var stopRequest = `nmcli -p con down ${dataConfigEthernet.name} `;
        if (dataConfigEthernet.dns2) {
            modifyRequest = `${modifyRequest} +ipv4.dns ${dataConfigEthernet.dns2}`;
        }
        if (dataConfigEthernet.activate == true) {
            Shell.execSync(activRequest);
        } else if (dataConfigEthernet.activate == false) {
            Shell.execSync(stopRequest);
        }
        if (dataConfigEthernet && dataConfigEthernet.activate == undefined) {
            //
            //console.log(connectionList);
            //console.log(dataConfigEthernet.type);
            //if (Util.checkExistingConnection(connectionList,dataConfigEthernet.name) == true) {

                if (dataConfigEthernet.method == 'auto') {
                    var req = `nmcli con mod ${dataConfigEthernet.name} autoconnect on ipv6.method ignore ipv4.method auto ipv4.addr "" ipv4.gateway "" ipv4.dns ""`;
                    Shell.execSync(req);
                } else {
                    var req = `nmcli con mod ${dataConfigEthernet.name} autoconnect on ipv6.method ignore ipv4.method manual ipv4.addr ${dataConfigEthernet.ip}${dataConfigEthernet.mask} `;
                    Shell.execSync(req);
                    Shell.execSync(modifyRequest);
                }   
               // }
          //  }
            // Shell.execSync(stopRequest);
            // Shell.execSync(activRequest);
        }*/