<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
// import firebase from 'firebase'
// import 'firebase/firestore'
// import firebaseApp from 'firebase/app'
// import * as configs from './utils/firebase/config'
export default {
  name: 'App'
  // preFetch ({ store }) {
  //   // TODO: SET PRODUCTION CONFIG WHEN CI PUSHES TO PRODUCTION
  //   // const config = (process.env.DEV) ? configs.dev : configs.prod;
  //   // var configs = {
  //   //   apiKey: process.env.FIREBASE_API_KEY,
  //   //   authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  //   //   databaseURL: process.env.FIREBASE_DATABASE_URL,
  //   //   projectId: process.env.FIREBASE_PROJECT_ID,
  //   //   storageBucket: process.env.FIREBASE_STORAGE_BUCKET
  //   // }
  //   // console.log(firebaseApp)
  //   // firebase.initializeApp(configs)
  //   if (!firebase.apps.length) {
  //     firebaseApp.initializeApp(configs)
  //   }
  //   // const $db = firebase.firestore()
  //   // Put firebase functionality into
  //   // state for future access
  //   Object.assign(store.state, {
  //     $hello: 'helloworld'
  //   })
  // }
}
</script>
