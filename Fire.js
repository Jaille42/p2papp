import firebase from 'firebase'; 

class Fire {
  constructor() {
    this.init();
    this.observeAuth();
  }

  init = () =>
    firebase.initializeApp({
      apiKey: "AIzaSyAg124Bk-vyl2wFChyvZwcFbvX3Vj9LwgA",
      authDomain: "monappoklm.firebaseapp.com",
      databaseURL: "https://monappoklm.firebaseio.com",
      projectId: "monappoklm",
      storageBucket: "monappoklm.appspot.com",
      messagingSenderId: "996238771934",
      appId: "1:996238771934:web:3dc8755a5414ea7404a44f",
      measurementId: "G-74F4YD35E9"
    });

  observeAuth = () =>
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged);

  onAuthStateChanged = user => {
    if (!user) {
      try {
        firebase.auth().signInAnonymously();
      } catch ({ message }) {
        alert(message);
      }
    }
  };

  get ref() {
    return firebase.database().ref('messages');
  }

  on = callback =>
    this.ref
      .limitToLast(20)
      .on('child_added', snapshot => callback(this.parse(snapshot)));

  parse = snapshot => {
    const { timestamp: numberStamp, text, user } = snapshot.val();
    const { key: _id } = snapshot;
    const timestamp = new Date(numberStamp);
    const message = {
      _id,
      timestamp,
      text,
      user,
    };
    return message;
  }

  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }

  get timestamp() {
    return firebase.database.ServerValue.TIMESTAMP;
  }

  send = messages => {
    for (let i = 0; i < messages.length; i++) {
      const { text, user } = messages[i];
      const message = {
        text,
        user,
        timestamp: this.timestamp,
      };
      this.append(message);
    }
  };

  append = message => this.ref.push(message);

  off() {
    this.ref.off();
  }
}

Fire.shared = new Fire();
export default Fire;