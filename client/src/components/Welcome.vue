<template>
  <v-container text-xs-center>
    <v-layout row wrap>
      <v-flex xs12 sm10 offset-sm1>
        <v-content>
          <div class="welcome">
            <h1 class="display-2">Welcome to Babbelbord!</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores atque blanditiis, corporis doloremque esse eum fuga id illo iusto molestiae mollitia odio quaerat ratione repudiandae sint tenetur totam ut! Non.</p>
          </div>
        </v-content>
      </v-flex>
      <v-flex xs12>
        <v-btn dark color="deep-purple" to="/players">
          Start game
        </v-btn>
        <v-btn dark color="deep-purple">
          Profiles
        </v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
