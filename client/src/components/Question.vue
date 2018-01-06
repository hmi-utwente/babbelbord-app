<template>
  <div>
    <h4>Category: {{ question.category }}</h4>
    <h2>{{ question.question }}</h2>
    <h3 v-for="subq in question.subquestions">{{ subq }}</h3>

    <!-- if no subquestions or they are over, display instead the done button -->
    <v-btn @click="followUpQuestion">following question</v-btn>
    <v-btn @click="nextTurn">done</v-btn>

    <v-btn @click="addToSkipQuestions">skip</v-btn>
  </div>

</template>

<script>
  export default {
    props: ['question', 'subquestions'],
    data () {
      return {
        currentQuestion: ''   // used to keep the question that needs to be displayed
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
