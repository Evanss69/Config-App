import Page from './page';
import BluetoothPageUI from './bluetooth_page_ui';

class BluetoothPage extends Page{
    
    constructor(parentEl, title, name) {
        super(parentEl, title, name);
        this.pageUI = new BluetoothPageUI(parentEl, title, name);
    }
    update(){
        this.pageUI.showLoading();
        this.pageUI.clearContent();
        this.pageUI.hideLoading();
        this.pageUI.update();
    }
}
export default BluetoothPage;