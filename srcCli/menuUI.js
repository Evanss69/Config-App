import UI from './ui';
// import Menu from './menu';
const MenuUI = {
    btnStyle: { textDecoration: 'none', cursor: 'pointer', color: 'tomato', fontFamily: 'Arial,Helvetica,sans-serif', display: 'inline-flex', justifyContent: 'space-between', position: 'relative', padding: '5px', textAlign: 'center', width: '20%', verticalAlign: 'middle' },

    init(parentEl) {
        let nav = UI.createElement('nav', { backgroundColor: 'black', padding: '5px' }, parentEl);
        let menu = UI.createElement('div', {}, nav);
        MenuUI.itemContainer = UI.createElement('ul', { listStyle: 'none', display: 'inline', width: '100%', position: 'relative' }, menu);
        MenuUI.addLogo();
    },

    addLogo() {
        let img = UI.createElement('img', { display: 'inline-flex', position: 'relative', justifyContent: 'space-between', width: '150px', height: '45px', verticalAlign: 'middle', paddingRight: '125px' }, MenuUI.itemContainer);
        img.src = 'dist/logo.png';
        img.alt = 'Deepidoo';
    },

    addItem(item, onMenuClick) {
        // console.log(item);
        let li = UI.createElement('li', MenuUI.btnStyle, MenuUI.itemContainer);
        li.innerHTML = item;
        li.dataset['item'] = item;
        li.addEventListener('click', onMenuClick);
    },

}
export default MenuUI