import UI from './ui';
import PageUI from './pageUI';

class SoundPageUI extends PageUI{
    update(){
        const container =UI.createElement('div',{width:'100%',height:'100%'},this.content);
        container.innerText='Page under development. Updated version of this page, which will be posted soon. ';
    }
}

export default SoundPageUI;