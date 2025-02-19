export function agregarNav () {
    class MiNav extends HTMLElement {
        constructor() {
            super();
            this.render() }
            
        render() {
            let nav: HTMLElement = document.createElement('nav');
            nav.setAttribute('class', 'nav');
            let style: HTMLElement = document.createElement('style');
            style.innerHTML = `
                .nav {
                width: 100%;
                height: 40px;
                background-color: blueviolet }`;
            let shadow: ShadowRoot = this.attachShadow( { mode:'open' } );
            shadow.appendChild(nav);
            shadow.appendChild(style) }
    };
    customElements.define('mi-nav', MiNav)
}