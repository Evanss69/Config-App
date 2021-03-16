import UI from './ui';
import Menu from './menu';
import ScreenPage from './screen_page';
import NetworkPage from './network_page';
import BluetoothPage from './bluetooth_page';
import SoundPage from './sound_page';

window.onload = function () {
	App.start();
};

const App = {
	start() {
		UI.init();
		App.menu = Menu.init(UI.header, ['Network', 'Screen', 'Bluetooth', 'Sound'], App.setOnMenuClick.bind(this));
		App.networkPage = new NetworkPage(UI.body, 'Network Configuration', 'network');
		App.screenPage = new ScreenPage(UI.body, 'Screen Resolution Configuration', 'screen');
		App.bluetoothPage = new BluetoothPage(UI.body, 'Bluetooth Configuration', 'bluetooth');
		App.soundPage = new SoundPage(UI.body, 'Sound Configuration', 'sound');
	},

	setOnMenuClick(item_name) {
		App.networkPage.hide();
		App.screenPage.hide();
		App.bluetoothPage.hide();
		App.soundPage.hide();
		switch (item_name) {
			case 'Network':
				App.networkPage.update();
			break;

			case 'Screen':
				App.screenPage.update();
			break;

			case 'Bluetooth':
				App.bluetoothPage.update();
			break;

			case 'Sound':
				App.soundPage.update();
			break;
		}
	}

};