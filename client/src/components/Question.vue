<template>
  <div>
    <v-container grid-list-md text-xs-center>
      <v-layout row wrap>
        <v-flex xs6 offset-xs3>
          <h1>{{ count > 0 ? currentQuestionChild : question.question}}</h1>
        </v-flex>
      </v-layout>
    </v-container>

    <!-- if no subquestions or they are over, display instead the done button -->
    <v-btn @click="addToSkipQuestions">skip</v-btn>
    <v-btn v-if="question.subquestions && count < question.subquestions.length" @click="followUpQuestion">following question</v-btn>
    <v-btn v-else @click="nextTurn">done</v-btn>
  </div>

</template>

<script>
  export default {
    props: ['question', 'player'],
    data () {
      return {
        count: 0,
        currentQuestionChild: this.question.question
      }
    },
    computed: {
      categories(){
        return this.$store.state.categories
      },
      categoryName(){
        let self = this

        // the [0] is to get the only element returned in the array
        let cat = this.categories.filter(function(obj){
          return obj.id == self.question.category
        })[0]

        console.log(cat)

        Event.$emit('category-name', cat.name)

        return cat.name
      },
    },
    methods: {
      addToSkipQuestions: function() {
        // add the current skipped question to the player records
        this.$store.dispatch('updatePlayerSkippedQuestions', this.question)
        Event.$emit('skipped-question', this.question)
      },
      followUpQuestion: function () {
        // display the following subquestions, if any
        this.currentQuestionChild = this.question.subquestions[this.count]
        this.count++
      },
      nextTurn: function () {
        // goes to the other player's turn, saves which card the player should have picked up

        // save the "card" color for the current player
        console.log("Category to be sent to setCard: " + this.categoryName)
        if(this.player === 'player')
          this.$store.dispatch('setPlayerCard', this.categoryName)
        else
          this.$store.dispatch('setCaregiverCard', this.categoryName)

        // switch turn to other player
        Event.$emit('switch-turn')
      }
    },
    mounted(){
      console.log("Value of props passed: ", this.question)
    }
  }
</script>

<style>

</style>
