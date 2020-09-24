<template>
  <div class="">
    <input type="text" v-model="email">
    <input type="text" v-model="password">
    <button @click="register()">Submit</button>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    register () {
      console.log('registering right now')
      this.$firebase.auth().createUserWithEmailAndPassword(this.email, this.password).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code
        var errorMessage = error.message
        console.error(errorCode, errorMessage)
        // ...
      })
    }
  }
}
</script>
