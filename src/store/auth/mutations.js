// export function setAuthState (state, isAuthenticated, isReady) {
//     st
// }

export function setAuthState (state, data) {
  state.isAuthenticated = data.isAuthenticated
  state.isReady = data.isReady
  state.uid = data.uid
}
