var firebaseConfig = {
    apiKey: "AIzaSyBWmy9wW0K2B8K8dKI99UeALrptJqYf8s4",
    authDomain: "planbackend-38c65.firebaseapp.com",
    projectId: "planbackend-38c65",
    storageBucket: "planbackend-38c65.appspot.com",
    messagingSenderId: "219619637947",
    appId: "1:219619637947:web:d2d6a364f3f076111e079e",
    measurementId: "G-97V65Z4ZC1",
  };

  let lol = process.env.LOL
  console.log(lol)

  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();