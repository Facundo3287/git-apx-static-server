import { firestore, rtdb } from './db';
import express from 'express';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';

function obtenerFecha () {
    let ahora = new Date();
    let horas: any = ahora.getHours();
    let minutos: any = ahora.getMinutes();
    let segundos: any = ahora.getSeconds();
    horas = horas < 10 ? '0' + horas : horas;
    minutos = minutos < 10 ? '0' + minutos : minutos;
    segundos = segundos < 10 ? '0' + segundos : segundos;
    let resultado: any = horas + ':' + minutos + ':' + segundos;
    return resultado };

let app = express();
app.use(cors());
app.use( express.json() );
app.use(express.static('dist'));
let port = process.env.PORT || 4000;

app.post('/verification', (req, res) => {
    let query = firestore.collection('usuarios').where('nombre', '==', req.body.nombre);
    query.get().then(querySnapshot => {
        if (querySnapshot.size == 1) {
            querySnapshot.forEach(documentSnapshot => {
                let path: string = documentSnapshot.ref.path;
                let idUser: string = path.slice(9);
                let respuesta = {verificacion: true, id: idUser};
                res.json(respuesta) });
        } 
        else if (querySnapshot.size == 0) {
            let respuesta = { verificacion: false };
            res.send(respuesta) 
        }
    });
});

app.post('/newAccount', (req, res) => {
    let id: string = uuidv4();
    let collectionRef = firestore.collection('usuarios');
    let documentRef = collectionRef.doc(id);
    documentRef.set(req.body).then( (aux) => { 
        let respuesta = {registro: true, id: id};
        res.json(respuesta) } )
});

app.post('/newRoom', (req, res) => { 
    let longId: string = uuidv4();
    let shortId: string = longId.slice(0, 5);
    let roomData = { creador: req.body.userId };
    rtdb.ref(`/Rooms/${longId}`)
    .set(roomData)
    .then( (aux) => { 
        let respuesta = { newRoom: true, longId: longId, shortId: shortId };
        res.json(respuesta) } )
    .catch( (err) => { 
        let respuesta = { newRoom: false };
        res.send(respuesta) } )
});

app.post('/saveRoom', (req, res) => {
    let contenido = { room: req.body.roomIdLong };
    let respuesta = { registro: true };
    let documentRef = firestore.doc(`rooms/${req.body.roomIdShort}`);
    documentRef.set(contenido)
    .then( aux => { res.json(respuesta) } );
});

app.post('/searchRoom', (req, res) => {
    let documentRef = firestore.doc(`rooms/${req.body.roomIdShort}`);
    documentRef.get().then(documentSnapshot => {
        if (documentSnapshot.exists) {
            let data = documentSnapshot.data();
            let respuesta = { busqueda: true, roomIdLong: data };
            res.json(respuesta) }
        else {
            let respuesta = { busqueda: false };
            res.json(respuesta) }
    })
});

app.post('/newMessaje', (req, res) => {
    let segundos: any = obtenerFecha();
    rtdb.ref(`/Rooms/${req.body.roomIdLong}/menssajes/${segundos}`)
    .set(req.body.content)
    .then( (aux) => { res.send('el mensaje llego a la base de datos') } )
    .catch( (err) => { res.send('error al guardar el mensaje en la basee de datos') } ) 
});

app.get('*', (req, res) => {
    res.sendFile(__dirname + '/dist/index.html')
});

app.listen( port, () => { console.log('server encendido...') } )