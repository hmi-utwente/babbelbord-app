<template>
  <div>
    <h2>Onderwerpen</h2>
    <p>Deselecteer de onderwerpen die je wilt vermijden</p>
    <p>{{ $route.params.id }}</p>

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
          <v-card>
            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">{{ topic }}</h3>
              </div>
            </v-card-title>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
  export default {
    props: ['topics', 'player'],
    data () {
      return {
        players_list: [],
        topics: []
      }
    },
    methods: {
      async register(){
        try {
          await PlayersService.register({
            name: this.name,
            lastname: this.lastname
          })
          this.snackbar = true
          setTimeout(() => {
            this.$router.push('/players')
          }, 3000);
        } catch(error) {
          this.error = error.response.data.error
        }
      },
      clear () {
        this.$refs.form.reset()
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
