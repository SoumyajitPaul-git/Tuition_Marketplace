const admin = require("firebase-admin");
const serviceAccount = require("../firebase-key.json"); // Replace with actual path

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore(); // ✅ Firestore (not realtime)

module.exports = { admin, db };
