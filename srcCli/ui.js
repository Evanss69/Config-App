const UI = {

  init() {
    UI.body = document.body;
    UI.body.style.margin = '0px';
    UI.body.style.width = '100%';
    UI.body.style.padding = '0px';
    UI.body.style.backgroundColor = 'lightgrey';
    UI.header = this.createElement('header', { width: '100%' }, UI.body);
  },

  createElement(type, style, parentEl) {
    var el = document.createElement(type);

    for (var attr in style) {
      el.style[attr] = style[attr];
    }
    if (parentEl) parentEl.appendChild(el);
    return el;
  },

  createPassword(parentEl) {
    let passwordBox = this.createElement('input', { width: '125px' }, parentEl)
    passwordBox.type = 'password';
    passwordBox.minLength=8;
    // passwordBox.id = 'myPasswordBox';
    return passwordBox;
  },

  createCheckbox(parentEl, checked, onChange) {
    const el = this.createElement('input', { display: 'inline' }, parentEl);
    el.type = 'checkbox';
    if (checked) { el.checked = checked };
    /*if(checked) { 
      el.removeAttribute("checked");
      el.setAttribute("checked", "checked");
    } else { 
      el.setAttribute("checked", "checked");
      el.removeAttribute("checked");
    }*/

    if (onChange) {
      el.addEventListener('change', onChange);
    }
    // console.log(el);
    return el;
  },

  createCell(rowEl, opts = {}) {
    let el = UI.createElement('td', {}, rowEl);
    if (opts.dataset) {
      Object.entries(opts.dataset).forEach((kv) => {
        el.dataset[kv[0]] = kv[1];
      });
    }
    if (opts.label) {
      const span = UI.createElement('span', {}, el);
      span.innerText = opts.content;
    }
    if (opts.content) { el.innerHTML = opts.content; }

    if (opts.value) el.value = opts.value;
    if (opts.hidden) el.hidden = opts.hidden;
    if (opts.className) el.className = opts.className;
    if (opts.name) el.name = opts.name;
    if (opts.style) {
      Object.entries(opts.style).forEach((kv) => {
        el.style[kv[0]] = kv[1];
      });
    }
    return el;
  },
}
export default UI;