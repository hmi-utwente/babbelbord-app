<template>
    <v-container fluid grid-list-md>
      <v-layout row wrap>

        <!-- Bestaande spelers -->
        <v-flex d-flex sm5 offset-sm1>
          <panel title="Bestaande spelers" v-if="players">
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
                  <span v-for="topic in topics" v-if="topic.id == topicPlayer" color="amber" text-color="black"> {{ topic.name }} </span>
                </span>
                    </v-list-tile-sub-title>
                  </v-list-tile-content>
                  <v-list-tile-action>
                    <v-btn icon ripple>
                      <v-icon large color="deep-purple">mode_edit</v-icon>
                    </v-btn>
                  </v-list-tile-action>
                </v-list-tile>
                <v-divider></v-divider>
              </template>
            </v-list>
          </panel>
        </v-flex>

        <!-- Panel containing zorgdrager and bewoner plus the summary-->
        <v-flex d-flex sm5>
          <v-layout column>
            <v-flex>
              <panel title="Nieuwe speler">
                <v-list v-show="showList">
                  <v-list-tile avatar :disabled="caregiver.name.length > 0 " @click="switchCaregiverForm">
                    <v-list-tile-avatar>
                      <v-icon>accessibility</v-icon>
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                      <v-list-tile-title>Zorgdrager</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>

                  <v-divider></v-divider>

                  <v-list-tile avatar :disabled="player" @click="switchPlayerForm">
                    <v-list-tile-avatar>
                      <v-icon>face</v-icon>
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                      <v-list-tile-title>Bewoner</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </v-list>

                <!-- Show caregiver form -->
                <v-content v-show="showCaregiver">
                  <v-container fluid>
                    <v-layout row justify-center>
                      <v-form v-model="valid" xs8>
                        <v-text-field
                          label="Naam van de zorgdrager"
                          v-model="caregiver.name"
                          required
                        />

                        <v-btn @click="switchCaregiverForm" flat color="orange">terug</v-btn>
                        <v-btn
                          @click="switchCaregiverForm"
                          color="orange"
                        >
                          ok
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

                <!-- Show player form -->
                <v-content v-show="showPlayer">
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

                        <v-btn @click="switchPlayerForm" flat color="orange">terug</v-btn>
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
              </panel>
            </v-flex>
            <!-- end of zorgdrager and bewoner -->

            <!-- summary -->
            <v-flex d-flex>
              <panel title="Summary">
                <v-list v-show="showList">
                  <v-list-tile avatar v-if="caregiver.name">
                    <v-list-tile-avatar>
                      <v-icon>accessibility</v-icon>
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                      <v-list-tile-title>{{ caregiver.name }}</v-list-tile-title>
                    </v-list-tile-content>
                    <v-list-tile-action>
                      <v-btn icon ripple @click="removePlayer">
                        <v-icon large color="red lighten-1">delete</v-icon>
                      </v-btn>
                    </v-list-tile-action>
                  </v-list-tile>
                </v-list>
              </panel>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
</template>

<script>
  import PlayersService from '@/services/PlayersService'
  import Panel from './Panel'

  export default {
    components: {Panel},
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
        showList: true,
        showCaregiver: false,
        showPlayer: false
      }
    },
    computed: {
      players() {
        return this.$store.state.players
      },
      topics(){
        return this.$store.state.topics
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
      },
      switchCaregiverForm() {
        this.showList = !this.showList
        this.showCaregiver = !this.showCaregiver
      },
      switchPlayerForm() {
        this.showList = !this.showList
        this.showPlayer = !this.showPlayer
      },
      removePlayer(){
        this.caregiver.name = ''
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
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
