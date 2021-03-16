import { createElement, createMenuItem,createMenuBar } from './util';
import ScreenTableFormUI from './screenFormUI';
import NetworkTableFormUI from './networkFormUI';
import AppUtil from './appUtil';
import URLS from '../Serv/urls';

let b = document.body;
b.style.margin = '0px';
b.style.padding = '0px';
b.style.backgroundColor = 'lightgrey';
let header =createElement('header',{},b);
let menu = createMenuBar(['Network','Screen','Bluetooth','Sound'],header)
let globalBox = createElement('div', {width: '100%',display: 'inline',}, b);
window.onload = function () {
	App.start()
}
const App = {
	start() {
		var networkMI = createMenuItem(globalBox, 'Network Configuration');
		var get_network_config = fetch(URLS.get_network_config);
		get_network_config
			.then(response => response.json())
			.then((dataNetwork) => {
				var get_wifiList = fetch(URLS.get_wifiList);
				get_wifiList
					.then(response => response.json())
					.then((wifiList) => {
						App.netForm = new NetworkTableFormUI(dataNetwork, wifiList, networkMI.content);
					})
			})
		get_network_config.catch((e) => {
			console.error(e);
		});
		get_wifiList.catch((e) => {
			console.error(e);
		});

		var screenMI = createMenuItem(globalBox, 'Screen Resolution Configuration');
		var get_screen_config = fetch(URLS.get_screen_config);
		get_screen_config
			.then(response => response.json())
			.then((dataScreen) => {
				App.scrnForm = new ScreenTableFormUI(dataScreen, screenMI.content);
				App.scrnForm.setOnClick(AppUtil.setOnClick);
			})
		get_screen_config.catch((e) => {
			console.error(e);
		});




		const btnHideShowScrn = new Button('Hide/Show', screenCl.column);
		btnHideShowScrn.onClick(() => {
			screenCl.content.style.visibility = screenCl.content.style.visibility != 'visible' ? 'visible' : 'hidden';
		});
		//a tester 
		//	const defaultValuesScrn =screenCl.content;
		//console.log(screenCl.content)
		const btnResetScrn = new Button('Reset', screenCl.column);
		btnResetScrn.onClick(() => {
			window.location.reload();
			//	screenCl.content=defaultValuesScrn;
		})

		const btnSubmitScrn = new Button('Submit', screenCl.column);
		const resultScrnForm = new Result(screenCl.column);
		btnSubmitScrn.onClick(() => {
			const data = scrnForm.getData();
			resultScrnForm.update(JSON.stringify(data));

		})

		const btnHideShowNet = new Button('Hide/Show', networkMI.column);
		btnHideShowNet.onClick(() => {
			networkMI.content.style.visibility = networkMI.content.style.visibility != 'visible' ? 'visible' : 'hidden';
		});
		//const defaultValuesNet = networkMI.content;
		const btnResetNet = new Button('Reset', networkMI.column);
		btnResetNet.onClick(() => {
			window.location.reload();
			//networkMI.content =defaultValuesNet;
		})

		const btnSubmitNet = new Button('Submit', networkMI.column);
		const resultNetform = new Result(networkMI.column);
		btnSubmitNet.onClick(() => {
			const data = netForm.getData();
			resultNetform.update(JSON.stringify(data));
		})


	}
}

/*
import {createElement,createMenuItem} from './util';
import screenForm from './screenForm';
import networkForm from'./networkForm';



var b =document.body;
b.style.margin =0;
b.style.padding =0;
b.style.backgroundColor ='lightgrey';

var globalBox=createElement('div',{
  width:'100%',
  display :'grid',
  gridTemplateColumns:'1fr 1fr',
  border :'5px solid pink'
},b);


var Network = createMenuItem(globalBox, 'Network Configuration');
var get_network_config = fetch('http://localhost:80/info1');
get_network_config
.then(response => response.json())
		.then((dataNetwork) => {
			networkForm.updateNetworkForm(Network.content,dataNetwork);

  })
  get_network_config.catch((e) => {
	console.error(e);
  });

var Screen = createMenuItem(globalBox, 'Screen Resolution Configuration');
var get_data_screen = fetch('http://localhost:80/info2');
get_data_screen
.then(response => response.json())
import {createElement,createMenuItem} from './util';
import screenForm from './screenForm';
import networkForm from'./networkForm';



var b =document.body;
b.style.margin =0;
b.style.padding =0;
b.style.backgroundColor ='lightgrey';

var globalBox=createElement('div',{
  width:'100%',
  display :'grid',
  gridTemplateColumns:'1fr 1fr',
  border :'5px solid pink'
},b);


var Network = createMenuItem(globalBox, 'Network Configuration');
var get_network_config = fetch('http://localhost:80/info1');
get_network_config
.then(response => response.json())
		.then((dataNetwork) => {
			networkForm.updateNetworkForm(Network.content,dataNetwork);

  })
  get_network_config.catch((e) => {
	console.error(e);
  });

var Screen = createMenuItem(globalBox, 'Screen Resolution Configuration');
var get_data_screen = fetch('http://localhost:80/info2');
get_data_screen
.then(response => response.json())
  .then((dataScreen) => {
	screenForm.updateVideoForm(Screen.content, dataScreen);

	})
		get_data_screen.catch((e) => {
			console.error(e);
	});
	*/