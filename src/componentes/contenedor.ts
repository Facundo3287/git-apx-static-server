export function agregarContenedor () {
    class MiContenedor extends HTMLElement {
        constructor() {
            super();
            this.etiquetas;
            this.estilos;
            this.render() }

        etiquetas() {
            let main: HTMLElement = document.createElement('main');
            main.setAttribute('class', 'main');
            main.innerHTML = this.innerHTML;
            return main };

        estilos() {
            let style: HTMLElement = document.createElement('style');
            style.innerHTML = `
                .main {
                margin: auto;
                margin-top: 10px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: flex-start;
                width: 90% }`;
            return style };
            
        render() {
            let main = this.etiquetas();
            let style = this.estilos();
            let shadow: ShadowRoot = this.attachShadow( { mode:'open' } );
            shadow.appendChild(main);
            shadow.appendChild(style) }
    };
    customElements.define('mi-contenedor', MiContenedor)
}