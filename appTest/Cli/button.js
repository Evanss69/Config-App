import {createElement} from './util';
class Button {

	constructor(title,parentEl){
		const button =createElement('button',{margin:'10px'},parentEl);
		button.innerText=title;
		button.addEventListener('click',() =>{
			this.click();
		});
	}
		
	onClick(callback) {
		this.callback=callback;	
		}
	click(){
		//console.log('click');
		if(this.callback) this.callback();				
		}	
    }
    export default Button;