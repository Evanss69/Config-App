import URLS from '../srcServ/urls';
const ScreenFormUtil = {

    modesSelected(evt) {
        //console.log(evt.target.value);
        //console.log(this.getData());
    },
    setOnClick(fn, bt) {
        bt.setOnClick(fn);
    },

    getParams(inputs) {
        const params = [];
        inputs.forEach((row) => {
            if (row[0].value != '') {
                const select = row[0];
                params.push({ name: select.dataset['name'], value: select.value });
            }
        });
        return params;
    },

    sendParams(params) {
        var json = JSON.stringify(params);
        var xhr = new XMLHttpRequest;
        // console.log(xhr);
        xhr.open("POST", URLS.update_screen_config, true);
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.onload = function () {
            var screenConfig = (xhr.responseText);
            if (xhr.readyState == 4 && xhr.status == "200") {
                console.table(screenConfig);
            } else {
                console.error(screenConfig);
            }
        }
        xhr.send(json);
    },
}
module.exports = ScreenFormUtil;