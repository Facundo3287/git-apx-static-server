import admin from 'firebase-admin';

let serviceAccount = JSON.parse(process.env.SERVICE_ACCOUNT!);
admin.initializeApp ( { credential: admin.credential.cert(serviceAccount as any), databaseURL: 'https://apx-chat-9e04b-default-rtdb.firebaseio.com/' } );
let firestore = admin.firestore();
let rtdb = admin.database();
// process.env.RENDER_APP_URL
console.log('---------------------------------------------------------', process.env);

export { firestore, rtdb }