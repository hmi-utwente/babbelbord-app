<template>
  <div>
    <h4>Category: {{ categoryName }}</h4>
    <h2>{{ question.question }}</h2>
    <h3 v-for="subq in question.subquestions">{{ subq }}</h3>

    <!-- if no subquestions or they are over, display instead the done button -->
    <v-btn v-if="question.subquestions" @click="followUpQuestion">following question</v-btn>
    <v-btn @click="nextTurn">done</v-btn>
    <v-btn @click="addToSkipQuestions">skip</v-btn>
  </div>

</template>

<script>
  export default {
    props: ['question'],
    data () {
      return {
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

        return cat.name
      }
    },
    methods: {
      addToSkipQuestions: function() {
        // add the current skipped question to the player records
      },
      followUpQuestion: function () {
        // display the following subquestions, if any
      },
      nextTurn: function () {
        // goes to the other player's turn, saves which card the player should have picked up
      }
    }
  }
</script>

<style>

</style>
