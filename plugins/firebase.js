import firebase from 'firebase'

var config = {
  apiKey: 'AIzaSyDG4fYWJpq2Q0_T761yLKq1U4QexVa4rkQ',
  authDomain: 'ideka-ed039.firebaseapp.com',
  databaseURL: 'https://ideka-ed039.firebaseio.com',
  projectId: 'ideka-ed039',
  storageBucket: 'ideka-ed039.appspot.com',
  messagingSenderId: '337876211756'
}
let app = null
if (!firebase.apps.length) {
  app = firebase.initializeApp(config)
}

export const db = app.database()
export const msgRef = db.ref('messages')
export const userRef = db.ref('users')
