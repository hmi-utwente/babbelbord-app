<template>
  <div>
    <h4>Category: {{ categoryName }}</h4>
    <h2>{{ currentQuestion }}</h2>

    <!-- if no subquestions or they are over, display instead the done button -->
    <v-btn v-if="question.subquestions && count < question.subquestions.length" @click="followUpQuestion">following question</v-btn>
    <v-btn v-else @click="nextTurn">done</v-btn>
    <v-btn @click="addToSkipQuestions">skip</v-btn>
  </div>

</template>

<script>
  export default {
    props: ['question'],
    data () {
      return {
        currentQuestion: this.question.question,
        count: 0
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

        Event.$emit('category-name', cat.name)

        return cat.name
      }
    },
    methods: {
      addToSkipQuestions: function() {
        // add the current skipped question to the player records
      },
      followUpQuestion: function () {
        // display the following subquestions, if any
        console.log("count: " + this.count)
        this.currentQuestion = this.question.subquestions[this.count]

        this.count++
      },
      nextTurn: function () {
        // goes to the other player's turn, saves which card the player should have picked up
      }
    }
  }
</script>

<style>

</style>
