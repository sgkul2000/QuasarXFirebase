import firebaseService from '../services/firebase'
import firebase from 'firebase'
export default async ({ store, Vue }) => {
  // const config = process.env.environments.FIREBASE_CONFIG
  var configs = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET
  }
  if (!firebase.apps.length) {
    // firebaseApp.initializeApp(configs)
    firebaseService.fBInit(configs)
  }
  firebaseService.auth().onAuthStateChanged((currentUser) => {
    firebaseService.handleOnAuthStateChanged(store, currentUser)
  }, (error) => {
    console.error(error)
  })

  Vue.prototype.$fb = firebaseService
  store.$fb = firebaseService

  // Validation that our service structure is working
  // with a firebase app instance. Does not validate a
  // valid API key.
  console.log(firebaseService.auth())
}
