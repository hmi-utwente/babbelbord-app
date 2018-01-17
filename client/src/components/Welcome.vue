<template>
  <v-container text-xs-center>
    <v-layout row wrap>
      <v-flex xs12 sm10 offset-sm1>
        <v-content>
          <div class="welcome">
            <h1 class="display-3">Welkom bij het Babbelbord</h1>
            <p>Het Babbelbord is een spel voor de familie om herinneringen op te halen en elkaar beter te leren kennen.
              <br>
              Voor het starten van het spel, klik Start het spel <br>
              Voor het aanpassen of aanmaken van een profiel van een bewoner, klik Profielen
            </p>
          </div>

          <div v-if="loading" class="text-xs-center">
            <v-progress-circular indeterminate :size="100" :width="3" color="deep-purple"></v-progress-circular>
            <p>Retrieving data...</p>
          </div>

        </v-content>
      </v-flex>
      <v-flex xs12>
        <v-btn :disabled="loading" dark color="deep-purple" to="/players/select">
          Start het spel
        </v-btn>
        <v-btn :disabled="loading" dark color="deep-purple" to="/players/profiles">
          Profielen
        </v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import PlayersService from '@/services/PlayersService'
  import TopicsService from '@/services/TopicsService'
  import QuestionsService from '@/services/QuestionsService'
  import CategoriesService from '@/services/CategoriesService'


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
      const categories = await CategoriesService.getCategories()

      this.$store.commit('initializePlayers', players)
      this.$store.commit('initializeTopics', topics)
      this.$store.commit('initializeQuestions', questions)
      this.$store.commit('initializeCategories', categories)

      this.loading = false;
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
