import UI from './ui';

class PageUI {

    constructor(parentEl, title, name) {
        this.parentEl = parentEl;
        this.title = title;
        this.name = name;

        this.container = this.createContainer(this.parentEl);
        this.hide();

        this.header = this.createHeader(this.container, this.title);
        this.content = this.createContent(this.container);

        this.loading = this.createLoading(this.container);
    }

    show() {
        this.container.style.display = 'block';
    }

    hide() {
        this.container.style.display = 'none';
    }

    clearContent() {
        this.content.innerHTML = "";
    }


    createContainer(parentEl) {
        const mP = UI.createElement('div', {
            display: 'inline',
            width: '100%',
            height: '100%',
            marginRight: '1em',
            marginTop: 0,
            // visibility: 'hidden'
        }, parentEl);
        return mP;
    }

    createHeader(parentEl, title) {
        const header = UI.createElement('div', {
            color: 'black',
            fontSize: '40px',
            fontWeight: 'bold',
            paddingBottom: '10px',
        }, parentEl);
        header.innerHTML = title;
        return header;
    }

    createContent(parentEl) {
        let content = UI.createElement('div', {
            fontFamily: 'sans-serif'
        }, parentEl);
        return content;
    }

    createLoading(parentEl) {
        const loading = UI.createElement('div', { display: 'none' }, parentEl);
        loading.innerHTML = "Loading ...";
        return loading;
    }

    showLoading() {
        this.content.style.display = 'none';
        this.loading.style.display = 'block';
        this.show();
    }

    hideLoading() {
        this.content.style.display = 'block';
        this.loading.style.display = 'none';
    }

    setOnEvent(fn) {
        this.onEventFn = fn;
    }

    onEvent(action, data) {
        if (this.onEventFn) this.onEventFn(action, data);
    }
}
export default PageUI;