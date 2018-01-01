<template>
  <div>
    <h2>Onderwerpen</h2>
    <p>Deselecteer de onderwerpen die je wilt vermijden</p>
    <p> {{ player.name }} </p>
    <p> {{ $route.params.id }} </p>
  </div>
</template>

<script>
  import PlayersService from '@/services/PlayersService'
  import TopicsService from '@/services/TopicsService'

  export default {
    //props: ['topics', 'player'],
    data () {
      return {
        player: {},
        topics: []
      }
    },
    methods: {
      async created() {
        const player = await PlayersService.getPlayer(this.$route.params.id)
        this.player = player.data

        const topics = await TopicsService.getTopics()
        this.topics = topics.data
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  v-card-title > * {
    color: black;
  }

</style>
