<template>
  <div>
    <h1>Selecteer spelers</h1>
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

          <v-card>
            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">{{player.name}} {{player.lastname}}</h3>
                <div>Topics avoided:
                  <span v-for="topicPlayer in player.skipTopics">
                    <v-chip v-for="topic in topics" v-if="topic.id == topicPlayer" color="amber" text-color="black" :key="topic.id">{{ topic.name }}</v-chip>
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
        to="/players/add"
      >
        <v-icon>add</v-icon>
      </v-btn>
    </v-fab-transition>
  </div>
</template>

<script>
  import PageHeader from './Header.vue'

  export default {
    components: {PageHeader},
    data () {
      return {
        loading: true
      }
    },
    watch: {
      players_list: function () {
        this.loading = false
      }
    },
    computed: {
      players_list() {
        return this.$store.state.players
      },
      topics() {
        return this.$store.state.topics
      }
    },
    // this automatically connects to the /register endpoint in the server as soon as the component is loaded on the page
    async created() {
      Event.$emit('toolbar-data', "Spelers", true)
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  v-card-title > * {
    color: black;
  }

</style>
