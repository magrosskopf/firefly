const functions = require('firebase-functions');
const cors = require('cors')({origin: true});   
const admin = require('firebase-admin');
admin.initializeApp();
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//


 exports.enterFence = functions.https.onRequest((request, response) => {
     return cors(request, response, () => {
        admin.messaging().sendToDevice(request.body.reqToken, { notification: { title: "Schwestasder Ewa", body: 'Lichtgang'}});
        response.send({message: "send"});
    });
});

