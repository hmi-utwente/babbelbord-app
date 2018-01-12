<template>
  <!--

  Switch between question and instruction, based on the game status.
  This component should keep the data about players, like collected cards.

   -->
  <div>
    <instruction v-if="showInstructions"/>
    <question v-else :question="questions[2]" :subquestions="questions[2].subquestions ? questions[2].subquestions : {}"/>
    <!-- <scoreboard></scoreboard> -->
  </div>

</template>

<script>
  import Question from './Question.vue'
  import Instruction from './Instruction.vue'

  const socket = io('https://babbelbord.herokuapp.com:' + process.env.PORT || 3000);

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
        currentCategory,
        showInstructions: true,
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
      },
      toggleQuestionsInstructions(){
        this.showInstructions = !this.showInstructions
      }
    },
    created(){
      Event.$emit('toolbar-data', "Match is on!", false)

      this.player = this.$store.state.player
      this.caregiver = this.$store.state.caregiver
    },
    mounted(){
      socket.on('category', function(cat){
        this.currentCategory = cat
      });
    }
  }
</script>

<style>

</style>
