var Screen = createColumn(globalBox, 'Screen Resolution Configuration');
var get_data_screen = fetch('http://localhost:8080/info2');
get_data_screen
.then(response => response.json())
  .then((dataScreen) => {
    updateVideoForm(Screen.content, dataScreen);
    /*
     //console.log(JSON.stringify(dataScreen,null,2))
      Object.keys(dataScreen).forEach(d=>{
        console.log(dataScreen[d]);
        //console.log(Object.keys(dataScreen));
        //console.log(Object.values(dataScreen));
        var el=createElement('div',{},Screen.content);
       el.innerHTML = d + ":" + "\n";//JSON.stringify(dataScreen,null,2).replace(/{|}|,|"/g,'');
      })

      Object.values(dataScreen).forEach(v=>{
  
        console.log(dataScreen[v]);
        var value=createElement('div',{},Screen.content);
       // var cpt = 0;
        value.innerHTML = "connected:" + v.connected +"\n"
        + "modes:" + v.modes /*[cpt]
        while(cpt<Object.values(v.modes)){cpt++}
        
        +v.modes[cpt] + "\n"
        + "index:" + v.index + "\n"
        ;
        })
      */
    })
		get_data_screen.catch((e) => {
			console.error(e);
		});

/*
coldef.header.addEventListener('click', function() {
  coldef.content.style.visibility = coldef.content.style.visibility == 'visible' ? 'hidden' : 'visible';
})
*/


//globalBox.style.width='100%';
// globalBox.style.height='100%';
//globalBox.style.border='5px solid pink';
//globalBox.style.display='inline-block';
//b.appendChild(globalBox);
/*
var networkBox = createCuloms('div',{
  border:'5px solid green'
},globalbox);
//networkBox.style.display='inline-block';
//networkBox.style.width='45%';
// networkBox.style.marginTop ='40px';
//networkBox.style.border='5px solid green';
//globalBox.appendChild(networkBox);

var screenBox = createCuloms('div',{
  border:'5px solid yellow'
},globalBox);
//screenBox.style.display='inline-block';
//screenBox.style.width='45%';
// screenBox.style.marginTop ='40px';
//screenBox.style.border='5px solid yellow';
//screenBox.style.height='100%';
//globalBox.appendChild(screenBox);

var titleNetwork = document.createElement('div');
titleNetwork.innerText="Network Configuration";
titleNetwork.style.color ='black';
titleNetwork.style.fontSize ='40px';
titleNetwork.style.fontWeight='bold';
titleNetwork.id='NetworkConfig';
//titleNetwork.style.display ='inline-block';
titleNetwork.style.border ='5px solid blue';
networkBox.appendChild(titleNetwork);
//titleNetwork.style.width ='45%';
// titleNetwork.style.paddingBottom ='20px';

// var pre=document.createElement('pre');
// pre.style.width = '500px';
// pre.style.overflowWrap = 'anywhere'; 

var titleScreen = document.createElement('div');
titleScreen.innerText="Screen Resolution Configuration";
titleScreen.style.color ='black';
titleScreen.style.fontSize ='40px';
titleScreen.style.fontWeight='bold';
titleScreen.style.display ='inline-block';
//div3.style.width ='45%';
// titleScreen.style.paddingBottom ='20px';
titleScreen.style.border='5px solid red';
titleScreen.id='ConfigRésolution';
screenBox.appendChild(titleScreen);

var infoDevice= document.createElement('p');
infoDevice.id='InfoDevice';
//infoDevice.innerHTML='text';
infoDevice.style.visibility='visible';


networkBox.appendChild(infoDevice);

// pre.appendChild(infoDevice);
// b.appendChild(pre);

var el =document.getElementById('InfoDevice');
var get_data_device = fetch('http://localhost:8080/info1');
get_data_device
.then(response => response.json())
		.then((dataDevice) => {
            console.log(JSON.stringify(dataDevice))
            
            //pre.innerHTML = JSON.stringify(dataDevice);
            dataDevice.forEach(d => {
                var el = document.createElement('p');
                el.innerHTML = "Name:" +d.name + "<br>" + 
                "Type:" + d.type + "<br>" + 
                "Device:" + d.device +"<br>" +
                "State:" + d.state +"<br>" +
                "IP:" + d.ip + "<br>" + 
                "Gateway:" + d.gateway + "<br>" +
                "DNS:" + d.dns + "<br>" +
                //+ " "  + d.area 
                "Road:" + d.road1 + "<br>" ;
                el.style.fontFamily ='sans-serif';
                el.style.textAlign = 'left';
                //el.style.margin ='20px';
              //  el.style.padding ='10px';
               // el.style.width = '250px';
               // el.style.textJustify = 'auto';
                 infoDevice.appendChild(el);
            })
            // pre.style.visibility='visible';
		});
		get_data_device.catch((e) => {
			console.error(e);
		});




var infoScreen = document.createElement('p');
infoScreen.id='InfoScreen';
//infoScreen.innerHTML='text';
infoScreen.style.visibility='visible';
screenBox.append(infoScreen);
var el2 =document.getElementById('InfoScreen');
var get_data_screen = fetch('http://localhost:8080/info2');
get_data_screen
.then(response => response.json())
		.then((dataScreen) => {
			console.log(JSON.stringify(dataScreen))
            el2.innerHTML = JSON.stringify(dataScreen);
           // el2.style.visibility='visible';
		});
		get_data_screen.catch((e) => {
			console.error(e);
		});
*/

var Network = createColumn(globalBox, 'Network Configuration');
var get_data_device = fetch('http://localhost:8080/info1');
get_data_device
.then(response => response.json())
		.then((dataDevice) => {
            updateNetworkForm(Network.content,dataDevice);
            //console.log(JSON.stringify(dataDevice));
           /* dataDevice.forEach(d => {
              var el=createElement('div',{
                padding:'10px'
              },Network.content);
              el.innerHTML = "Name:" +d.name + "<br>" + 
              "Type:" + d.type + "<br>" + 
              "Device:" + d.device +"<br>" +
              "State:" + d.state +"<br>" +
              "IP:" + d.ip + "<br>" + 
              "Gateway:" + d.gateway + "<br>" +
              "DNS:" + d.dns + "<br>" +
              //+ " "  + d.area 
              "Road:" + d.road1 + "<br>" ;
              
          })*/
  })
  get_data_device.catch((e) => {
    console.error(e);
  });