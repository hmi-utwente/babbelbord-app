<template>
  <v-content>
    <v-layout row justify-center>
      <h2>Selecteer spelers</h2>
      <p>Selecteer twee spelers voor het babbelbord spel</p>
      <p>Kies een van de volgende spelers</p>

      <v-container
        fluid
        style="min-height: 0;"
        grid-list-lg
      >
        <v-layout row wrap>
          <v-flex v-for="player in players_list" xs12>
            <v-card color="blue-grey darken-2" class="white--text">
              <v-card-title primary-title>
                <div class="headline">{{ player.name }} {{ player.lastname }}</div>
                <div>Onderwerpen vermijden:</div>
              </v-card-title>
              <v-card-actions>
                <v-btn flat dark>Listen now</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
      <v-btn color="orange" to="/players/create">Create new player</v-btn>
    </v-layout>
  </v-content>
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

</style>
