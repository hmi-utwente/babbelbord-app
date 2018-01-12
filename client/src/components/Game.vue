<template>
  <!--

  Switch between question and instruction, based on the game status.
  This component should keep the data about players, like collected cards.

   -->
  <div>
    <instruction v-if="showInstructions" :instruction="instructions[0]"/>
    <question v-else :question="currentQuestion"/>
  </div>

</template>

<script>
  import Question from './Question.vue'
  import Instruction from './Instruction.vue'

  var socket = io()

  export default {
    components: { Question, Instruction },
    data () {
      return {
        activePlayer: 'player',
        gameStatus: 'turn',   // can be turn or win
        currentQuestion: {},  // contains also current category when filtered from set of questions
        currentSubQuestions: [],   // contains also current category when filtered from set of questions
        currentCategory: '',
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
      },
      categories() {
        return this.$store.state.categories
      },
      player() {
        return this.$store.state.player
      },
      caregiver(){
        return this.$store.state.caregiver
      }
    },
    watch: {
      currentCategory: function(){
        console.log('Current Category changed')

        // keeping this as reference to access component data
        let self = this
        let category = this.currentCategory

        // get all questions of a specific category
        let questionsByCategory = this.questions.filter(function(obj){
          return obj.category == category
        })

        console.log('Array of category ' + category + ': ', questionsByCategory)

        this.currentQuestion = questionsByCategory[Math.floor(Math.random()*questionsByCategory.length)];
        console.log('The random question is: ', this.currentQuestion)

        // toggle between instructions and question
        this.toggleQuestionsInstructions()

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

      // saving this for referring to component
      var self = this

      socket.on('category', function(cat){
        self.currentCategory = cat
      });
    }
  }
</script>

<style>

</style>
