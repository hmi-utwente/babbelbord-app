<template>
  <!--

  Switch between question and instruction, based on the game status.
  This component should keep the data about players, like collected cards.

   -->
  <div class="text-xs-center">
    <h2 v-if="!isPawnsInstruction">{{ activePlayer === "player" ? player.name : caregiver.name }}, it's your turn!</h2>
    <!-- Switch between different instructions and questions -->
    <instruction v-if="(showInstructions || errorMessage.length > 0) && isPawnsInstruction" :instruction="instructions[0]" :error="errorMessage"/>
    <instruction v-else-if="(showInstructions || errorMessage.length > 0) && isDieInstruction" :instruction="instructions[1]" :error="errorMessage"/>
    <instruction v-else-if="(showInstructions || errorMessage.length > 0) && isMoveToColorInstruction" :instruction="instructions[2]" :error="errorMessage"/>
    <instruction v-else-if="(showInstructions || errorMessage.length > 0) && isPickCardInstruction" :instruction="instructions[3]" :error="errorMessage"/>
    <instruction v-else-if="(showInstructions || errorMessage.length > 0) && isTwoCardsSameColorInstruction" :instruction="instructions[4]" :error="errorMessage"/>
    <instruction v-else-if="(showInstructions || errorMessage.length > 0) && isChooseCardsToUse" :instruction="instructions[5]" :error="errorMessage"/>
    <question v-else :question="currentQuestion" :player="activePlayer"/>

  </div>

</template>

<script>
  import Question from './Question.vue'
  import Instruction from './Instruction.vue'

  // var socket = io()   // use this for production
  var socket = io('http://localhost:8081')   // use this for production

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
          {message: 'Arrange 2 pawns on GAAN'},
          {message: 'Throw the die'},
          {message: 'Move on the color obtained'},
          {message: 'Pick a card of same category'},
          {message: 'You have two cards of the same color. Do you want to use them to steal a card from your opponent?'},
          {message: 'Choose the colored card you want to use'}
        ],
        currentInstruction: {message: 'Throw the die'},
        categoriesColors: [
          {name: "Familie", color: "yellow"},
          {name: "Liefde", color: "red"},
          {name: "Tienertijd", color: "cyan"},
          {name: "Kindertijd", color: "green"},
          {name: "Hobby", color: "purple"},
        ],
        filteredQuestions: [],
        errorMessage: '',
        // these boolean variables are for deciding which instruction to display
        isPawnsInstruction: true,
        isDieInstruction: false,
        isMoveToColorInstruction: false,
        isPickCardInstruction: false,
        isTwoCardsSameColorInstruction: false,
        isChooseCardsToUse: false
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
        var self = this

        // do computations only if the category has been set properly (fixing issue of same category in a row)
        if(this.currentCategory !== 'reset'){
          // map category to its ID
          let currentCategoryParse = this.categories.filter(function(obj){
            return obj.name == self.currentCategory
          })[0]

          var category = currentCategoryParse.id

          // get all questions of a specific category and avoiding topics / questions to skip
          this.filteredQuestions = this.questions.filter(function(obj){
            return obj.category == category
          }).filter(function(obj){
            // filter by skipQuestions
            if(self.player.skipQuestions){
              console.log("Player has skipQuestions set")
              return !self.player.skipQuestions.includes(obj.id)
            }
          }).filter(function(obj){
            console.log("Player has skipTopics set")
            if(self.player.skipTopics){
              return !self.player.skipTopics.includes(obj.topics)
            }
          })

          this.currentQuestion = this.filteredQuestions[Math.floor(Math.random()*this.filteredQuestions.length)];

          Event.$on('category-name', catName => {
            // find color associated to category
            let currentCat = this.categoriesColors.filter(function(category){
              return category.name == catName
            })[0]

            // send data to toolbar
            Event.$emit('toolbar-data', catName, false, currentCat.color)
          })

          // toggle between instructions and question
          this.toggleQuestionsInstructions()
        }
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
      },
      resetAfterTurnChange(){
        this.isPawnsInstruction = false
        this.isDieInstruction = true
        this.isMoveToColorInstruction = false
        this.isPickCardInstruction = false
        this.isTwoCardsSameColorInstruction = false
        this.isChooseCardsToUse = false
      }
    },
    created(){
      Event.$emit('toolbar-data', "Match is on!", false)

      // saving this for referring to component
      var self = this

      socket.on('category', function(data){

        if(data.name) {
          console.log("Setting category")
          self.currentCategory = data.name
        }
        else if(data.special){
          console.log("Setting error message")

          // received "Both pawns are at gaan"
          if(data.special === "Both pawns are at gaan"){
            // switch to next instruction, throw the die
            self.isPawnsInstruction = !self.isPawnsInstruction
            self.isDieInstruction = !self.isDieInstruction
            console.log("Changing isPawnInstructions, updated value is " + self.isPawnsInstruction)
          } else {
            self.errorMessage = data.special

            // toggle between instructions and question
            self.toggleQuestionsInstructions()
          }

          console.log("Error message is: " + self.errorMessage)
        }
      })

      // go to next instruction after die has been thrown
      Event.$on('die-thrown', function() {
        // switch to next instruction
        self.isDieInstruction = !self.isDieInstruction
        self.isMoveToColorInstruction = !self.isMoveToColorInstruction
      })

      // remove the skipped questions from the array that holds all the ones that can be asked in this turn
      Event.$on('skipped-question', question => {
        let index = self.filteredQuestions.indexOf(question)
        if (index > -1) {
          self.filteredQuestions.splice(index, 1);
        }

        self.currentQuestion = self.filteredQuestions[Math.floor(Math.random()*self.filteredQuestions.length)];

        //self.filteredQuestions.splice()
        console.log("filtered questions after removal: ", self.filteredQuestions)
      })

      // switch player turns
      Event.$on('switch-turn', function(){
        self.togglePlayers()
        self.resetAfterTurnChange()
        self.toggleQuestionsInstructions()
        self.currentCategory = 'reset'
      })
    }
  }
</script>

<style>

</style>
