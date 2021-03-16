//menu.js
import MenuUI from './menuUI';
//import Page from './page';


const Menu = {
   init(parentEl, items, onClick) {
      // console.log(setOnClick)

      Menu.notifyApp = onClick;
      //console.log("before MenuUI.init");
      MenuUI.init(parentEl);

      items.forEach((item) => {
         //console.log("addItem " + item);
         MenuUI.addItem(item, Menu.onItemClick);
      });
   },

   onItemClick(evt) {
      const item = evt.target.dataset['item'];
      Menu.notifyApp(item);
   },

   /*
  setOnMenuClick(callback,bt) {
     // console.log(callback)
      bt.addEventListener('click',callback);
      },
      */
}
export default Menu
