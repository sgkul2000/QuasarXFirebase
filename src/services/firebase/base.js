import firebase from 'firebase/app'
import 'firebase/auth'

/**
 * Gets Firebase's auth service
 * https://firebase.google.com/docs/reference/js/firebase.auth.html#callable
 * @return {Interface} The Firebase Auth service interface
 */
export const auth = () => {
  return firebase.auth()
}

/** Convenience method to initialize firebase app
 *
 * @param  {Object} config
 * @return {Object} App
 */
export const fBInit = (config) => {
  return firebase.initializeApp(config)
}

export const handleOnAuthStateChanged = async (store, currentUser) => {
  const initialAuthState = isAuthenticated(store)
  // Save to the store
  store.commit('auth/setAuthState', {
    isAuthenticated: currentUser !== null,
    isReady: true,
    uid: (currentUser ? currentUser.uid : '')
  })

  if (store.state.auth.isAuthenticated) {
    await store.dispatch('user/getCurrentUser', currentUser.uid)
  }
  // If the user loses authentication route
  // them to the login page
  if (!currentUser && initialAuthState) {
    store.dispatch('auth/routeUserToAuth')
  }
}

/**
 * @param  {Object} store - Vuex store
 */
export const isAuthenticated = (store) => {
  return store.state.auth.isAuthenticated
}

/**
   * remove firebase auth token
   */
export const logoutUser = () => {
  return auth().signOut()
}

export const ensureAuthIsInitialized = async (store) => {
  if (store.state.auth.isReady) return true
  // Create the observer only once on init
  return new Promise((resolve, reject) => {
    // Use a promise to make sure that the router will eventually show the route after the auth is initialized.
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      resolve()
      unsubscribe()
    }, () => {
      reject(new Error('Looks like there is a problem with the firebase service. Please try again later'))
    })
  })
}
