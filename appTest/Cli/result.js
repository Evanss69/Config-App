import {createElement} from './util';
class Result {

	constructor(parentEl){
		this.el=createElement('div', {border: '1px solid gray', height: '10em'},parentEl);
	}
	update(data){
		this.el.innerHTML = data;
	}
}
export default Result;