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
    <v-btn @click="addToSkipQuestions">Sla deze vraag over</v-btn>
    <v-btn v-if="question.subquestions && count < question.subquestions.length" @click="followUpQuestion">Volgende vraag </v-btn>
    <v-btn v-else @click="nextTurn">klaar</v-btn>
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

        console.log("Inside categoryName in Question component, value: ", cat)
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
        // save the "card" color for the current player
        if(this.player === 'player')
          this.$store.dispatch('setPlayerCard', this.categoryName)
        else
          this.$store.dispatch('setCaregiverCard', this.categoryName)

        // switch turn to other player
        Event.$emit('switch-turn')

        // Update toolbar
        Event.$emit('toolbar-data', "Babbelbord", false, "amber")
      }
    },
    created(){
      Event.$emit('category-name', this.categoryName)
    },
    mounted(){
      console.log("Value of props passed: ", this.question)
    }
  }
</script>

<style>

</style>
