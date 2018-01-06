<template>
  <div>
    <h2>Selecteer spelers</h2>
    <p>Selecteer twee spelers voor het babbelbord spel</p>
    <p>Kies een van de volgende spelers</p>

    <div class="text-xs-center">
      <v-progress-circular v-if="loading" indeterminate :size="100" :width="3" color="deep-purple"></v-progress-circular>
    </div>

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

          <v-card>
            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">{{player.name}} {{player.lastname}}</h3>
                <div>Skipped topics:
                  <span v-for="topicPlayer in player.skipQuestions">
                    <span v-for="topic in topics" v-if="topic.id == topicPlayer"> {{ topic.name }}, </span>
                  </span>
                </div>
              </div>
            </v-card-title>
            <v-card-actions>
              <v-btn flat :to="`/players/edit/${player.id}`" color="deep-purple">Edit</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <v-fab-transition>
      <v-btn
        dark
        fab
        fixed
        absolute
        bottom
        right
        color="deep-purple"
        style="margin-bottom: 3em; margin-right: 1em;"
        to="/players/create"
      >
        <v-icon>add</v-icon>
      </v-btn>
    </v-fab-transition>
  </div>
</template>

<script>
  import PlayersService from '@/services/PlayersService'
  import TopicsService from '@/services/TopicsService'
  import PageHeader from './Header.vue'

  export default {
    components: {PageHeader},
    data () {
      return {
        players_list: [],
        topics: [],
        loading: true
      }
    },
    watch: {
      players_list: function () {
        this.loading = false
      }
    },
    // this automatically connects to the /register endpoint in the server as soon as the component is loaded on the page
    async created() {
      Event.$emit('toolbar-data', "Spelers", true)
      const players = await PlayersService.getPlayers()
      const topics = await TopicsService.getTopics()

      this.players_list = players.data
      this.topics = topics.data
      }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  v-card-title > * {
    color: black;
  }

</style>
