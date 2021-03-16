import Page from './page';
import SoundPageUI from './sound_page_ui';

class SoundPage extends Page{
    
    constructor(parentEl, title, name) {
        super(parentEl, title, name);
        this.pageUI = new SoundPageUI(parentEl, title, name);
    }
    update(){
        this.pageUI.showLoading();
        this.pageUI.clearContent();
        this.pageUI.hideLoading();
        this.pageUI.update();
    }
}
export default SoundPage;