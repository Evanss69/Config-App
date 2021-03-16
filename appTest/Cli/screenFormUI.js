import { createElement } from './util';
import Button from './button';
import ScreenFormUtil from './screenFormUtil';
class ScreenTableFormUI {

  constructor(def, parentEl) {
    this.def = def;
    this.inputs = [];
    this.createTable(parentEl);
    this.btnSubmitScrn = new Button('Submit', parentEl);
  }

  setOnClick(fn) {
    ScreenFormUtil.setOnClick(fn, this.btnSubmitScrn);
  }

  createTable(parentEl) {
    this.table = createElement('table', { width: '100%', paddingTop: '15px' }, parentEl);
    let rowIndex = 0;
    for (var [name, dataScreen] of Object.entries(this.def)) {
      this.createRow(rowIndex, name, dataScreen);
      rowIndex++;
    }
  }

  createRow(id, name, dataScreen) {
    const rowEl = createElement('tr', {}, this.table);
    this.inputs.push([]);
    const content = dataScreen.connected ? "&check;" : "&cross;";
    this.createCell(rowEl, this.inputs[id], { content: content, value: dataScreen.connected, dataset: { connected: dataScreen.connected } });
    this.createCell(rowEl, this.inputs[id], { content: name, value: name, dataset: { name: name } });
    let modesEl = this.createCell(rowEl, this.inputs[id], { dataset: { mode: dataScreen.modes } });
    this.createSelect(modesEl, name, dataScreen.modes, this.inputs[id], ScreenFormUtil.modesSelected.bind(this));
  }

  createCell(rowEl, inputs, opts = {}) {
    let el = createElement('td', {}, rowEl);
    if (opts.dataset) {
      Object.entries(opts.dataset).forEach((kv) => {
        el.dataset[kv[0]] = kv[1];
      });
    }
    if (opts.content) el.innerHTML = opts.content;
    if (opts.value) el.value = opts.value;
    return el;
  }

  createSelect(parentEl, name, values, inputs, onChange) {

    let modesSelect = createElement('select', {}, parentEl);
    inputs.push(modesSelect);
    modesSelect.dataset['name'] = name;
    if (values.length == 0) {
      modesSelect.disabled = true;
      return;
    }
    modesSelect.addEventListener('change', onChange);
    values.forEach((mode) => {
      let opt = createElement('option', {}, modesSelect);
      opt.text = `${mode.width}x${mode.height}@${mode.rate}`;
    });
    return modesSelect;
  }

  getParams() {
    //console.log(this.inputs);
    return ScreenFormUtil.getParams(this.inputs);
  }
  sendParams(params) {
    ScreenFormUtil.sendParams(params);
  }

}
export default ScreenTableFormUI;