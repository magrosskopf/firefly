const functions = require('firebase-functions');
const cors = require('cors')({origin: true});   
const admin = require('firebase-admin');

admin.initializeApp();
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//


 const db = admin.firestore();

const pay = {
  "message": {
    "token" : "",
    "notification": {
      "title": "FCM Message",
      "body": "This is a message from FCM"
    },
    "webpush": {
      "headers": {
        "Urgency": "high"
      },
      "notification": {
        "body": "This is a message from FCM to web",
        "requireInteraction": "true",
        "badge": "/badge-icon.png"
      }
    }
  }
};

 exports.enterFence = functions.https.onRequest((request, response) => {
     return cors(request, response, () => {
      pay.message.token = request.body.reqToken;
      console.log(request.body);
      admin.messaging().sendToDevice(request.body.reqToken, pay);
      response.send({message: pay});
    });
});

exports.getDiscoveredStores = functions.https.onRequest((request, response) => {
  return cors(request, response, () => {
    uid = request.body.uid;
    db.collection('customer/' + uid.uid + "/discoveredStores").get()
      .then((snapshot) => {
        console.log(snapshot.docs);
        snapshot.forEach((doc) => {
          console.log(doc.id, '=>', doc.data());
          response.send({message: snapshot.docs, doc});

        });

        return snapshot;
      })
  .catch((err) => {
    console.log('Error getting documents', err);
  });
  });
});  
