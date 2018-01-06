<template>
  <!--

  Switch between question and instruction, based on the game status.
  This component should keep the data about players, like collected cards.

   -->
  <div>
    <h3>It is {{ activePlayer }} turn.</h3>
    <question :question="questions[2]" :subquestions="questions[2].subquestions"></question>
    <instruction></instruction>
    <!-- <scoreboard></scoreboard> -->
  </div>

</template>

<script>
  import Question from './Question.vue'
  import Instruction from './Instruction.vue'
  import QuestionsService from '../services/QuestionsService'

  export default {
    components: { Question, Instruction },

    data () {
      return {
        players: [{}],        // array of objects, with data passed from previous parts of game
        activePlayer: '',     // will contain the player name to display
        gameStatus: 'turn',   // can be turn or win
        cards: {
          player1: 0,
          player2: 0
        },
        questions: [{}],
        currentQuestion: {},  // contains also current category when filtered from set of questions
        currentSubQuestions: []   // contains also current category when filtered from set of questions
      }
    },
    async created () {
      // take data of the two players, patient and caregiver, from the previous screen (use Event.$on)

      // get all questions from database
      const questions = await QuestionsService.getQuestions()
      this.questions = questions.data
    }
  }
</script>

<style>

</style>
