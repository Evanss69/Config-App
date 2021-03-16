valid(data,listConnect)//V1.0
/*{
let mistake;
        var req="";
        var config=data[0];
        var configWifi;
        var activWifi;
        var activEth=`nmcli -p con up ethernet;nmcli radio off`;
        if(data[1]){
            configWifi=data[1];
            activWifi=`nmcli -p con up ${configWifi.SSID}`;
        } 
        if(config.name){
            const modeRate = config.value.replace('@',' --rate ') ;
            req='xrandr --output '+config.name+' --mode '+modeRate;
                //console.log(req);
            Shell.execSync(req);
        }else if(config.type){
            if(!config.DHCP){
            //console.log(listConnect);
                if(this.verif(listConnect,config.type)==false){
                    req=`nmcli con add type ethernet con-name ethernet ifname "*" autoconnect on ipv6.method disable ipv4.method manual ipv4.addr ${config.IP}${config.mask} ipv4.gateway ${config.gateway}`;
                    var req2=`nmcli con mod ethernet ipv4.dns "${config.dns1}"`;
                    Shell.execSync(req);
                    if(config.dns2){
                        req2=`${req2} +ipv4.dns "${config.dns2}"`;
                    }
                    Shell.execSync(req2);    
                }else{
                    req=`nmcli con mod  ethernet ifname "*" autoconnect on  ipv4.method manual ipv4.addr ${config.IP}${config.mask} ipv4.gateway ${config.gateway}`;
                    var req2=`nmcli con mod ethernet ipv4.dns "${config.dns1}"`;
                    Shell.execSync(req);
                    if(config.dns2){
                        req2=`${req2} +ipv4.dns "${config.dns2}"`;
                    }
                    Shell.execSync(req2);
                }
                Shell.execSync(activEth);

            }else if(config.DHCP){
                if(this.verif(listConnect,config.type)==false){
                    req=`nmcli con add type ethernet con-name ethernet ifname "*" autoconnect on ipv6.method disable ipv4.method auto`;
                    Shell.execSync(req);
                }else{
                    req=`nmcli con mod  ethernet ifname "*" autoconnect on  ipv4.method auto ipv4.addr "" ipv4.gateway "" ipv4.dns ""`;
                    Shell.execSync(req);
                }
                Shell.execSync(activEth);
            }
            if(this.verif(listConnect,configWifi.SSID)==true){
                if(!configWifi.DHCP){
                    req=`nmcli device wifi connect ${configWifi.SSID} password ${configWifi.password} ipv4.method manual ipv6.method disable autoconnect on`;
                    var req2= `nmcli con mod ${configWifi.SSID} ifname "*" ipv4.addr ${configWifi.IP}${configWifi.mask} ipv4.gateway ${configWifi.gateway} ipv4.dns ${configWifi.dns1}`;
                    if(configWifi.dns2){
                        req2=`${req2} +ipv4.dns ${configWifi.dns2}`;
                    }
                    try{
                        Shell.execSync(req);
                        Shell.execSync(req2);
                    }catch(e){
                        mistake='Erreur rencontrée. ' +
                        '\nNom de l\'erreur : ' + e.name +
                        '\nMessage d\'erreur : ' + e.message;
                        return (mistake);
                    }
                }else if(configWifi.DHCP){
                    req=`nmcli device wifi connect ${configWifi.SSID} password ${configWifi.password} ipv4.method auto ipv6.method disable autoconnect on`;
                    //console.log(req);
                    Shell.execSync(req);
                    //Shell.execSync('sudo nmcli --ask device wifi connect '+configWifi.SSID);
                }
            }else{
                if(configWifi.DHCP){
                    req=`nmcli con add type wifi con-name ${configWifi.SSID} ifname "*" ssid ${configWifi.SSID} password ${configWifi.password} ipv4.method auto ipv6.method disable autoconnect on hidden yes`;
                    Shell.execSync(req);
                }else{
                    req=`nmcli con add type wifi con-name ${configWifi.SSID} ifname "*" ssid ${configWifi.SSID} password ${configWifi.password} ipv4.method manual ipv6.method disable autoconnect on hidden yes`;
                    Shell.execSync(req);
                
                }
            }
        }   
}*/

/* SERT A RIEN JSON.PARSE permet de faire la même chose le client envoye un objet au format json il faut donc retransformer l'objet en objet json du cote serveur
   
   var exp=/"/gi;
        var separateur=/},{/gi;
        let tab=[];
        var[k,v] =[];
        data= data.replace('[','');
        data=data.replace(exp,'');
        data=data.replace(']','') ;
        tab=data.split(separateur);
        for(i=0;i<tab.length;i++){
            tab[i]=tab[i].replace(/{/gi,'');
            tab[i]=tab[i].replace(/}/gi,'');    
            tab[i]=tab[i].split(/,/gi);
           // console.log(tab[i].length);
           const cpt=tab[i].length;
            for(j=0;j<tab[i].length;j++){
               
            [k,v]=tab[i][j].split(/:/);
            //console.log([k,v]);
            //tab splice changer les cle et valeurs
            tab[i][k]=v;
            
            }
           tab[i].splice(0,cpt);
        }
      

        
       // console.log(data);
        //console.log(tab);
       /* Object.values(data).forEach((row)=>{
                console.log(row);


        })*/