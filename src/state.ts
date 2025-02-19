import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from "firebase/database";
import { goTo } from "./router";

let firebaseConfig = {
    authDomain: "apx-chat-9e04b.firebaseapp.com",
    databaseURL: "https://apx-chat-9e04b-default-rtdb.firebaseio.com/",
    projectId: "apx-chat-9e04b" };
let app = initializeApp(firebaseConfig);
let database = getDatabase(app);

type FuncionFlecha = () => void;

interface Data {
    menssajes: string [],
    idUser: string,
    roomIdLong: string,
    roomIdShort: string,
    nombre: string,
    email: string };

interface State {
    data: Data;
    listeners: FuncionFlecha[];
    getState(): Data;
    setAccount(nombre: string, email: string): void;
    verification(nombre: string, email: string): void;
    newAccount(): void;
    newRoom(): void;
    saveRoom(): void;
    conectedRealtime(roomIdLong: string): void;
    searchRoom(roomIdShort: string): void;
    newMessaje(mensaje: string): void;
    setState(nuevaData: Data): void;
    suscribirse(sub: FuncionFlecha): void };

export let state: State = {
    data: {
        menssajes: [],
        idUser: '',
        roomIdLong: '',
        roomIdShort: '',
        nombre: '',
        email: '' },
    listeners: [],

    getState(): Data {
        return this.data },

    setAccount(nombre: string, email: string) {
        this.data.email = email;
        this.data.nombre = nombre },

    verification(nombre: string, email: string): void {
        this.setAccount(nombre, email);
        let body = { 
            nombre: nombre, 
            email: email };
        let config = { 
            method: 'POST', 
            body: JSON.stringify(body),
            headers: { "Content-Type": "application/json; charset=UTF-8" }  };
        fetch('http://localhost:8000/verification', config)
        .then( (response) => { return response.json() } )
        .then( (data) => { 
            if (data.verificacion == false) {
                this.newAccount() }
            else if (data.verificacion == true) {
                console.log(data.id, ' ya tenia cuenta');
                this.data.idUser = data.id;
                goTo('/Room') } 
        })
    },

    newAccount(): void {
        let body = { 
            nombre: this.data.nombre, 
            email: this.data.email };
        let config = { 
            method: 'POST', 
            body: JSON.stringify(body),
            headers: { "Content-Type": "application/json; charset=UTF-8" } };
        fetch('http://localhost:8000/newAccount', config)
        .then( (response) => { return response.json() } )
        .then( (data) => { 
            if (data.registro == true) {
                console.log(data.id, ' nueva cuenta');
                this.data.idUser = data.id;
                goTo('/Room') }
        })
     },

     newRoom(): void {
        let body = { userId: this.data.idUser };
        let config = { 
            method: 'POST', 
            body: JSON.stringify(body),
            headers: { "Content-Type": "application/json; charset=UTF-8" } };
        fetch('http://localhost:8000/newRoom', config)
        .then( (response) => { return response.json() } )
        .then( (data) => { 
            if (data.newRoom == true) {
                console.log('nueva room');
                this.data.roomIdLong = data.longId;
                this.data.roomIdShort = data.shortId;
                this.saveRoom();
                this.conectedRealtime(data.longId);
                goTo('/Chat') }
            else if (data.newRoom == false) {
                console.error('error al crear la room') }
        })
     },

    saveRoom(): void {
        let body = { roomIdLong: this.data.roomIdLong, roomIdShort: this.data.roomIdShort };
        let config = { 
            method: 'POST', 
            body: JSON.stringify(body),
            headers: { "Content-Type": "application/json; charset=UTF-8" } };
        fetch('http://localhost:8000/saveRoom', config)
    },

    conectedRealtime(roomIdLong: string): void {
        let refNew = `Rooms/${roomIdLong}`;
        let roomRef = ref(database, refNew); //
        onValue(roomRef, (snapshot) => {
            let data = snapshot.val();
            let valores = Object.values(data);
            if (valores.length > 1) {
                let valoresMenssajes = Object.values(data.menssajes);
                let ultimoMenssaje = valoresMenssajes[valoresMenssajes.length - 1];
                let dataVieja = this.getState();
                let dataNueva = { ...dataVieja };
                dataNueva.menssajes.push(ultimoMenssaje!.toString());
                this.setState(dataNueva) }
            });
    },

    searchRoom(roomIdShort: string): void {
        let body = { roomIdShort: roomIdShort };
        let config = { 
            method: 'POST', 
            body: JSON.stringify(body),
            headers: { "Content-Type": "application/json; charset=UTF-8" } };
        fetch('http://localhost:8000/searchRoom', config)
        .then( (response) => { return response.json() } )
        .then( (data) => { 
            if (data.busqueda == true) { 
                this.data.roomIdShort = roomIdShort;
                this.data.roomIdLong = data.roomIdLong.room;
                this.conectedRealtime(data.roomIdLong.room.toString()); //
                goTo('/Chat') }
            else if (data.busqueda == false) { 
                console.log('no se encontro la room') }
        })
    },

    newMessaje(menssaje: string): void {
        console.log(this.data);
        let body = { roomIdLong: this.data.roomIdLong , content: menssaje };
        let config = { 
            method: 'POST', 
            body: JSON.stringify(body),
            headers: { "Content-Type": "application/json; charset=UTF-8" } };
        fetch('http://localhost:8000/newMessaje', config)
        .then( (aux) => { return aux.text() } )
        .then( (resultado) => { console.log(resultado) } )
        .catch( (err) => { console.log('error') } )
    },

    setState(nuevaData: Data): void {
        this.data = nuevaData;
        for (let aux of this.listeners) { 
            aux() } 
    },

    suscribirse(sub: FuncionFlecha): void {
        this.listeners.push(sub) }
}