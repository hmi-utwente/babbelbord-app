<template>
  <div class="welcome">
    <h1>Select players</h1>
    <ul>
      <li>These are</li>
      <li>our incredible</li>
      <li>players</li>
    </ul>
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
    async mounted() {
      const response = await PlayersService.getPlayers()
      console.log(response.data)
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
