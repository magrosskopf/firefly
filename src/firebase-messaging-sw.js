importScripts('https://www.gstatic.com/firebasejs/5.4.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/5.4.2/firebase-messaging.js');

firebase.initializeApp({
    'messagingSenderId': '862054772046'
});

const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler( payload => {
    const title = 'hello world';
    const options = {
        body: payload
    }
    return self.registration.showNotification(title, options)
})