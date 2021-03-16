import  UI  from './ui';
class Result {

	constructor(parentEl) {
		this.el = UI.createElement('div', { border: '1px solid gray', height: '10em' ,visibility:'hidden'}, parentEl);
	}
	update(data) {
		console.log(data);
		var content=data.toString();
		//var separator='/\n/';
		//var content=UI.createElement('pre',{},this.el);
		//content.value=data.toString();
		var lignes =content.split(/\\n/);
		console.log(lignes);
		this.el.innerHTML ="";
		lignes.forEach((row)=>{
			this.el.innerHTML += row.replace(/[",{,}]/ig,'') + '<br>'; 
		});
		this.el.style.visibility='visible';
	}
	clear(){
		this.el.innerHTML ="";
		this.el.style.visibility='visible';
	}
}
export default Result;