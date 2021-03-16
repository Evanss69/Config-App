import UI from './ui';
class Button {

	constructor(title, parentEl, clickFn) {
		this.el = UI.createElement('button', { margin: '10px' }, parentEl);
		this.el.innerText = title;
		this.callback = clickFn;
		/*	if (def && def == 'disconnected') {
				this.el.disabled = true;
			} else {
				this.el.disabled = false;
			}
	
			if (className) this.el.className = className;
			if (id != null) this.el.id = className + id;
		*/
		this.el.addEventListener('click', this.click.bind(this));
	}
	disabled() {
		this.el.disabled = true;
	}
	enabled() {
		this.el.disabled = false;
	}

	onClick(fn) {
		this.callback = fn;
	}
	setOnClick(fn) {
		this.callback = fn;
	}

	click(evt) {
		if (this.callback) {
			this.callback(evt);
		}
	}

}
export default Button;