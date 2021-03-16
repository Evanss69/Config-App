import UI from './ui';

class dataList {

    constructor(parentEl, id, list, onChange) {
        //  console.log(id);
        this.el = UI.createElement('datalist', {}, parentEl);
        this.el.id = id.value;
        this.el.addEventListener('change', onChange);

        list.forEach((value) => {
            let opt = UI.createElement('option', {}, this.el);
            opt.text = value;
            opt.value = value;
        });

        let hiddenWifi = UI.createElement('option', {}, this.el);
        hiddenWifi.text = 'name your hidden wifi';
        hiddenWifi.value = hiddenWifi.text;
        //return dataList;

    }

    modifyList(datalist, newList) {
        //the last element in the datalist is hidden network we need to conserve this 
        //datalist equals
        if (datalist.options.length - 1 == newList.length) {
            for (var i = 0; i < datalist.options.length - 1; i++) {
                datalist.options[i].value = newList[i];
                datalist.options[i].text = newList[i];
            }
            //datalist bigger
        } else if (datalist.options.length - 1 > newList.length) {
            for (var i = 0; i < datalist.options.length - 1; i++) {
                if (newList[i]) {
                    datalist.options[i].value = newList[i];
                    datalist.options[i].text = newList[i];
                } else {
                    datalist.options[i].remove();
                }
            }
        } else {
            //datalist smaller
            var lastIndex = datalist.options[datalist.options.length - 1].value;
            var diffItem = (newList.length) - (datalist.options.length - 1);
            for (var j = 0; j < diffItem; j++) {
                var opt = UI.createElement('option', {}, datalist);
                opt.text = " ";
            }
            for (var i = 0; i < newList.length; i++) {
                datalist.options[i].value = newList[i];
                datalist.options[i].text = newList[i];
            }
            datalist.options[datalist.options.length - 1].text = lastIndex;
            datalist.options[datalist.options.length - 1].value = lastIndex;
        }
        return datalist;
    }

}
export default dataList;
