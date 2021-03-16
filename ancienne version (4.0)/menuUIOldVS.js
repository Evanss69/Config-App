
    /*
    Ancienne version
    createMenuBar(title, parentEl, onMenuClick) {
        //console.log(title);
        for (var index = 0; index < title.length; index++) {
            let li = UI.createElement('li', { display: 'inline-flex', justifyContent:'space-between',position: 'relative', padding: '5px', textAlign: 'center', width: '20%', verticalAlign: 'middle' }, ul);
            this.bt = UI.createElement('button', { position:'relative',marginLeft:'200px',padding: '5px', color: 'tomato',  textDecoration: 'none', backgroundColor: 'black', border: 'none', cursor: 'pointer' }, li);
            this.bt.id = title[index];
            this.bt.name = title[index];
            this.bt.addEventListener('click', choiceMenu);
            if(onMenuClick){
                MenuUI.setOnMenuClick(onMenuClick,this.bt);
            }
            let text = UI.createElement('text', { fontSize: '20px' }, this.bt);
            text.innerHTML = title[index];
        }
      function  choiceMenu(evt) {
            //console.log(evt.currentTarget)
            const menuName = evt.currentTarget.name.toLowerCase();
            const listMenu = ['network', 'screen', 'bluetooth', 'sound'];
            var choice = document.getElementById(menuName);
            if (choice) {
                choice.hidden = false;
                choice.style.visibility = 'visible';
                choice.style.display = 'inline';
                for (var i = 0; i < listMenu.length; i++) {
                    if (listMenu[i] != menuName) {
                        if (document.getElementById(listMenu[i]) != null) {
                            var otherMenu = document.getElementById(listMenu[i]);
                            otherMenu.hidden = true;
                            otherMenu.style.visibility = 'hidden';
                            otherMenu.style.display = 'none';
                        }
    
                    }
                }
            } else { }
    
    
        }
        return menu;
    },
    setOnMenuClick(fn,bt) {
     //   console.log(this.bt)
        Menu.setOnMenuClick(fn, bt);
      }
      */