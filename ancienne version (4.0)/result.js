import { UI } from './ui';
class Result {

	constructor(name, parentEl) {
		this.el = UI.createElement('div', { border: '1px solid gray', height: '10em' }, parentEl);
		this.el.className = name;
	}
	update(data) {
		this.el.innerHTML = data;
	}
}
export default Result;