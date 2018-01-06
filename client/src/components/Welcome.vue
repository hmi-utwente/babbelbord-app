<template>
  <v-container text-xs-center>
    <v-layout row wrap>
      <v-flex xs12 sm10 offset-sm1>
        <v-content>
          <div class="welcome">
            <h1 class="display-2">Welcome to Babbelbord!</h1>
            <p>Here we should put a brief description of the game perhaps?</p>
          </div>
        </v-content>
      </v-flex>
      <v-flex xs12>
        <v-btn dark color="deep-purple" to="/players/create">
          Start game
        </v-btn>
        <v-btn dark color="deep-purple" to="/players">
          Profiles
        </v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import PlayersService from '@/services/PlayersService'
  import TopicsService from '@/services/TopicsService'


  export default {
    data () {
      return {
        players: [],
        topics: []
      }
    },
    async created(){
      Event.$emit('toolbar-data', "Babbelbord", false)

      const players = await PlayersService.getPlayers()
      const topics = await TopicsService.getTopics()

      this.players = players
      this.topics = topics
    },
    beforeDestroy(){
      Event.$emit('players_topics', this.players, this.topics)
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
