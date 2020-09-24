/*
export function someAction (context) {
}
*/
import { firestoreAction } from 'vuexfire'
import User from '../../models/User.js'

export const addUserToUsersCollection = async function (state, userRef) {
  const
    { email } = state,
    user = new User({ email })
  return userRef.set(user)
}

export const createNewUser = async function ($root, data) {
  const $fb = this.$fb
  const { email, password } = data
  const fbAuthResponse = await $fb.createUserWithEmail(email, password)
  const id = fbAuthResponse.user.uid
  const userRef = $fb.userRef('users', id)
  return addUserToUsersCollection({ email }, userRef)
}

export const loginUser = async function ($root, payload) {
  const $fb = this.$fb
  const { email, password } = payload
  return $fb.loginWithEmail(email, password)
}

export const logoutUser = async function ({ state }) {
  await firestoreAction(({ unbindFirestoreRef }) => { unbindFirestoreRef('currentUser') })
  this.$fb.logoutUser()
}

export function routeUserToAuth () {
  this.$router.push({
    // name: 'Login'
    path: '/auth/login'
  })
}
