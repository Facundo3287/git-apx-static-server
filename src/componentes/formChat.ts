import { state } from "../state";

export function agregarFch () {
    class MiFch extends HTMLElement {
        form?: HTMLFormElement;
        chat?: HTMLElement;
        input?: HTMLInputElement;
        ultimoMenssaje?: string;
        constructor() {
            super();
            this.render();
            this.form;
            this.chat;
            this.input;
            this.ultimoMenssaje;
            this.event();
            this.getMenssajes() }
           
        render() {
            let form: HTMLFormElement = document.createElement('form');
            let chat: HTMLElement = document.createElement('div');
            let input: HTMLInputElement = document.createElement('input');
            let submit: HTMLElement = document.createElement('input');
            form.setAttribute('class', 'form');
            chat.setAttribute('class', 'chat');
            input.setAttribute('class', 'input');
            input.setAttribute('type', 'text');
            submit.setAttribute('class', 'submit');
            submit.setAttribute('type', 'submit');
            submit.setAttribute('value', 'Enviar');
            this.form = form;
            this.chat = chat;
            this.input = input;
    
            let style: HTMLElement = document.createElement('style');
            style.innerHTML = `
                .form {
                width: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: flex-start  }

                .chat {
                box-sizing: border-box;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: flex-end;
                margin-top: 10px;
                margin-bottom: 10px;
                outline: 1px solid red;
                padding: 10px;
                width: 100%;
                max-width: 600px;
                height: 400px  }

                .mensaje--local{
                box-sizing: border-box;
                margin: 5px;
                align-self: self-end;
                background-color: cadetblue;
                border-radius: 10px;
                padding-top: 3px;
                padding-bottom: 3px;
                padding-left: 10px;
                padding-right: 10px;
                font-weight: 900;
                font-family: 'Courier New', Courier, monospace  }

                .mensaje--remoto{
                box-sizing: border-box;
                margin: 5px;
                align-self: self-start;
                background-color: coral;
                border-radius: 10px;
                padding-top: 3px;
                padding-bottom: 3px;
                padding-left: 10px;
                padding-right: 10px;
                font-weight: 900;
                font-family: 'Courier New', Courier, monospace  }
                
                .input {
                margin-bottom: 10px;
                border: 1px solid grey
                border-radius: 5px;
                width: 70vw;
                max-width: 600px;
                height: 5vh }
                
                .submit {
                color: black;
                font-weight: 900;
                font-size: 18px;
                font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
                background-color:darksalmon;
                border: none;
                border-radius: 5px;
                width: 100%;
                max-width: 600px;
                height: 7vh }`;

            let shadow: ShadowRoot = this.attachShadow( { mode:'open' } );
            form.appendChild(chat);
            form.appendChild(input);
            form.appendChild(submit);
            shadow.appendChild(form);
            shadow.appendChild(style) };

        event() {
            this.form!.addEventListener('submit', (e: Event) => { 
                e.preventDefault();
                this.ultimoMenssaje = this.input!.value;
                state.newMessaje(this.input!.value);
                let mensaje: HTMLElement = document.createElement('p');
                mensaje.setAttribute('class', 'mensaje--local');
                mensaje.textContent = this.input!.value;
                this.chat!.appendChild(mensaje);
                this.input!.value = '' })
        };

        getMenssajes() {
            state.suscribirse(() => {
                let data = state.getState();
                if (data.menssajes[data.menssajes.length - 1] != this.ultimoMenssaje) {
                    let mensaje: HTMLElement = document.createElement('p');
                    mensaje.setAttribute('class', 'mensaje--remoto');
                    mensaje.textContent = data.menssajes[data.menssajes.length - 1];
                    this.chat!.appendChild(mensaje) }
            }) 
        }
        
    };
    customElements.define('mi-fch', MiFch)
}