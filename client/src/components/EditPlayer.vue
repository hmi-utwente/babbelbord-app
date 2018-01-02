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
          <v-btn large v-bind:class="topic.isDeselected ? 'disabled' : 'enabled'" v-on:click="changeTopicState(topic)">
            {{ topic.name }}
          </v-btn>
        </v-flex>
      </v-layout>
    </v-container>

    <div class="text-xs-center">
      <v-btn dark :click="savePlayerDetails()" color="deep-purple">Save</v-btn>
    </div>
  </div>
</template>

<script>
  import PlayersService from '@/services/PlayersService'
  import TopicsService from '@/services/TopicsService'

  export default {
    props: ['id'],
    data () {
      return {
        player: {},
        topics: []
      }
    },
    methods: {
      changeTopicState: (topic) => {
        topic.isDeselected = !topic.isDeselected
      },
      async savePlayerDetails() {
        // if topic.isDeselected = false, add in skipQuestions if not already there
        // if topic.isDeselected = true, remove from skipQuestions if not already there
        let skipQuestions = this.player.skipQuestions
        let topic;


        for(topic in this.topics){
          if(skipQuestions){
            if(skipQuestions.includes(topic.id) && topic.isDeselected) {
              skipQuestions.splice(skipQuestions.indexOf(topic.id), 1)
            } else if(skipQuestions.includes(topic.id) && !topic.isDeselected)
              skipQuestions.push(topic.id)
          } else {
            if(!topic.isDeselected)
              skipQuestions.push(topic.id)
          }
        }

        console.log(this.player.skipQuestions)

        try {
          await PlayersService.update({
            skipQuestions: this.player.skipQuestions
          }, {
            where: {id: this.player.id}
          })
          // this.snackbar = true
          // setTimeout(() => {
          //  this.$router.push('/players')
          // }, 3000);
        } catch(error) {
          this.error = error.response.data.error
        }
      }
    },
    async created() {
      const player = await PlayersService.getPlayer(this.id)
      this.player = player.data

      const topics = await TopicsService.getTopics()
      this.topics = topics.data

      // add isSelected to the topics array
      for (var i = 0; i < this.topics.length; i++){
        if(this.player.skipQuestions == null)
          this.$set(this.topics[i], 'isDeselected', false)
        else {
          if(this.player.skipQuestions.includes(this.topics[i].id))
            this.$set(this.topics[i], 'isDeselected', true)
          else
            this.$set(this.topics[i], 'isDeselected', false)
        }
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  v-card-title > * {
    color: black;
  }

  .enabled {
    background: #ffc107!important;
  }

  .disabled {
    background: #9e9e9e!important;
  }

  .btn--large {
    width: 100%;
    height: 100px;
    font-size: 20px;
  }

</style>
