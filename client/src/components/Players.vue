<template>
  <div>
      <h2>Selecteer spelers</h2>
      <p>Selecteer twee spelers voor het babbelbord spel</p>
      <p>Kies een van de volgende spelers</p>

    <v-container
      fluid
      style="min-height: 0;"
      grid-list-lg
    >
      <v-layout row wrap>
        <v-flex xs4
                v-for="(player,i) in players_list"
                :key="i"
        >
          <v-card color="white">
            <v-card-title primary-title>
              <div class="headline"> {{player.name}} {{player.lastname}} </div>
              <div>Listen to your favorite artists and albums whenever and wherever, online and offline.</div>
            </v-card-title>
            <v-card-actions>
              <v-btn dark color="deep-purple">Edit player details</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <v-btn
      absolute
      dark
      fab
      bottom
      right
      color="deep-purple"
      style="margin-bottom: 3em; margin-right: 1em;"
      to="/players/create"
    >
      <v-icon>add</v-icon>
    </v-btn>
  </div>
</template>

<script>
  import PlayersService from '@/services/PlayersService'

  export default {
    data () {
      return {
        players_list: []
      }
    },
    // this automatically connects to the /register endpoint in the server as soon as the component is loaded on the page
    async created() {
      const response = await PlayersService.getPlayers()
      this.players_list = response.data
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  v-card-title > * {
    color: black;
  }

</style>
