<template>
  <v-container text-xs-center>
    <v-layout row wrap>
      <v-flex xs12 sm10 offset-sm1>
        <v-content>
          <div class="welcome">
            <h1 class="display-2">Welcome to Babbelbord!</h1>
            <p>Here we should put a brief description of the game perhaps?</p>
          </div>

          <div v-if="loading" class="text-xs-center">
            <v-progress-circular indeterminate :size="100" :width="3" color="deep-purple"></v-progress-circular>
            <p>Retrieving data...</p>
          </div>

        </v-content>
      </v-flex>
      <v-flex xs12>
        <v-btn :disabled="loading" dark color="deep-purple" to="/players/select">
          Start game
        </v-btn>
        <v-btn :disabled="loading" dark color="deep-purple" to="/players/profiles">
          Profiles
        </v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import PlayersService from '@/services/PlayersService'
  import TopicsService from '@/services/TopicsService'
  import QuestionsService from '@/services/QuestionsService'


  export default {
    data () {
      return {
        loading: true
      }
    },
    async created() {
      Event.$emit('toolbar-data', "Babbelbord", false)

      const players = await PlayersService.getPlayers()
      const topics = await TopicsService.getTopics()
      const questions = await QuestionsService.getQuestions()

      this.$store.commit('initializePlayers', players)
      this.$store.commit('initializeTopics', topics)
      this.$store.commit('initializeQuestions', questions)

      this.loading = false;
    },
    beforeDestroy() {
      Event.$emit('players_topics', this.players, this.topics)
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
