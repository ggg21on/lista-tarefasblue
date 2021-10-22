import firebase  from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

const firebaseConfig = {
        apiKey: "AIzaSyCI---e2iAKeNkm7bTnkUMHGzDUsMp9GOM",
        authDomain: "todo-list-vue-a5f2c.firebaseapp.com",
        projectId: "todo-list-vue-a5f2c",
        storageBucket: "todo-list-vue-a5f2c.appspot.com",
        messagingSenderId: "20563236762",
        appId: "1:20563236762:web:c28e0d5164fe2c67d14c23"
      };

    firebase.initializeApp(firebaseConfig)

    const db = firebase.firestore()
    const auth = firebase.auth()

    const profileCollection = db.collection('profile')
    const tasksCollection = db.collection ('tasks')

    export {
        db, auth, profileCollection, tasksCollection
    }