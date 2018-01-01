<template>
  <div>
    <h2>Onderwerpen</h2>
    <p>Deselecteer de onderwerpen die je wilt vermijden</p>
    <p> {{ player.name }} </p>
    <v-container
      fluid
      style="min-height: 0;"
      grid-list-lg
    >
      <v-layout row wrap>
        <v-flex xs4
                v-for="(topic,i) in topics"
                :key="i"
        >

          <v-card v-if="player.skipQuestions !== null && player.skipQuestions.includes(topic.id)" color="grey">
            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">{{topic.name}}</h3>
              </div>
            </v-card-title>
          </v-card>

          <v-card v-else color="amber">
            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">{{topic.name}}</h3>
              </div>
            </v-card-title>
          </v-card>

        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
  import PlayersService from '@/services/PlayersService'
  import TopicsService from '@/services/TopicsService'

  export default {
    data () {
      return {
        player: {},
        topics: []
      }
    },
    // this automatically connects to the /register endpoint in the server as soon as the component is loaded on the page
    async created() {
      const player = await PlayersService.getPlayer(this.$route.params.id)
      this.player = player.data

      const topics = await TopicsService.getTopics()
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
