import Button from './button';
//import ScreenTableFormUI from './screenFormUI';
import UI from './ui';
import PageUI from './pageUI';

class ScreenPageUI extends PageUI {

    update(screenParams) {
        this.show();
        this.data = {};
        this.createTable(this.content, screenParams);
        this.btnSubmitScrn = new Button('Submit', this.content);
        this.btnSubmitScrn.onClick(this.onSubmit.bind(this))
    }

    createTable(parentEl, screens) {
        this.table = UI.createElement('table', { width: '100%', paddingTop: '15px' }, parentEl);
        for (var [name, dataScreen] of Object.entries(screens)) {
            this.createRow(name, dataScreen);
        }
    }

    createRow(name, dataScreen) {
        // console.log(dataScreen);
        const rowEl = UI.createElement('tr', {}, this.table);
        const content = dataScreen.connected ? "&check;" : "&cross;";
        this.createCell(rowEl, { content: content, value: dataScreen.connected, dataset: { connected: dataScreen.connected } });
        this.createCell(rowEl, { content: name, value: name, dataset: { name: name } });
        let modesEl = this.createCell(rowEl, { dataset: { mode: dataScreen.modes } });
        this.createSelect(modesEl, name, dataScreen, this.modesSelected.bind(this));
    }

    createCell(rowEl, opts = {}) {
        let el = UI.createElement('td', {}, rowEl);
        if (opts.dataset) {
            Object.entries(opts.dataset).forEach((kv) => {
                el.dataset[kv[0]] = kv[1];
            });
        }
        if (opts.content) el.innerHTML = opts.content;
        if (opts.value) el.value = opts.value;
        return el;
    }

    createSelect(parentEl, name, dataScreen, onChange) {
        let modesSelect = UI.createElement('select', {}, parentEl);
        modesSelect.dataset['name'] = name;
        if (dataScreen.modes.length == 0) {
            modesSelect.disabled = true;
            return;
        }
        modesSelect.addEventListener('change', onChange);
        dataScreen.modes.forEach((mode) => {
            if (JSON.stringify(Object.values(mode)) !== JSON.stringify(Object.values(dataScreen.current))) {
                //console.log('not default value');
                let opt = UI.createElement('option', {}, modesSelect);
                opt.text = `${mode.width}x${mode.height}@${mode.rate}`;

            } else {
                // console.log('defaultValue');
                let opt = UI.createElement('option', {}, modesSelect);
                opt.text = `${mode.width}x${mode.height}@${mode.rate}`;
                opt.selected = true;
                this.modesSelected({target: modesSelect});
            }

        });

        
        return modesSelect;
    }

    modesSelected(evt) {
        this.data = {
            name: evt.target.dataset['name'],
            mode: evt.target.value,
        };
        //console.log(evt.target.value);
        //console.log(this.getData());
    }
    
    onSubmit(evt) {
       // console.log(this.data);
        this.onEvent('submit', this.data);
    }
}
export default ScreenPageUI;