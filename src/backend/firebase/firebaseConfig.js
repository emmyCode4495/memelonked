// firebase.js
const admin = require('firebase-admin');
const serviceAccount = require('/Users/mac/Desktop/Bonkproject/memelonked/src/backend/serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

module.exports = db;
