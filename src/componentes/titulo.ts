import { state } from "../state";

export function agregarTitulo () {
    class MiTitulo extends HTMLElement {
        constructor() {
            super();
            this.render() }
            
        render() {
            let titulo: HTMLElement = document.createElement('h1');
            titulo.setAttribute('class', 'titulo');
            let size: string = '';

            if (this.getAttribute('modo') == 'titulo') {
                size = `40px`;
                titulo.textContent = this.getAttribute('texto') }
            else if (this.getAttribute('modo') == 'subtitulo') {
                size = `20px`;
                let data = state.getState();
                titulo.textContent = `room id: ${data.roomIdShort}` };
                
            let style: HTMLElement = document.createElement('style');
            style.innerHTML = `
                .titulo {
                margin: 0px;
                margin-top: 5px;
                font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
                font-weight: 600;
                font-size: ${size};
                color: black }`;
            let shadow: ShadowRoot = this.attachShadow( { mode:'open' } );
            shadow.appendChild(titulo);
            shadow.appendChild(style) }
    };
    customElements.define('mi-titulo', MiTitulo)
}