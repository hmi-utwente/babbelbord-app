<template>
  <!--

  Switch between question and instruction, based on the game status.
  This component should keep the data about players, like collected cards.

   -->
  <div>
    <question :question="questions[2]" :subquestions="questions[2].subquestions ? questions[2].subquestions : {}"/>
    <instruction></instruction>
    <!-- <scoreboard></scoreboard> -->
  </div>

</template>

<script>
  import Question from './Question.vue'
  import Instruction from './Instruction.vue'

  var socket = io();

  export default {
    components: { Question, Instruction },

    data () {
      return {
        player: {},
        caregiver: {},
        activePlayer: 'player',
        gameStatus: 'turn',   // can be turn or win
        currentQuestion: {},  // contains also current category when filtered from set of questions
        currentSubQuestions: [],   // contains also current category when filtered from set of questions
        showInstructions: true,
        showQuestions: false,
        instructions: [
          {message: 'Throw the die and move your pawn on the corresponding color'},
          {message: 'You have two cards of the same color. Do you want to use them to steal a card from your opponent?'}
        ]
      }
    },
    computed: {
      questions() {
        return this.$store.state.questions
      }
    },
    methods: {
      togglePlayers(){
        if(this.activePlayer === 'player')
          this.activePlayer = 'caregiver'
        else
          this.activePlayer = 'player'
      }
    },
    created(){
      Event.$emit('toolbar-data', "Match is on!", false)

      this.player = this.$store.state.player
      this.caregiver = this.$store.state.caregiver
    }
  }
</script>

<style>

</style>
