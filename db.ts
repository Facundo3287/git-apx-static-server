import admin from 'firebase-admin';

console.log(process.env.SERVICE_ACCOUNT);
let serviceAccount = JSON.parse(process.env.SERVICE_ACCOUNT!);
admin.initializeApp ( { credential: admin.credential.cert(serviceAccount as any), databaseURL: 'https://apx-chat-9e04b-default-rtdb.firebaseio.com/' } );
let firestore = admin.firestore();
let rtdb = admin.database();

export { firestore, rtdb }