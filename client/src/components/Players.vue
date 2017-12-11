<template>
  <v-content>
    <v-layout row justify-center>
      <ul>
        <li v-for="player in players_list"> {{ player.name }} {{ player.lastname }} </li>
      </ul>
      <v-btn @click="createPlayer" color="orange" to="/players/create">Create new player</v-btn>
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
    async mounted() {
      const response = await PlayersService.getPlayers()
      console.log(response.data)
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
