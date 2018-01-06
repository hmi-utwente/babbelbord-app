<template>
  <div>
    <panel title="Bestaande spelers">
      <v-list three-line>
        <template v-for="player in players">
          <v-list-tile avatar :key="player.id" @click="">
            <v-list-tile-avatar>
              <v-icon>face</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>{{ player.name }} {{ player.lastname }} </v-list-tile-title>
              <v-list-tile-sub-title>
                <span v-for="topicPlayer in player.skipQuestions">
                  <span v-for="topic in topics" v-if="topic.id == topicPlayer" color="amber" text-color="black">{{ topic.name }} </span>
                </span>
              </v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-icon color="deep-purple">mode edit</v-icon>
            </v-list-tile-action>
          </v-list-tile>
          <v-divider></v-divider>
        </template>
      </v-list>
    </panel>

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
              :loading="loading"
              @click.native="loader = 'loading'"
              :disabled="loading"
              color="orange"
            >
              submit
            </v-btn>
          </v-form>

          <v-snackbar
            :timeout="timeout"
            color="green"
            v-model="snackbar"
          >
            Player created, taking you back to players' list in a moment.
            <v-btn dark flat @click.native="snackbar = false">Close</v-btn>
          </v-snackbar>

        </v-layout>
        <div class="error" v-html="error"></div>
      </v-container>
    </v-content>
  </div>

</template>

<script>
  import PlayersService from '@/services/PlayersService'
  import Panel from './Panel'

  export default {
    components: {Panel},
    data () {
      return {
        name: '',
        lastname: '',
        error: null,
        loader: null,
        valid: false,
        loading: false,
        snackbar: false,
        timeout: 3000,
        players: [],
        topics: []
      }
    },
    methods: {
      async register(){
        try {
          await PlayersService.register({
            name: this.name,
            lastname: this.lastname
          })
          this.snackbar = true
          setTimeout(() => {
            this.$router.push('/players')
          }, 3000);
        } catch(error) {
          this.error = error.response.data.error
        }
      },
      clear () {
        this.$refs.form.reset()
      }
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
      Event.$emit('toolbar-data', "Nieuw spel", true)

      Event.$on('players_topics', (players, topics) => {
        this.players = players.data
        this.topics = topics.data
      })
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
