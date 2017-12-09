<template>
  <div class="welcome">
    <h1>Create a new player</h1>

    <input
      type="text"
      name="name"
      v-model="name"
      placeholder="Name"
    >
    <br>
    <input
      type="text"
      name="lastname"
      v-model="lastname"
      placeholder="Surname"
    >
    <br>
    <div class="error" v-html="error"></div>
    <br>
    <button>Cancel</button>
    <button @click="register">Save</button>
  </div>
</template>

<script>
  import PlayersService from '@/services/PlayersService'
  export default {
    data () {
      return {
        name: '',
        lastname: '',
        error: null
      }
    },
    methods: {
      async register(){
        try {
          await PlayersService.register({
            name: this.name,
            lastname: this.lastname
          })
        } catch(error) {
          this.error = error.response.data.error
        }
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .error {
    color: red ;
  }
</style>
