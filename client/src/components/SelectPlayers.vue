<template>
    <v-container fluid grid-list-md>
      <v-layout row wrap>

        <p>Creëer of selecteer hier een (nieuwe) profiel voor jou en je tegenspeler in het menu.Als een Zorgdrager en een Bewoner geselecteerd zijn, klik op Start Spel</p>
        <!-- Bestaande spelers -->
        <v-flex d-flex sm5 offset-sm1>
          <panel title="Bestaande spelers" v-if="players">
            <v-list three-line>
              <template v-for="player in players">
                <player-list-item
                  :player="player"
                  :active="player.id === selectedPlayer"
                  @click.native="addPlayer(player)"
                />
                <v-divider></v-divider>
              </template>
            </v-list>
          </panel>
        </v-flex>

        <!-- Panel containing zorgdrager and bewoner plus the summary-->
        <v-flex d-flex sm5>
          <v-layout column>
            <v-flex>
              <panel title="Maak een nieuwe speler ">
                <v-list v-show="showList">
                  <v-list-tile avatar :disabled="caregiver.name.length > 0" @click="switchCaregiverForm">
                    <v-list-tile-avatar>
                      <v-icon>accessibility</v-icon>
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                      <v-list-tile-title>Zorgdrager</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>

                  <v-divider></v-divider>

                  <v-list-tile avatar :disabled="player.name.length > 0" @click="switchPlayerForm">
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
                        Player created, you can now select it from the list.
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
              <panel title="Spelers die het spel gaan spelen ">
                <v-list>
                  <v-list-tile avatar v-if="caregiver.name">
                    <v-list-tile-avatar>
                      <v-icon>accessibility</v-icon>
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                      <v-list-tile-title>{{ caregiver.name }}</v-list-tile-title>
                    </v-list-tile-content>
                    <v-list-tile-action>
                      <v-btn icon ripple @click="removeCaregiver">
                        <v-icon medium color="red lighten-1">delete</v-icon>
                      </v-btn>
                    </v-list-tile-action>
                  </v-list-tile>

                  <v-list-tile avatar v-if="player.name">
                    <v-list-tile-avatar>
                      <v-icon>face</v-icon>
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                      <v-list-tile-title>{{ player.name }} {{ player.lastname }}</v-list-tile-title>
                    </v-list-tile-content>
                    <v-list-tile-action>
                      <v-btn icon ripple @click="removePlayer">
                        <v-icon medium color="red lighten-1">delete</v-icon>
                      </v-btn>
                    </v-list-tile-action>
                  </v-list-tile>
                </v-list>
                <div class="text-xs-center">
                  <v-btn color="amber" :disabled="player.name.length === 0 || caregiver.name.length === 0" @click="startGame">Start nieuw spel</v-btn>
                </div>
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
  import PlayerListItem from './PlayerListItem'

  export default {
    components: {Panel, PlayerListItem},
    data () {
      return {
        caregiver: {
          name: ''
        },
        player: {
          name: '',
          lastname: ''
        },
        selectedPlayer: null,
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
          this.switchPlayerForm()
        } catch(error) {
          this.error = error.response.data.error
        }
      },
      switchCaregiverForm() {
        this.showList = !this.showList
        this.showCaregiver = !this.showCaregiver
      },
      switchPlayerForm() {
        this.showList = !this.showList
        this.showPlayer = !this.showPlayer
      },
      addPlayer(player){
        console.log('Adding player to summary')
        this.player = player
      },
      removeCaregiver(){
        this.caregiver.name = ''
      },
      removePlayer(){
        this.player.name = ''
        this.player.lastname = ''
      },
      startGame(){
        this.$store.commit('setPlayerAndCaregiver', {player: this.player, caregiver: this.caregiver})
        this.$router.push('/game')
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
      Event.$emit('toolbar-data', "Nieuw spel", true, "amber")
    },
    mounted(){
      Event.$on('item-selected', playerId => {
        this.selectedPlayer = playerId
      })
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
