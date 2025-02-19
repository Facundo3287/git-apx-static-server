import { state } from "../state";

export function agregarFr () {
    class MiFr extends HTMLElement {
        form?: HTMLFormElement;
        inputRoom?: HTMLSelectElement;
        inputId?: HTMLInputElement;
        constructor() {
            super();
            this.form;
            this.inputRoom;
            this.inputId;
            this.render();
            this.eventSelect();
            this.eventForm() }
           
        render() {
            let form: HTMLFormElement = document.createElement('form');
            let labelRoom: HTMLElement = document.createElement('label');
            let labelId: HTMLElement = document.createElement('label');
            let inputRoom: HTMLSelectElement = document.createElement('select');
            let optionA: HTMLOptionElement = document.createElement('option');
            let optionB: HTMLOptionElement = document.createElement('option');
            let inputId: HTMLInputElement = document.createElement('input');
            let submit: HTMLElement = document.createElement('input');
            form.setAttribute('class', 'form');
            this.form = form;
            labelRoom.setAttribute('class', 'label');
            labelRoom.textContent = 'Room';
            labelId.setAttribute('class', 'label');
            labelId.setAttribute('hidden', '');
            labelId.textContent = 'Id Room';
            inputRoom.setAttribute('class', 'input input--select');
            inputRoom.setAttribute('type', 'text');
            inputRoom.setAttribute('required', 'true');
            optionA.textContent = 'Nueva Room';
            optionA.setAttribute('class', 'input');
            optionB.textContent = 'Room existente';
            optionB.setAttribute('class', 'input');
            inputId.setAttribute('class', 'input');
            inputId.setAttribute('type', 'text');
            inputId.setAttribute('hidden', '');
            inputId.placeholder = 'Id de la Room';
            this.inputRoom = inputRoom;
            this.inputId = inputId;
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
                border: 1px solid black;
                border-radius: 0px;
                width: 70vw;
                height: 5vh }

                .input--select {
                width: 71.5vw;
                height: 5.5vh }
                
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
            inputRoom.appendChild(optionA);
            inputRoom.appendChild(optionB);
            form.appendChild(labelRoom);
            form.appendChild(inputRoom);
            form.appendChild(labelId);
            form.appendChild(inputId);
            form.appendChild(submit);
            shadow.appendChild(form);
            shadow.appendChild(style) };

        eventSelect() {
            this.inputRoom!.addEventListener('change', () => {
                if (this.inputRoom!.value == 'Room existente') {
                    this.inputId!.removeAttribute('hidden');
                    this.inputId!.removeAttribute('required') }
                else if (this.inputRoom!.value == 'Nueva Room') {
                    this.inputId!.setAttribute('hidden', '');
                    this.inputId!.setAttribute('required', '') }
            })
        };

        eventForm() {
            this.form!.addEventListener('submit', (e: Event) => { 
                e.preventDefault();
                if (this.inputRoom!.value == 'Nueva Room') {
                    state.newRoom() }
                else if (this.inputRoom!.value == 'Room existente') {
                    state.searchRoom(this.inputId!.value)
                }
            })
        }
    };
    customElements.define('mi-fr', MiFr)
}