import { state } from "../state";

export function agregarFc () {
    class MiFc extends HTMLElement {
        form?: HTMLFormElement;
        inputNombre?: HTMLInputElement;
        inputEmail?: HTMLInputElement;
        constructor() {
            super();
            this.form;
            this.inputNombre;
            this.inputEmail;
            this.render();
            this.event() }
           
        render() {
            let form: HTMLFormElement = document.createElement('form');
            let labelNombre: HTMLElement = document.createElement('label');
            let labelEmail: HTMLElement = document.createElement('label');
            let inputNombre: HTMLInputElement = document.createElement('input');
            let inputEmail: HTMLInputElement = document.createElement('input');
            let submit: HTMLElement = document.createElement('input');
            form.setAttribute('class', 'form');
            this.form = form;
            labelNombre.setAttribute('class', 'label');
            labelNombre.textContent = 'Nombre';
            labelEmail.setAttribute('class', 'label');
            labelEmail.textContent = 'Email';
            inputNombre.setAttribute('class', 'input');
            inputNombre.setAttribute('type', 'text');
            inputNombre.setAttribute('required', 'true');
            inputEmail.setAttribute('class', 'input');
            inputEmail.setAttribute('type', 'text');
            inputEmail.setAttribute('required', 'true');
            this.inputNombre = inputNombre;
            this.inputEmail = inputEmail;
            submit.setAttribute('class', 'submit');
            submit.setAttribute('type', 'submit');
            submit.setAttribute('value', 'Enviar');
    
            let style: HTMLElement = document.createElement('style');
            style.innerHTML = `
                .form {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: flex-start  }

                .label {
                margin-bottom: 5px;
                font-weight: 190;
                font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
                align-self: start }
                
                .input {
                margin-bottom: 20px;
                border: 1px solid grey
                border-radius: 5px;
                width: 70vw;
                height: 5vh }
                
                .submit {
                margin-top: 20px;
                color: black;
                font-weight: 900;
                font-size: 18px;
                font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
                background-color:darksalmon;
                border: none;
                border-radius: 5px;
                width: 30vw;
                height: 7vh }`;

            let shadow: ShadowRoot = this.attachShadow( { mode:'open' } );
            form.appendChild(labelNombre);
            form.appendChild(inputNombre);
            form.appendChild(labelEmail);
            form.appendChild(inputEmail);
            form.appendChild(submit);
            shadow.appendChild(form);
            shadow.appendChild(style) };

        event() {
            this.form!.addEventListener('submit', (e: Event) => { 
                e.preventDefault();
                state.verification(this.inputNombre!.value, this.inputEmail!.value) })
        }
    };
    customElements.define('mi-fc', MiFc)
}