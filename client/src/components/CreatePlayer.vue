<template>
  <div class="welcome">
    <v-toolbar color="amber" app>
      <v-toolbar-title>Create new player</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <v-layout row justify-center>
          <v-form v-model="valid" xs8>
            <v-text-field
              label="Name"
              v-model="name"
              required
            ></v-text-field>
            <v-text-field
              label="Surname"
              v-model="lastname"
              required
            ></v-text-field>

            <v-btn @click="clear" flat color="orange">clear</v-btn>
            <v-btn
              @click="register"
              :disabled="!valid"
              color="orange"
            >
              submit
            </v-btn>
          </v-form>
        </v-layout>
        <!--<input
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
        >-->
        <br>
        <div class="error" v-html="error"></div>
        <br>
        <!--<button>Cancel</button>
        <button @click="register">Save</button>-->
      </v-container>
    </v-content>
    <v-footer app></v-footer>
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
      },
      clear () {
        this.$refs.form.reset()
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
