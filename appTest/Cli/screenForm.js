import {createElement} from './util';

class ScreenTableForm{
		
	constructor(def,parentEl){
		this.def=def;
		this.inputs = [];
		this.createTable(parentEl);
  }
  


	createTable(parentEl) {
		this.table = createElement('table', {width:'100%'}, parentEl);
    console.log(this.def);
    
    let rowIndex = 0;
    for(var [name, data] of Object.entries(this.def)) {
      console.log(`${name} => connected:${data.connected}, modes:${data.modes.length}`);
      this.createRow(rowIndex, name, data);
      rowIndex++;
    }
    
  }
  
  
  createRow(id, name, data) {
      const rowEl = createElement('tr', {}, this.table);
      this.inputs.push([]);
      
      const content = data.connected ? "&check;" : "&cross;";
      this.createCell(rowEl, this.inputs[id], {content: content, value: data.connected, dataset: { connected: data.connected } });
      
      this.createCell(rowEl, this.inputs[id], { dataset: { name: name }, content: name, value: name });

      let modesEl = this.createCell(rowEl, this.inputs[id], { dataset: { mode: data.modes }});
      this.createSelect(modesEl, name, data.modes, this.inputs[id], this.modesSelected.bind(this)); 
  }

  createCell(rowEl, inputs, opts={}) {
    let el = createElement('td', {}, rowEl);
    if(opts.dataset) {
      Object.entries(opts.dataset).forEach((kv) => {
        el.dataset[kv[0]] = kv[1];
      });
    }
    
    if(opts.content) el.innerHTML = opts.content;
    if(opts.value) el.value = opts.value;
    
    // inputs.push(el);
    return el;
  }

  createSelect(parentEl, name, values, inputs, onChange) {
    
    let modesSelect = createElement('select', {}, parentEl);
    inputs.push(modesSelect);
    modesSelect.dataset['name'] = name;

    if(values.length == 0) {
      modesSelect.disabled = true;
      return;
    }
    modesSelect.addEventListener('change', onChange);

    values.forEach((mode)=>{
      let opt = createElement('option', {}, modesSelect);
      opt.text = `${mode.width}x${mode.height}@${mode.rate}`;
    });

    

    return modesSelect;
  }


	modesSelected(evt){
    console.log(evt.target.value);
    console.log(this.getData());
  }

	getData(){
		const data = [];
                this.inputs.forEach((row) => {
                      const select = row[0];
                      data.push({ name: select.dataset['name'], value: select.value });
                      /*

                        let res = row.reduce((acc, el) => {
                                acc[el.dataset.connected] = el.value;
                                acc[el.dataset.name]=el.value;
                                acc[el.dataset.modes]=el.value;
                                return acc;
                        }, {});
                        data.push(res);
                        */
                });
                
                return data;

	}
}

export default ScreenTableForm;
/*import {createElement} from './util';
const screenForm ={
     updateVideoForm(container, data) {
    var table = createElement('table', {width: '100%'}, container);
    Object.keys(data).forEach(k=>{
      //console.log(k);
      screenForm.addVideoLine(table, k, data[k])
    });
  },
   addVideoLine(container, name, def) {
    //console.log(name);
    var row = createElement('tr', {}, container);
    row.className=name; 
    var connected = createElement('td', {}, row);
    connected.innerHTML = def.connected ? "&check;" : "&cross;";
    connected.className=row.className;
    var nameEl = createElement('td', {}, row);
    nameEl.innerHTML = name;
    nameEl.className=name;
    var modes = createElement('td', {}, row);
    modes.className=row.className;
    var modesSelect = createElement('select', {}, modes);
    modesSelect.className=row.className;
    if(def.modes.length == 0) {
      modesSelect.disabled = true;
    } 
    else {
      def.modes.forEach((mode) => {
        
        var opt = createElement('option', {}, modesSelect);
        opt.text = `${mode.width}x${mode.height}@${mode.rate}`;
      });
      modesSelect.addEventListener('change', screenForm.modeSelected);
    }
    
  },

   modeSelected(evt) {
   //console.log(evt.target.parentElement.parentElement);
   var myModeChoice=document.getElementsByClassName(evt.target.class);
    console.log(myModeChoice);
      return myModeChoice;
  }
};
export default screenForm;
/*class ScreenForm{
createTableV2:	createTable(parentEl) {
		this.table = createElement('table', {width:'100%'}, parentEl);
		console.log(this.def);
			Object.keys(this.def).forEach((obj,o) => {
				
				var data = this.def[obj];
			
			const rowEl = createElement('tr', {}, this.table);
			this.inputs.push([]);
    
      let connected = createElement('td', {}, rowEl);
      connected.innerHTML = data.connected ? "&check;" : "&cross;";
      connected.value =data.connected;
      connected.dataset["connected"]='connected:';
      this.inputs[o].push(connected);
      
			let nameEl = createElement('td', {}, rowEl);
      nameEl.innerHTML = obj;
      nameEl.value =obj;
      nameEl.dataset["name"]='name:';
			this.inputs[o].push(nameEl);
				
        let modes = createElement('td', {}, rowEl);
        modes.dataset["modes"]='mode:';
				this.inputs[o].push(modes);
				let modesSelect = createElement('select', {}, modes);
				modesSelect.addEventListener('change',ScreenTableForm.modesSelected);
				if(data.modes.length == 0) {
					modesSelect.disabled = true;
				  } else{
						data.modes.forEach((mode)=>{				  
							let opt = createElement('option', {}, modesSelect);
							opt.text = `${mode.width}x${mode.height}@${mode.rate}`;
							
						  })
					}
										
		});
	}
      constructor(data){
              //const screenForm;

      }
     updateVideoForm(container, data) {
    var table = createElement('table', {width: '100%'}, container);
    Object.keys(data).forEach(k=>{
      //console.log(k);
      screenForm.addVideoLine(table, k, data[k])
    });
  }
   addVideoLine(container, name, def) {
    //console.log(name);
    var row = createElement('tr', {}, container);
    row.className=name; 
    var connected = createElement('td', {}, row);
    connected.innerHTML = def.connected ? "&check;" : "&cross;";
    connected.className=row.className;
    var nameEl = createElement('td', {}, row);
    nameEl.innerHTML = name;
    nameEl.className=name;
    var modes = createElement('td', {}, row);
    modes.className=row.className;
    var modesSelect = createElement('select', {}, modes);
    modesSelect.className=row.className;
    if(def.modes.length == 0) {
      modesSelect.disabled = true;
    } 
    else {
      def.modes.forEach((mode) => {
        
        var opt = createElement('option', {}, modesSelect);
        opt.text = `${mode.width}x${mode.height}@${mode.rate}`;
      });
      modesSelect.addEventListener('change', screenForm.modeSelected);
    }
    
  }

   modeSelected(evt) {
   //console.log(evt.target.parentElement.parentElement);
   var myModeChoice=document.getElementsByClassName(evt.target.classList);
    console.log(myModeChoice);
      return myModeChoice;
  }
};*/