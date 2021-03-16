import Page from './page';
import URLS from '../srcServ/urls';
import ScreenPageUI from './screen_page_ui';
import Result from './result';

class ScreenPage extends Page {

    constructor(parentEl, title, name) {
        super(parentEl, title, name);
        this.pageUI = new ScreenPageUI(parentEl, title, name);
        this.pageUI.setOnEvent(this.onPageEvent.bind(this));
        this.result = new Result(this.pageUI.container);
    }

    update() {
        this.pageUI.showLoading();
        this.pageUI.clearContent();
        const get_params = this.getScreenParams();
        get_params.then((screenParams) => {
            // PageUI.update(this.pageEl, configAndList, this.pageEl.content);
            this.pageUI.hideLoading();
            this.pageUI.update(screenParams);
        });
        get_params.catch((e) => {
            console.error(e);
        });
    }

    onPageEvent(action, data) {
        switch (action) {
            case 'submit':
                //console.log(this.pageUI.container);
                this.pageUI.showLoading();
                this.pageUI.clearContent();
               var get_result = this.sendParams(data);
                get_result.then((response) => {
                    //  console.log(JSON.parse(response));
                    this.pageUI.hideLoading();
                    this.update();
                    this.result.update(response);
                    //console.log(this.result);
                });
                get_result.catch((err) => {
                    this.pageUI.hideLoading();
                    this.update();
                    this.result.update(err);
                });
            break;
        }
    }

    getScreenParams() {
        return new Promise((resolve, reject) => {
            var get_screen_config = fetch(URLS.get_screen_config);
            get_screen_config
                .then(response => response.json())
                .then((resolutionList) => {
                    resolve(resolutionList);
                })
            get_screen_config.catch((e) => {
                console.error(e);
                reject(e);
            });
        })
    }

    sendParams(params) {
        //console.log(params);
        return new Promise((resolve,reject)=>{
            var json = JSON.stringify(params);
            var xhr = new XMLHttpRequest;
            // console.log(xhr);
            xhr.open("POST", URLS.update_screen_config, true);
            xhr.setRequestHeader('Content-type', 'application/json');
            xhr.onload = function () {
                var response = (xhr.responseText);
                if (xhr.readyState == 4 && xhr.status == "200") {
                    console.table(response);
                    resolve(response);
                } else {
                    console.error(response);
                    reject(response);
                }
            }
            xhr.send(json);
        });

    }
}
export default ScreenPage;