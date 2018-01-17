<template>
    <v-container fluid grid-list-md>
      <v-layout row wrap>
        <!-- Panel containing zorgdrager and bewoner plus the summary-->
        <v-flex>
          <h1>Creëer een nieuwe profiel</h1>
          <v-content>
            <v-container fluid>
              <v-layout row justify-center>
                <v-form v-model="valid" xs8>
                  <v-text-field
                    label="Naam van de bewoner"
                    v-model="player.name"
                    required
                  />
                  <v-text-field
                    label="Achternaam van de bewoner"
                    v-model="player.lastname"
                    required
                  />

                  <v-btn flat color="deep-purple">terug</v-btn>
                  <v-btn
                    @click="register"
                    :loading="loading"
                    @click.native="loader = 'loading'"
                    :disabled="loading"
                    color="deep-purple"
                    dark
                  >
                    submit
                  </v-btn>
                </v-form>

                <v-snackbar
                  :timeout="timeout"
                  color="green"
                  v-model="snackbar"
                >
                  Player created, you can now select it from the list.
                  <v-btn dark flat @click.native="snackbar = false">Close</v-btn>
                </v-snackbar>

              </v-layout>
              <div class="error" v-html="error"></div>
            </v-container>
          </v-content>
        </v-flex>
      </v-layout>
    </v-container>
</template>

<script>
  import PlayersService from '@/services/PlayersService'
  import Panel from './Panel'
  import PlayerListItem from './PlayerListItem'

  export default {
    data () {
      return {
        caregiver: {
          name: ''
        },
        player: {
          name: '',
          lastname: ''
        },
        error: null,
        loader: null,
        valid: false,
        loading: false,
        snackbar: false,
        timeout: 3000,
      }
    },
    methods: {
      async register(){
        try {
          await PlayersService.register({
            name: this.player.name,
            lastname: this.player.lastname
          })
          this.$store.dispatch('retrievePlayers')
          this.snackbar = true
          this.$router.go(-1)
        } catch(error) {
          this.error = error.response.data.error
        }
      },
    },
    watch: {
      loader () {
        const l = this.loader
        this[l] = !this[l]

        setTimeout(() => (this[l] = false), 3000)

        this.loader = null
      }
    },
    created(){
      Event.$emit('toolbar-data', "Nieuwe profiel", true, "amber")
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
