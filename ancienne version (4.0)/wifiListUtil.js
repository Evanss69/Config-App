import URLS from '../srcServ/urls';
import UI from './ui';
/*function refreshWifiList(evt) {
	var get_wifiList = fetch(URLS.get_wifiList_ssids);
	get_wifiList.then(response => response.json()).then((wifiList) => {
		refreshList(wifiList);
	})
	get_wifiList.catch((e) => {
		console.error(e);
	});
};*/
/*function refreshList(wifiList) {
	console.log(wifiList);
	var input_element = document.getElementsByName('inputWifiList');
	var datalist = document.getElementById(input_element[0].list.id);
	const tab = wifiList;
	// at this point input_element.list.id is equals to datalist.id
	// ... update datalist element here
	//the last element in the datalist is hidden network we need to conserve this 
	if (datalist.options.length - 1 == tab.length) {
		for (var i = 0; i < datalist.options.length - 1; i++) {
			datalist.options[i].value = tab[i];
			datalist.options[i].text = tab[i];
		}
	} else if (datalist.options.length - 1 > tab.length) {
		for (var i = 0; i < datalist.options.length - 1; i++) {
			if (tab[i]) {
				datalist.options[i].value = tab[i];
				datalist.options[i].text = tab[i];
			} else {
				datalist.options[i].remove();
			}
		}
	} else {
		var lastIndex = datalist.options[datalist.options.length - 1].value;
		var diffItem = (tab.length) - (datalist.options.length - 1);
		for (var j = 0; j < diffItem; j++) {
			var opt = UI.createElement('option', {}, datalist);
			opt.text = " ";
		}
		for (var i = 0; i < tab.length; i++) {
			datalist.options[i].value = tab[i];
			datalist.options[i].text = tab[i];
		}
		datalist.options[datalist.options.length - 1].text = lastIndex;
		datalist.options[datalist.options.length - 1].value = lastIndex;
	}
	console.log(datalist.options);
	// And now the trick:
	input_element[0].setAttribute('list', '');
	input_element[0].setAttribute('list', datalist.id);
}
/*function showWifiList(evt) {
	//console.log(evt.target.checked);
	var wifiList = document.getElementsByClassName('WifiList');
	for (var i = 0; i < wifiList.length; i++) {
		wifiList[i].hidden = wifiList[i].hidden != true ? true : false;
		if (evt && evt.target.checked == false) {
			wifiList[i].hidden = true;
		}
	}
};*/
//export { showWifiList, refreshWifiList };